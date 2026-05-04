import { sheets } from "@/lib/google";

// Function to build the family tree
function buildFamilyForest(pairs) {
  const bigToLittlesMap = new Map();
  const allMembers = new Set();

  // First pass: build the map and collect all members
  pairs.forEach(pair => {
    bigToLittlesMap.set(pair.big, pair.littles);
    allMembers.add(pair.big);
    pair.littles.forEach(little => allMembers.add(little));
  });

  // Find members who are not littles of anyone (roots)
  const roots = [];
  allMembers.forEach(member => {
    let isLittle = false;
    bigToLittlesMap.forEach(littles => {
      if (littles.includes(member)) {
        isLittle = true;
      }
    });
    if (!isLittle) {
      roots.push(member);
    }
  });

  // Build the tree for each root
  const buildTree = (name) => {
    const littles = bigToLittlesMap.get(name) || [];
    return {
      name,
      littles: littles.map(little => buildTree(little))
    };
  };

  // Create a forest of family trees
  const forest = roots.map(root => ({
    root: buildTree(root)
  }));

  return { forest, roots };
};

export async function getFamLineData() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.CONFIG_SHEET_ID,
    range: "Fam Lines!A:B",
  });

  const rows = res.data.values ?? [];
  const dataRows = rows.slice(1);

  const littlesByBig = new Map();

  for (const row of dataRows) {
    const big = String(row[0] ?? "").trim();
    const little = String(row[1] ?? "").trim();

    if (!big || !little) continue;

    if (!littlesByBig.has(big)) {
      littlesByBig.set(big, []);
    }

    littlesByBig.get(big).push(little);
  }

  const pairs = Array.from(littlesByBig.entries()).map(([big, littles]) => ({
    big,
    littles,
  }));

  return buildFamilyForest(pairs);
}
