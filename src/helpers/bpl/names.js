export const extractName = function extractName(name) {
  const splitName = name.split(/\s+/);
  const stopIndex = splitName.findIndex((s) => s[0] == "(");
  return splitName.slice(0, stopIndex).join(' ');
}

export const standardizeName = function standardizeName(name) {
  return name.replace(/[^\p{L}\p{N}&\s\u0370-\u03FF\u1F00-\u1FFF]/gu, '').trim().toLowerCase();
}

export const getAbbreviation = (name) => {
  const splitName = name.split(/\s+/);
  const stopIndex = splitName.findIndex(w => w[0] == "(");
  return splitName
    .slice(0, stopIndex)  // Isolate name (remove everything after "(")
    .join(' ')            // Join at spaces for special character removal
    .replace(/[^\p{L}\p{N}&\s\u0370-\u03FF\u1F00-\u1FFF]/gu, '')  // Remove all punctuation except greek letters and ampersands
    .split(/\s+/)         // split at spaces
    .flatMap(part => {
      const chunks = Array.from(part.matchAll(/\d+|[^\d]+/gu)).map(m => m[0]);

      return chunks.map((chunk, i) => {
        return /^\d+$/.test(chunk)
          ? chunk             // Preserve all-digit chunks
          : i === 0 || /^\d+$/.test(chunks[i - 1])
            ? chunk[0]        // Take first char of the first non-numeric chunk *after* digits
            : '';             // Skip other non-numeric parts
      }).filter(Boolean);
    })                    // Chunk apart numbers from characters, map to first character or number
    .join('')             // Rejoin
    .toUpperCase();       // Uppercase
};

export function sanitizeName(name) {
  return name.replace(/[^\w\s]/g, '').trim().toLowerCase();
}

export function nameEqual(name1, name2) {
  return sanitizeName(name1) == sanitizeName(name2);
}
