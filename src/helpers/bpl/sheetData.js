import { sheets } from "@/lib/google";
import { sanitizeName, getAbbreviation, nameEqual } from "@/helpers/bpl/names";
import { getWebsiteConfig } from "@/helpers/config";

export async function getSheetValues(sheetName, range = "A:ZZ") {
  const config = await getWebsiteConfig();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: config.BPL_SHEET_ID,
    range: `'${sheetName}'!${range}`,
  });

  return res.data.values ?? [];
}

export async function getWorkbookSheetNames() {
  const config = await getWebsiteConfig();

  const res = await sheets.spreadsheets.get({
    spreadsheetId: config.BPL_SHEET_ID,
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

export async function getRosterTeams() {
  const values = await getSheetValues("Teams", "A:C");

  return values
    .map((row, index) => {
      const playersText = String(row[0] ?? "").trim();
      const name = String(row[1] ?? "").trim();
      const sourceId = Number(row[2] ?? index + 1);

      if (!playersText || !name) return null;

      return {
        id: sourceId,
        sourceId,
        name,
        strictName: sanitizeName(name),
        abbreviation: getAbbreviation(name),
        playersText,
        players: splitPlayers(playersText),
      };
    })
    .filter(Boolean);
}

export async function getAllWeekResults() {
  const weekSheets = await getWeekSheetNames();

  const allResults = [];

  for (const sheetName of weekSheets) {
    const values = await getSheetValues(sheetName);
    const week = getWeekNumber(sheetName);

    const rows = readMatchupRows(values).map((match) => ({
      ...match,
      week,
      sheetName,
    }));

    allResults.push(...rows);
  }

  return allResults;
}

export function calculateTeamStats(rosterTeams, weekResults) {
  const statsByTeam = new Map();

  for (const team of rosterTeams) {
    statsByTeam.set(team.strictName, {
      wins: 0,
      losses: 0,
      gameDiff: 0,
      cupDiff: 0,
      matchesPlayed: 0,
      latestWeek: null,
    });
  }

  for (const match of weekResults) {
    if (!match.result) continue;

    applyResult(statsByTeam, rosterTeams, {
      teamName: match.homeTeam,
      wins: match.result.team1Games,
      losses: match.result.team2Games,
      cupDiff: match.result.cupDiff,
      week: match.week,
    });

    applyResult(statsByTeam, rosterTeams, {
      teamName: match.awayTeam,
      wins: match.result.team2Games,
      losses: match.result.team1Games,
      cupDiff: -match.result.cupDiff,
      week: match.week,
    });
  }

  return statsByTeam;
}

function applyResult(
  statsByTeam,
  rosterTeams,
  { teamName, wins, losses, cupDiff, week }
) {
  const rosterTeam = findRosterTeam(rosterTeams, teamName);
  if (!rosterTeam) return;

  const stats = statsByTeam.get(rosterTeam.strictName);
  if (!stats) return;

  stats.wins += wins;
  stats.losses += losses;
  stats.gameDiff += wins - losses;
  stats.cupDiff += cupDiff;
  stats.matchesPlayed += 1;
  stats.latestWeek = Math.max(stats.latestWeek ?? 0, week ?? 0);
}

export function findRosterTeam(rosterTeams, name) {
  return rosterTeams.find((team) => nameEqual(team.name, name));
}

export function parseResult(resultText) {
  if (!resultText) return null;

  const match = String(resultText).match(/(\d+)\s*-\s*(\d+)\s*([+-]?\s*\d+)?/);
  if (!match) return null;

  return {
    team1Games: Number(match[1]),
    team2Games: Number(match[2]),
    cupDiff: Number(String(match[3] ?? 0).replace(/\s+/g, "")),
    raw: resultText,
  };
}

export function readMatchupRows(values) {
  const rows = [];

  for (let i = 0; i < values.length; i++) {
    const row = values[i];

    const homePlayers = row?.[1];
    const homeTeam = row?.[2];
    const awayPlayers = row?.[4];
    const awayTeam = row?.[5];

    if (!homePlayers || !homeTeam || !awayPlayers || !awayTeam) continue;

    if (
      String(homePlayers).toLowerCase().includes("home") ||
      String(awayPlayers).toLowerCase().includes("away")
    ) {
      continue;
    }

    const result = parseResult(row[7] ?? row[8]);

    rows.push({
      rowIndex: i + 1,
      homePlayers,
      homeTeam,
      awayPlayers,
      awayTeam,
      result,
    });
  }

  return rows;
}

export function splitPlayers(playersText) {
  return String(playersText ?? "")
    .split(/[|/]/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function teamFromSeedRow(row) {
  const seed = Number(row[0]);
  if (!seed || !row[2]) return null;

  return {
    id: seed,
    seed,
    rank: seed,
    playersText: row[1],
    players: splitPlayers(row[1]),
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
  return String(value ?? "");
}

function normalizeSheetNumber(value) {
  if (value === null || value === undefined || value === "") return 0;
  if (typeof value === "number") return value;
  return Number(String(value).replace(/\s+/g, "")) || 0;
}
