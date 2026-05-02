import { sheets } from "@/lib/google";
import { sanitizeName, getAbbreviation } from "@/helpers/bpl/names";

const SPREADSHEET_ID = process.env.BPL_SHEET_ID;

export async function getSheetValues(sheetName, range = "A:ZZ") {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `'${sheetName}'!${range}`,
  });

  return res.data.values ?? [];
}

export async function getWorkbookSheetNames() {
  const res = await sheets.spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID,
  });

  return (res.data.sheets ?? [])
    .map((sheet) => sheet.properties?.title)
    .filter(Boolean);
}

export async function getWeekSheetNames() {
  const names = await getWorkbookSheetNames();

  return names
    .filter((name) => /^Week\s+\d+$/i.test(name))
    .sort((a, b) => getWeekNumber(a) - getWeekNumber(b));
}

export function getWeekNumber(sheetName) {
  return Number(sheetName.match(/\d+/)?.[0] ?? 0);
}

export function parseResult(resultText) {
  if (!resultText) return null;

  const match = String(resultText).match(/(\d+)\s*-\s*(\d+)\s*([+-]?\s*\d+)?/);
  if (!match) return null;

  return {
    team1Games: Number(match[1]),
    team2Games: Number(match[2]),
    differential: Number(String(match[3] ?? 0).replace(/\s+/g, "")),
    raw: resultText,
  };
}

export function readMatchupRows(values) {
  const rows = [];

  for (let i = 2; i < values.length; i++) {
    const row = values[i];

    if (!row?.[1] || !row?.[2] || !row?.[4] || !row?.[5]) continue;

    const result = parseResult(row[7] ?? row[8]);

    rows.push({
      rowIndex: i + 1,
      homePlayers: row[1],
      homeTeam: row[2],
      awayPlayers: row[4],
      awayTeam: row[5],
      result,
    });
  }

  return rows;
}

export function teamFromSeedRow(row) {
  const seed = Number(row[0]);
  if (!seed || !row[2]) return null;

  return {
    id: seed,
    seed,
    rank: seed,
    playersText: row[1],
    name: row[2],
    strictName: sanitizeName(row[2]),
    abbreviation: getAbbreviation(row[2]),
    record: normalizeRecord(row[3]),
    gameDiff: normalizeSheetNumber(row[4]),
    cupDiff: normalizeSheetNumber(row[5]),
  };
}

function normalizeRecord(value) {
  if (typeof value === "string") return value;

  // Google Sheets sometimes serializes W-L-looking cells weirdly depending on formatting.
  // Prefer treating these as display strings from the Sheet API if possible.
  return String(value ?? "");
}

function normalizeSheetNumber(value) {
  if (value === null || value === undefined || value === "") return 0;
  if (typeof value === "number") return value;
  return Number(String(value).replace(/\s+/g, "")) || 0;
}
