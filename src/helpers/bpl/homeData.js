import {
  getSheetValues,
  getWeekSheetNames,
  readMatchupRows,
  teamFromSeedRow,
} from "@/helpers/bpl/sheetData";
import { sanitizeName, getAbbreviation } from "@/helpers/bpl/names";

export async function getTopTeams() {
  try {
    const values = await getSheetValues("Seeding", "A:F");

    return values
      .slice(1)
      .map(teamFromSeedRow)
      .filter(Boolean)
      .slice(0, 3)
      .map((team) => ({
        id: team.seed,
        rank: team.seed,
        name: team.name,
        strictName: team.strictName,
        abbreviation: team.abbreviation,
        wins: Number(team.record.match(/^(\d+)/)?.[1] ?? 0),
        losses: Number(team.record.match(/-(\d+)/)?.[1] ?? 0),
        differential: team.cupDiff,
      }));
  } catch (err) {
    console.error("Error fetching top teams:", err);
    return [];
  }
}

export async function getRecentResults() {
  try {
    const weekSheets = await getWeekSheetNames();

    for (const sheetName of [...weekSheets].reverse()) {
      const values = await getSheetValues(sheetName);
      const completed = readMatchupRows(values).filter((m) => m.result);

      if (completed.length > 0) {
        return completed.map((match, index) => formatResult(match, index + 1));
      }
    }

    return [];
  } catch (err) {
    console.error("Error fetching recent results:", err);
    return [];
  }
}

export async function getFeaturedMatches() {
  try {
    const playInValues = await getSheetValues("Play-in");
    const playIns = readMatchupRows(playInValues);

    if (playIns.length > 0) {
      return playIns.map((match, index) => formatMatchup(match, index + 1));
    }

    const weekSheets = await getWeekSheetNames();
    const latestWeek = weekSheets[weekSheets.length - 1];

    if (!latestWeek) return [];

    const values = await getSheetValues(latestWeek);
    return readMatchupRows(values).map((match, index) =>
      formatMatchup(match, index + 1)
    );
  } catch (err) {
    console.error("Error fetching featured matches:", err);
    return [];
  }
}

function formatMatchup(match, id) {
  return {
    id,
    team1: {
      name: match.homeTeam,
      strictName: sanitizeName(match.homeTeam),
      abbreviation: getAbbreviation(match.homeTeam),
    },
    team2: {
      name: match.awayTeam,
      strictName: sanitizeName(match.awayTeam),
      abbreviation: getAbbreviation(match.awayTeam),
    },
  };
}

function formatResult(match, id) {
  const { team1Games, team2Games, differential } = match.result;

  return {
    id,
    score: `${team1Games}-${team2Games}`,
    differential: `${differential > 0 ? "+" : ""}${differential}`,
    team1: {
      name: match.homeTeam,
      strictName: sanitizeName(match.homeTeam),
      abbreviation: getAbbreviation(match.homeTeam),
      result: team1Games > team2Games ? "W" : "L",
    },
    team2: {
      name: match.awayTeam,
      strictName: sanitizeName(match.awayTeam),
      abbreviation: getAbbreviation(match.awayTeam),
      result: team2Games > team1Games ? "W" : "L",
    },
  };
}
