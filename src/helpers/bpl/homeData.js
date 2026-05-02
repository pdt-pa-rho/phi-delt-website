import {
  getRosterTeams,
  getAllWeekResults,
  calculateTeamStats,
  getWeekSheetNames,
  getSheetValues,
  readMatchupRows,
} from "@/helpers/bpl/sheetData";
import { sanitizeName, getAbbreviation } from "@/helpers/bpl/names";

export async function getTopTeams() {
  try {
    const [rosterTeams, weekResults] = await Promise.all([
      getRosterTeams(),
      getAllWeekResults(),
    ]);

    const statsByTeam = calculateTeamStats(rosterTeams, weekResults);

    return rosterTeams
      .map((team) => {
        const stats = statsByTeam.get(team.strictName) ?? {
          wins: 0,
          losses: 0,
          gameDiff: 0,
          cupDiff: 0,
        };

        return {
          id: team.id,
          name: team.name,
          strictName: team.strictName,
          abbreviation: team.abbreviation,
          wins: stats.wins,
          losses: stats.losses,
          gameDiff: stats.gameDiff,
          cupDiff: stats.cupDiff,
        };
      })
      .sort((a, b) => {
        if (b.gameDiff !== a.gameDiff) return b.gameDiff - a.gameDiff;
        if (b.cupDiff !== a.cupDiff) return b.cupDiff - a.cupDiff;
        return b.wins - a.wins;
      })
      .slice(0, 3)
      .map((team, index) => ({
        ...team,
        rank: index + 1,
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
    const weekSheets = await getWeekSheetNames();

    for (const sheetName of [...weekSheets].reverse()) {
      const values = await getSheetValues(sheetName);
      const upcoming = readMatchupRows(values).filter((m) => !m.result);

      if (upcoming.length > 0) {
        return upcoming.map((match, index) => formatMatchup(match, index + 1));
      }
    }

    const latestWeek = weekSheets[weekSheets.length - 1];
    if (!latestWeek) return [];

    const values = await getSheetValues(latestWeek);

    return readMatchupRows(values)
      .slice(0, 6)
      .map((match, index) => formatMatchup(match, index + 1));
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
  const { team1Games, team2Games, cupDiff } = match.result;

  return {
    id,
    score: `${team1Games}-${team2Games}`,
    cupDiff: `${cupDiff > 0 ? "+" : ""}${cupDiff}`,
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
