"use client";

import clsx from "clsx";
import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";

export type FamNode = {
  name: string;
  littles: FamNode[];
};

type LayoutNode = {
  node: FamNode;
  x: number;
  y: number;
};

type LayoutLine = {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  fromBig: string;
  toLittle: string;
};

const NODE_W = 160;
const NODE_H = 46;
const X_GAP = 36;
const Y_GAP = 100;

function TreeLine({
  line,
  highlighted,
}: {
  line: LayoutLine;
  highlighted: boolean;
}) {
  const midY = line.fromY + (line.toY - line.fromY) / 2;

  return (
    <path
      d={`M ${line.fromX} ${line.fromY} V ${midY} H ${line.toX} V ${line.toY}`}
      fill="none"
      stroke={highlighted ? "var(--blue)" : "var(--blue-gray)"}
      strokeWidth={highlighted ? "3" : "2"}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={highlighted ? "drop-shadow-[0_0_6px_var(--blue)]" : ""}
    />
  );
}

export default function FamilyTree({
  root,
  highlightName,
  scrollContainerRef
}: {
  root: FamNode;
  highlightName?: string;
  scrollContainerRef: RefObject<HTMLDivElement | null>
}) {
  const layout = useMemo(() => layoutTree(root), [root]);

  const highlightRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const pathNames = useMemo(
    () => getPathToName(root, highlightName ?? ""),
    [root, highlightName]
  );

  const predecessorNames = useMemo(
    () => new Set(pathNames.slice(0, -1)),
    [pathNames]
  );

  const isHighlightedLine = useCallback((line: LayoutLine) => {
    const fromIndex = pathNames.indexOf(line.fromBig);
    return fromIndex !== -1 && pathNames[fromIndex + 1] === line.toLittle
  }, [pathNames])

  useEffect(() => {
    const target = highlightRef.current ?? rootRef.current;

    const scrollSettings: ScrollIntoViewOptions & { container: "nearest" | "always" } = {
        behavior: highlightRef.current ? "smooth" : "instant",
        block: "center",
        inline: "center",
        container: "nearest"
    };

    if (highlightRef.current) scrollContainerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });

    target?.scrollIntoView(scrollSettings);
  }, [highlightName, root.name, scrollContainerRef]);

  return (
    <div
      className="relative mx-auto"
      style={{
        width: layout.width,
        height: layout.height,
      }}
    >
      <svg className="pointer-events-none absolute inset-0 overflow-visible">
        {layout.lines.map((line, index) => (
          <TreeLine key={`base-${index}`} line={line} highlighted={false} />
        ))}

        {layout.lines
          .filter(isHighlightedLine)
          .map((line, index) => (
            <TreeLine key={`highlight-${index}`} line={line} highlighted />
          ))}
      </svg>

      {layout.nodes.map(({ node, x, y }) => {
        const highlighted = namesEqual(node.name, highlightName ?? "");
        const predecessor = predecessorNames.has(node.name);
        const isRoot = node.name === root.name;

        return (
          <div
            key={`${node.name}-${x}-${y}`}
            ref={highlighted ? highlightRef : isRoot ? rootRef : null}
            className={clsx(
              "absolute flex items-center justify-center rounded-xl border px-3 text-center text-sm shadow-lg transition",
              highlighted
                ? "border-[var(--blue)] bg-[var(--blue)]/20 text-white shadow-[0_0_24px_var(--blue)] neon-border-lg bg-secondary/100"
                : predecessor
                  ? "border-[var(--blue)]/40 bg-[var(--blue)]/10 text-white/90 shadow-[0_0_14px_rgba(59,130,246,0.35)]"
                  : "border-white/10 bg-secondary/70 text-white/80",
              { "line-through decoration-red-500": node.name.includes("Stricken")}
            )}
            style={{
              left: x - NODE_W / 2,
              top: y - NODE_H / 2,
              width: NODE_W,
              height: NODE_H,
            }}
          >
            <span className="line-clamp-2">{node.name}</span>
          </div>
        );
      })}
    </div>
  );
}

function layoutTree(root: FamNode) {
  const nodes: LayoutNode[] = [];
  const lines: LayoutLine[] = [];

  function walk(node: FamNode, depth: number): { width: number; centerX: number } {
    if (!node.littles.length) {
      return { width: NODE_W, centerX: NODE_W / 2 };
    }

    const childLayouts = node.littles.map((child) => walk(child, depth + 1));
    const totalChildrenWidth =
      childLayouts.reduce((sum, child) => sum + child.width, 0) +
      X_GAP * (childLayouts.length - 1);

    return {
      width: Math.max(NODE_W, totalChildrenWidth),
      centerX: Math.max(NODE_W, totalChildrenWidth) / 2,
    };
  }

  const measured = walk(root, 0);

  function place(node: FamNode, depth: number, left: number, width: number): number {
    const y = NODE_H / 2 + depth * (NODE_H + Y_GAP);

    if (!node.littles.length) {
      const x = left + width / 2;
      nodes.push({ node, x, y });
      return x;
    }

    const childWidths = node.littles.map((child) => measureWidth(child));
    const totalChildrenWidth =
      childWidths.reduce((sum, childWidth) => sum + childWidth, 0) +
      X_GAP * (childWidths.length - 1);

    let childLeft = left + (width - totalChildrenWidth) / 2;
    const childCenters: number[] = [];

    node.littles.forEach((child, index) => {
      const childWidth = childWidths[index];
      const childX = place(child, depth + 1, childLeft, childWidth);
      childCenters.push(childX);
      childLeft += childWidth + X_GAP;
    });

    const x = (childCenters[0] + childCenters[childCenters.length - 1]) / 2;
    nodes.push({ node, x, y });

    childCenters.forEach((childX, index) => {
      lines.push({
        fromBig: node.name,
        toLittle: node.littles[index].name,
        fromX: x,
        fromY: y + NODE_H / 2,
        toX: childX,
        toY: y + NODE_H + Y_GAP - NODE_H / 2,
      });
    });

    return x;
  }

  place(root, 0, 0, measured.width);

  return {
    width: measured.width,
    height: getDepth(root) * NODE_H + (getDepth(root) - 1) * Y_GAP,
    nodes,
    lines,
  };
}

function measureWidth(node: FamNode): number {
  if (!node.littles.length) return NODE_W;

  return Math.max(
    NODE_W,
    node.littles.reduce((sum, child) => sum + measureWidth(child), 0) +
    X_GAP * (node.littles.length - 1)
  );
}

export function countPeople(node: FamNode): number {
  return 1 + node.littles.reduce((sum, little) => sum + countPeople(little), 0);
}

export function getDepth(node: FamNode): number {
  if (!node.littles.length) return 1;
  return 1 + Math.max(...node.littles.map(getDepth));
}

export function containsName(node: FamNode, name: string): boolean {
  if (namesEqual(node.name, name)) return true;
  return node.littles.some((little) => containsName(little, name));
}

function namesEqual(a: string, b: string) {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

export function findNode(node: FamNode, name: string): FamNode | null {
  if (namesEqual(node.name, name)) return node;

  for (const little of node.littles) {
    const found = findNode(little, name);
    if (found) return found;
  }

  return null;
}

export function getGeneration(root: FamNode, name: string): number | null {
  const path = getPathToName(root, name);
  return path.length ? path.length : null;
}

export function getPathToName(node: FamNode, name: string): string[] {
  if (namesEqual(node.name, name)) return [node.name];

  for (const little of node.littles) {
    const childPath = getPathToName(little, name);

    if (childPath.length) {
      return [node.name, ...childPath];
    }
  }

  return [];
}
