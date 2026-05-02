"use client";

import Link from "next/link";
import useSWR from "swr";
import clsx from "clsx";
import { useLayoutEffect, useCallback, useMemo, useState } from "react";

type Team = {
  seed: number | null;
  name: string;
  players?: string[];
};

type Result = {
  raw?: string;
  team1Score?: number;
  team2Score?: number;
  cupDiff?: number | null;
};

type BracketMatch = {
  id: string;
  round: number;
  roundLabel: string;
  matchIndex: number;
  team1: Team | null;
  team2: Team | null;
  result: Result | string | null;
  winner: Team | null;
};

type BracketRound = {
  round: number;
  roundLabel: string;
  matches: BracketMatch[];
};

type BracketData = {
  enabled: boolean;
  rounds: BracketRound[];
};

type VisualColumn = {
  id: string;
  label: string;
  side: "left" | "right" | "center";
  roundIndex: number;
  matches: BracketMatch[];
};

const MIN_CARD_W = 145;
const MAX_CARD_W = 190;
const CARD_H = 88;
const MIN_COL_GAP = 34;
const MAX_COL_GAP = 76;
const ROW_GAP = 16;

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch bracket");
  return res.json();
};

export default function Bracket() {
  const [measureRef, width] = useElementWidth<HTMLDivElement>();

  const { data } = useSWR<BracketData>("/api/bpl/bracket", fetcher);

  if (!data?.enabled || !data.rounds?.length) return null;

  const status = getBracketStatus(data.rounds);

  return (
    <section className="relative mb-8">
      <div
        className={clsx(
          "absolute -inset-2 rounded-2xl blur-2xl transition-colors",
          status.glowClass
        )}
      />

      <div ref={measureRef} className="glass-card relative rounded-2xl p-6">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              {status.label}
            </p>
            <h2 className="text-3xl font-bold gradient-text">
              Bracket
            </h2>
          </div>

          {status.winner && (
            <div className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-right">
              <p className="text-xs uppercase tracking-widest text-amber-200/70">
                Champion
              </p>
              <TeamLink
                team={status.winner}
                className="font-semibold text-amber-100"
              />
            </div>
          )}
        </div>

        <div className="hidden lg:block overflow-x-auto pb-2">
          <SymmetricBracket rounds={data.rounds} availableWidth={width - 48} />
        </div>

        <div className="lg:hidden overflow-x-auto pb-2">
          <OneSidedBracket rounds={data.rounds} availableWidth={width - 48} />
        </div>
      </div>
    </section>
  );
}

function SymmetricBracket({
  rounds,
  availableWidth,
}: {
  rounds: BracketRound[];
  availableWidth: number;
}) {
  const columns = useMemo(() => buildVisualColumns(rounds), [rounds]);

  const layout = useMemo(
    () => getVisualLayout(columns, availableWidth),
    [columns, availableWidth]
  );

  return (
    <div
      className="relative mx-auto"
      style={{ width: layout.width, height: layout.height }}
    >
      <VisualBracketLines columns={columns} layout={layout} />

      {columns.map((column, columnIndex) => (
        <div key={column.id}>
          <div
            className="absolute text-center text-xs font-semibold uppercase tracking-widest text-white/40"
            style={{
              left: layout.getColumnX(columnIndex),
              top: -30,
              width: layout.cardW,
            }}
          >
            {column.label}
          </div>

          {column.matches.map((match, matchIndex) => (
            <MatchCard
              key={`${column.id}-${match.id}`}
              match={match}
              side={column.side}
              x={layout.getColumnX(columnIndex)}
              y={layout.getMatchCenterY(columnIndex, matchIndex) - CARD_H / 2}
              cardW={layout.cardW}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function OneSidedBracket({
  rounds,
  availableWidth,
}: {
  rounds: BracketRound[];
  availableWidth: number;
}) {
  const layout = useMemo(
    () => getOneSidedLayout(rounds, availableWidth),
    [rounds, availableWidth]
  );

  return (
    <div
      className="relative mx-auto"
      style={{ width: layout.width, height: layout.height }}
    >
      <OneSidedLines rounds={rounds} layout={layout} />

      {rounds.map((round, roundIndex) => (
        <div key={round.round}>
          <div
            className="absolute text-center text-xs font-semibold uppercase tracking-widest text-white/40"
            style={{
              left: layout.getRoundX(roundIndex),
              top: -30,
              width: layout.cardW,
            }}
          >
            {round.roundLabel}
          </div>

          {round.matches.map((match, matchIndex) => (
            <MatchCard
              key={match.id}
              match={match}
              side="left"
              x={layout.getRoundX(roundIndex)}
              y={layout.getMatchCenterY(roundIndex, matchIndex) - CARD_H / 2}
              cardW={layout.cardW}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function ScoreDisplay({
  result,
}: {
  result: {
    team1Score: number | null;
    team2Score: number | null;
    cupDiff: string | null;
    raw: string;
  };
}) {
  if (result.team1Score === null || result.team2Score === null) {
    return <span className="text-[10px] text-violet-300">{result.raw}</span>;
  }

  const team1Won = result.team1Score > result.team2Score;
  const team2Won = result.team2Score > result.team1Score;

  return (
    <div className="flex items-center text-[10px]">
      <span className={team1Won ? "text-green-400" : "text-red-400"}>
        {result.team1Score}
      </span>
      <span className="mx-1 text-gray-400">-</span>
      <span className={team2Won ? "text-green-400" : "text-red-400"}>
        {result.team2Score}
      </span>

      {result.cupDiff && (
        <span className="ml-2 text-gray-400">{result.cupDiff}</span>
      )}
    </div>
  );
}

function MatchCard({
  match,
  x,
  y,
  cardW,
  side,
}: {
  match: BracketMatch;
  x: number;
  y: number;
  cardW: number;
  side: "left" | "right" | "center";
}) {
  const complete = isMatchComplete(match);
  const result = normalizeResult(match.result);
  const isFinal = match.roundLabel === "Final";

  return (
    <div
      className={clsx(
        "absolute rounded-xl border p-2 shadow-lg transition",
        complete && !isFinal
          ? "border-white/5 bg-black/15 scale-90"
          : "border-white/10 bg-black/35",
        complete &&
        isFinal &&
        "border-amber-300/40 bg-amber-300/10 shadow-[0_0_30px_rgba(251,191,36,0.25)]"
      )}
      style={{
        left: x,
        top: y,
        width: cardW,
        height: CARD_H,
      }}
    >
      <div className={clsx(complete && !isFinal && "opacity-45")}>
        <TeamRow team={match.team1} winner={match.winner} side={side} />
        <TeamRow team={match.team2} winner={match.winner} side={side} />
      </div>

      {result && (
        <div className="mt-1 flex h-4 items-center justify-center border-t border-white/10 pt-1">
          <ScoreDisplay result={result} />
        </div>
      )}
    </div>
  );
}

function TeamRow({
  team,
  winner,
  side,
}: {
  team: Team | null;
  winner: Team | null;
  side: "left" | "right" | "center";
}) {
  const isWinner =
    team?.name &&
    winner?.name &&
    team.name.toLowerCase() === winner.name.toLowerCase();

  const isLoser = Boolean(winner && team && !isWinner);

  return (
    <div
      className={clsx(
        "flex h-7 items-center gap-2 px-2 text-xs",
        side === "right" && "flex-row-reverse text-right",
        isWinner && "font-semibold text-white",
        isLoser && "text-white/35",
        !team && "text-white/20"
      )}
    >
      <span className="w-6 shrink-0 font-semibold text-amber-300">
        {team?.seed ?? ""}
      </span>

      {team ? (
        <TeamLink team={team} className="min-w-0 flex-1 truncate" />
      ) : (
        <span className="min-w-0 flex-1 truncate">—</span>
      )}
    </div>
  );
}

function drawColumnConnections({
  paths,
  sourceColumn,
  targetColumn,
  sourceColumnIndex,
  targetColumnIndex,
  layout,
  direction,
}: {
  paths: React.ReactNode[];
  sourceColumn: VisualColumn;
  targetColumn: VisualColumn;
  sourceColumnIndex: number;
  targetColumnIndex: number;
  layout: ReturnType<typeof getVisualLayout>;
  direction: "left" | "right";
}) {
  sourceColumn.matches.forEach((match, sourceMatchIndex) => {
    const targetMatchIndex = Math.floor(sourceMatchIndex / 2);

    if (targetMatchIndex >= targetColumn.matches.length) return;

    const x1 =
      direction === "right"
        ? layout.getColumnX(sourceColumnIndex) + layout.cardW
        : layout.getColumnX(sourceColumnIndex);

    const x2 =
      direction === "right"
        ? layout.getColumnX(targetColumnIndex)
        : layout.getColumnX(targetColumnIndex) + layout.cardW;

    const y1 = layout.getMatchCenterY(sourceColumnIndex, sourceMatchIndex);
    const y2 = layout.getMatchCenterY(targetColumnIndex, targetMatchIndex);

    const midX = x1 + (x2 - x1) / 2;

    paths.push(
      <path
        key={`${sourceColumn.id}-${targetColumn.id}-${match.id}`}
        d={`M ${x1} ${y1} H ${midX} V ${y2} H ${x2}`}
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  });
}

function VisualBracketLines({
  columns,
  layout,
}: {
  columns: VisualColumn[];
  layout: ReturnType<typeof getVisualLayout>;
}) {
  const paths: React.ReactNode[] = [];

  for (let columnIndex = 0; columnIndex < columns.length - 1; columnIndex++) {
    const leftColumn = columns[columnIndex];
    const rightColumn = columns[columnIndex + 1];

    // Left side: outer -> inner, so left column feeds right column.
    if (leftColumn.side === "left") {
      drawColumnConnections({
        paths,
        sourceColumn: leftColumn,
        targetColumn: rightColumn,
        sourceColumnIndex: columnIndex,
        targetColumnIndex: columnIndex + 1,
        layout,
        direction: "right",
      });
    }

    // Right side: outer -> inner, so right column feeds left column.
    if (rightColumn.side === "right") {
      drawColumnConnections({
        paths,
        sourceColumn: rightColumn,
        targetColumn: leftColumn,
        sourceColumnIndex: columnIndex + 1,
        targetColumnIndex: columnIndex,
        layout,
        direction: "left",
      });
    }
  }

  return (
    <svg className="pointer-events-none absolute inset-0 overflow-visible">
      {paths}
    </svg>
  );
}

function OneSidedLines({
  rounds,
  layout,
}: {
  rounds: BracketRound[];
  layout: ReturnType<typeof getOneSidedLayout>;
}) {
  const paths: React.ReactNode[] = [];

  for (let roundIndex = 0; roundIndex < rounds.length - 1; roundIndex++) {
    rounds[roundIndex].matches.forEach((match, matchIndex) => {
      const nextMatchIndex = Math.floor(matchIndex / 2);

      const x1 = layout.getRoundX(roundIndex) + layout.cardW;
      const y1 = layout.getMatchCenterY(roundIndex, matchIndex);

      const x2 = layout.getRoundX(roundIndex + 1);
      const y2 = layout.getMatchCenterY(roundIndex + 1, nextMatchIndex);

      const midX = x1 + (x2 - x1) / 2;

      paths.push(
        <path
          key={`${match.id}-line`}
          d={`M ${x1} ${y1} H ${midX} V ${y2} H ${x2}`}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    });
  }

  return (
    <svg className="pointer-events-none absolute inset-0 overflow-visible">
      {paths}
    </svg>
  );
}

function buildVisualColumns(rounds: BracketRound[]): VisualColumn[] {
  const finalIndex = rounds.length - 1;

  if (rounds.length < 2) {
    return [
      {
        id: "single",
        label: rounds[0]?.roundLabel ?? "Bracket",
        side: "center",
        roundIndex: 0,
        matches: rounds[0]?.matches ?? [],
      },
    ];
  }

  const columns: VisualColumn[] = [];

  for (let roundIndex = 0; roundIndex < finalIndex; roundIndex++) {
    const round = rounds[roundIndex];
    const half = Math.ceil(round.matches.length / 2);

    columns.push({
      id: `left-r${round.round}`,
      label: round.roundLabel,
      side: "left",
      roundIndex,
      matches: round.matches.slice(0, half),
    });
  }

  columns.push({
    id: "final",
    label: rounds[finalIndex].roundLabel,
    side: "center",
    roundIndex: finalIndex,
    matches: rounds[finalIndex].matches,
  });

  for (let roundIndex = finalIndex - 1; roundIndex >= 0; roundIndex--) {
    const round = rounds[roundIndex];
    const half = Math.ceil(round.matches.length / 2);

    columns.push({
      id: `right-r${round.round}`,
      label: round.roundLabel,
      side: "right",
      roundIndex,
      matches: round.matches.slice(half),
    });
  }

  return columns;
}

function getVisualLayout(columns: VisualColumn[], availableWidth: number) {
  const columnCount = columns.length;
  const largestColumnCount = Math.max(...columns.map((c) => c.matches.length));

  const rawCardW =
    (availableWidth - (columnCount - 1) * MIN_COL_GAP) / columnCount;

  const cardW = clamp(rawCardW, MIN_CARD_W, MAX_CARD_W);

  const colGap = clamp(
    (availableWidth - columnCount * cardW) / Math.max(1, columnCount - 1),
    MIN_COL_GAP,
    MAX_COL_GAP
  );

  const width = columnCount * cardW + (columnCount - 1) * colGap;
  const height =
    largestColumnCount * CARD_H + (largestColumnCount - 1) * ROW_GAP;

  return {
    width,
    height,
    cardW,
    colGap,
    getColumnX: (columnIndex: number) => columnIndex * (cardW + colGap),
    getMatchCenterY: (columnIndex: number, matchIndex: number) => {
      const count = columns[columnIndex].matches.length || 1;
      return ((matchIndex + 0.5) * height) / count;
    },
  };
}

function getOneSidedLayout(rounds: BracketRound[], availableWidth: number) {
  const roundCount = rounds.length;
  const firstRoundCount = rounds[0].matches.length;

  const rawCardW =
    (availableWidth - (roundCount - 1) * MIN_COL_GAP) / roundCount;

  const cardW = clamp(rawCardW, MIN_CARD_W, MAX_CARD_W);

  const colGap = clamp(
    (availableWidth - roundCount * cardW) / Math.max(1, roundCount - 1),
    MIN_COL_GAP,
    MAX_COL_GAP
  );

  const width = roundCount * cardW + (roundCount - 1) * colGap;
  const height = firstRoundCount * CARD_H + (firstRoundCount - 1) * ROW_GAP;

  return {
    width,
    height,
    cardW,
    getRoundX: (roundIndex: number) => roundIndex * (cardW + colGap),
    getMatchCenterY: (roundIndex: number, matchIndex: number) => {
      const matchCount = rounds[roundIndex].matches.length;
      return ((matchIndex + 0.5) * height) / matchCount;
    },
  };
}

function getBracketStatus(rounds: BracketRound[]) {
  const finalRound = rounds[rounds.length - 1];
  const finalMatch = finalRound?.matches[0];

  if (isMatchComplete(finalMatch)) {
    return {
      label: "Champion crowned",
      winner: finalMatch.winner,
      glowClass: "bg-amber-400/30",
    };
  }

  const activeRound =
    rounds.find((round) =>
      round.matches.some(
        (match) => match.team1 && match.team2 && !isMatchComplete(match)
      )
    ) ?? finalRound;

  return {
    label:
      activeRound.round === rounds.length
        ? "Finals"
        : activeRound.round === rounds.length - 1
          ? "Semifinals"
          : activeRound.roundLabel,
    winner: null,
    glowClass:
      activeRound.round >= rounds.length - 1
        ? "bg-pink-500/25"
        : activeRound.round >= Math.ceil(rounds.length / 2)
          ? "bg-purple-500/25"
          : "bg-blue-500/25",
  };
}

function isMatchComplete(match?: BracketMatch | null) {
  return Boolean(match?.result || match?.winner);
}

function normalizeResult(result: BracketMatch["result"]) {
  if (!result) return null;

  const raw =
    typeof result === "string"
      ? result
      : result.raw ??
      `${result.team1Score ?? ""}-${result.team2Score ?? ""}`;

  const match = raw.match(/^(\d+)\s*-\s*(\d+)(?:\s+([+-]?\d+))?/);

  if (!match) {
    return {
      raw,
      team1Score: null,
      team2Score: null,
      cupDiff: null,
    };
  }

  return {
    raw,
    team1Score: Number(match[1]),
    team2Score: Number(match[2]),
    cupDiff: match[3] ?? null,
  };
}

function TeamLink({
  team,
  className,
}: {
  team: Team;
  className?: string;
}) {
  return (
    <Link
      href={{
        pathname: "/brotherhood/bpl/teams",
        query: { team: team.name },
      }}
      className={clsx(
        "transition-colors hover:text-blue-300 hover:underline underline-offset-4",
        className
      )}
    >
      {team.name}
    </Link>
  );
}

function useElementWidth<T extends HTMLElement>() {
  const [node, setNode] = useState<T | null>(null);
  const [width, setWidth] = useState(0);

  const ref = useCallback((element: T | null) => {
    setNode(element);
  }, []);

  useLayoutEffect(() => {
    if (!node) return;

    const update = () => {
      setWidth(node.clientWidth);
    };

    update();

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const nextWidth =
        entry.borderBoxSize?.[0]?.inlineSize ??
        entry.contentRect.width ??
        node.clientWidth;

      setWidth(nextWidth);
    });

    observer.observe(node);

    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [node]);

  return [ref, width] as const;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
