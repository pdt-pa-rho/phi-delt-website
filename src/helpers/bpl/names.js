export const standardizeName = function standardizeName(name) {
  return name.replace(/[^\p{L}\p{N}&\s\u0370-\u03FF\u1F00-\u1FFF]/gu, '').trim().toLowerCase();
}

export const getAbbreviation = (name) => {
  return String(name)
    .trim()
    .replace(/[^\p{L}\p{N}&\s\u0370-\u03FF\u1F00-\u1FFF]/gu, "") // Remove punctuation: "Bob's Burgers!" -> "Bobs Burgers"
    .split(/\s+/) // Split words: "5th Floor Gooners" -> ["5th", "Floor", "Gooners"]
    .flatMap((word) => {
      const ordinal = word.match(/^(\d+)(st|nd|rd|th)$/iu);

      if (ordinal) {
        return [ordinal[1]]; // Preserve ordinal number only: "5th" -> "5"
      }

      const chunks = Array.from(word.matchAll(/\d+|\p{L}+/gu)).map(
        (match) => match[0]
      ); // Split numbers from letters: "Team42Alpha" -> ["Team", "42", "Alpha"]

      return chunks.map((chunk) => {
        if (/^\d+$/u.test(chunk)) return chunk; // Preserve numeric chunks: "42" -> "42"
        return chunk[0]; // Take first letter of word/chunk: "Gooners" -> "G"
      });
    })
    .join("") // Combine abbreviation parts: ["5", "F", "G"] -> "5FG"
    .toUpperCase(); // Normalize casing: "5fg" -> "5FG"
};

export function sanitizeName(name) {
  return name.replace(/[^\w\s]/g, '').trim().toLowerCase();
}

export function nameEqual(name1, name2) {
  return standardizeName(name1) == standardizeName(name2);
}
