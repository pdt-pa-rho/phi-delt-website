import {
  getRosterTeams,
  getAllStatMatchRows,
  calculateTeamStats,
} from "@/helpers/bpl/sheetData";

export async function getTeamsData() {
  try {
    const [rosterTeams, weekResults] = await Promise.all([
      getRosterTeams(),
      getAllStatMatchRows(),
    ]);

    const statsByTeam = calculateTeamStats(rosterTeams, weekResults);

    return rosterTeams
      .map((team) => {
        const stats = statsByTeam.get(team.strictName) ?? {
          wins: 0,
          losses: 0,
          gameDiff: 0,
          cupDiff: 0,
          gamesFor: 0,
          gamesAgainst: 0,
          matchesPlayed: 0,
          latestWeek: null,
        };

        return {
          id: team.id,
          name: team.name,
          strictName: team.strictName,
          abbreviation: team.abbreviation,
          players: team.players,
          stats: {
            wins: stats.wins,
            losses: stats.losses,
            record: `${stats.wins}-${stats.losses}`,
            gameDiff: stats.gameDiff,
            cupDiff: stats.cupDiff,
            gamesFor: stats.gamesFor,
            gamesAgainst: stats.gamesAgainst,
            matchesPlayed: stats.matchesPlayed,
          },
          week: stats.latestWeek,
        };
      })
      .sort((a, b) => {
        if (b.stats.gameDiff !== a.stats.gameDiff) {
          return b.stats.gameDiff - a.stats.gameDiff;
        }

        if (b.stats.cupDiff !== a.stats.cupDiff) {
          return b.stats.cupDiff - a.stats.cupDiff;
        }

        return b.stats.wins - a.stats.wins;
      })
      .map((team, index) => ({
        ...team,
        rank: index + 1,
      }));
  } catch (err) {
    console.error("Error fetching teams data:", err);
    return [];
  }
}
