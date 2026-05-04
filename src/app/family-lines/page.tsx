"use client";

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import useSWR from 'swr';

type Member = {
  name: string;
  littles: Member[];
};

type FamilyTree = {
  root: Member;
};

// TreeNode component for displaying individual members
const TreeNode = ({ node, isRoot = false }: { node: Member; isRoot?: boolean }) => {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`p-3 rounded-lg shadow-md mb-2 min-w-[120px] text-center ${
          isRoot ? 'bg-[#0D1433] text-white' : 'bg-[#619CC7] text-white'
        }`}
      >
        {node.name}
      </motion.div>

      {node.littles.length > 0 && (
        <>
          {/* Vertical line connecting to children */}
          <div className="h-6 w-0.5 bg-gray-300"></div>

          {/* Horizontal line for multiple children */}
          {node.littles.length > 1 && (
            <div className="relative">
              <div className="absolute h-0.5 bg-gray-300" style={{
                width: `${Math.max(node.littles.length * 120 - 60, 60)}px`,
                left: `calc(50% - ${Math.max(node.littles.length * 60 - 30, 30)}px)`,
              }}></div>
            </div>
          )}

          {/* Children container */}
          <div className="pt-2 flex justify-center" style={{
            minWidth: `${Math.max(node.littles.length * 140, 140)}px`,
          }}>
            <div className="flex flex-row justify-center space-x-4">
              {node.littles.map((little, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* Vertical line to each child */}
                  <div className="h-4 w-0.5 bg-gray-300"></div>
                  <TreeNode node={little} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// TreeDisplay component for rendering the whole tree with proper scaling
const TreeDisplay = ({ tree }: { tree: FamilyTree }) => {
  const [scale, setScale] = useState(1);
  const [treeSize, setTreeSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to count total nodes in tree
    // const countNodes = (node: Member): number => {
    //   return 1 + node.littles.reduce((sum, little) => sum + countNodes(little), 0);
    // };

    // Function to calculate max width at any level
    const calculateMaxWidth = (node: Member, level = 0, widthByLevel: Map<number, number> = new Map()): Map<number, number> => {
      // Update count for current level
      const currentCount = widthByLevel.get(level) || 0;
      widthByLevel.set(level, currentCount + 1);

      // Process children
      node.littles.forEach(little => {
        calculateMaxWidth(little, level + 1, widthByLevel);
      });

      return widthByLevel;
    };

    // Calculate tree dimensions
    // const totalNodes = countNodes(tree.root);
    const widthByLevel = calculateMaxWidth(tree.root);
    const maxNodesInAnyLevel = Math.max(...Array.from(widthByLevel.values()));

    // Set dimensions based on tree size
    const baseWidth = Math.max(500, maxNodesInAnyLevel * 200);
    const baseHeight = widthByLevel.size * 160 + 100;

    setTreeSize({ width: baseWidth, height: baseHeight });

    // Handle responsive scaling
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const newScale = containerWidth / (baseWidth + 40);
        setScale(Math.min(1, newScale));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [tree]);

  return (
    <div ref={containerRef} className="w-full overflow-auto border rounded-lg p-4 bg-[#DBECF3]">
      <div className="flex justify-center min-h-[400px]">
        <div
          style={{
            transform: `scale(${scale})`,
            width: treeSize.width,
            height: treeSize.height,
            transformOrigin: 'top center'
          }}
          className="flex justify-center items-start pt-6"
        >
          <TreeNode node={tree.root} isRoot={true} />
        </div>
      </div>
    </div>
  );
};

// Main Page Component
const FamilyLinesPage = () => {
  const [forest, setForest] = useState<FamilyTree[]>([]);
  const [roots, setRoots] = useState<string[]>([]);
  const [selectedRoot, setSelectedRoot] = useState<string | null>(null);
  const [selectedTree, setSelectedTree] = useState<FamilyTree | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: famLineData
  } = useSWR('/api/family');

  useEffect(() => {
    // Build the forest
    if (!famLineData) return;

    const { forest, roots } = famLineData;
    setForest(forest);
    setRoots(roots);

    if (roots.length > 0) {
      setSelectedRoot(roots[0]);
      setSelectedTree(forest[0]);
    }

    setIsLoading(false);
  }, [famLineData]);

  const handleRootChange = (rootName: string) => {
    setSelectedRoot(rootName);
    const treeIndex = roots.findIndex(r => r === rootName);
    if (treeIndex !== -1) {
      setSelectedTree(forest[treeIndex]);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-t-2 border-b-2 border-[#0D1433] rounded-full"></div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center text-[#0D1433] mb-8"
      >
        Phi Delta Theta Family Lines
      </motion.h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-[#0D1433]">Select a Family Tree Root:</h2>
        <div className="flex flex-wrap gap-2">
          {roots.map((root, index) => (
            <button
              key={index}
              onClick={() => handleRootChange(root)}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                selectedRoot === root
                  ? 'bg-[#0D1433] text-white'
                  : 'bg-[#DBECF3] text-[#0D1433] hover:bg-[#619CC7] hover:text-white'
              }`}
            >
              {root}
            </button>
          ))}
        </div>
      </div>

      {selectedTree && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 text-[#0D1433]">
            {selectedRoot}&apos;s Family Tree
          </h2>
          <div className="w-full">
            <TreeDisplay tree={selectedTree} />
          </div>
        </motion.div>
      )}

      <div className="mt-12 p-4 bg-[#DBECF3] rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-[#0D1433]">About Family Lines</h3>
        <p className="text-[#0D1433]">
          Family lines in Phi Delta Theta represent the mentorship relationships between members.
          Each new member (Little) is paired with a mentor (Big) who guides them through their journey in the fraternity.
          These relationships form the backbone of our brotherhood and create lasting bonds between generations of members.
        </p>
      </div>
    </main>
  );
};

export default FamilyLinesPage;
