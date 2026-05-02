import { getSheetValues, teamFromSeedRow } from "@/helpers/bpl/sheetData";

export async function getTeamsData() {
  try {
    const values = await getSheetValues("Seeding", "A:F");

    return values
      .slice(1)
      .map(teamFromSeedRow)
      .filter(Boolean)
      .map((team) => ({
        id: team.seed,
        name: team.name,
        strictName: team.strictName,
        abbreviation: team.abbreviation,
        players: String(team.playersText ?? "")
          .split("|")
          .map((p) => p.trim())
          .filter(Boolean),
        stats: {
          record: team.record,
          gameDiff: team.gameDiff,
          differential: team.cupDiff,
        },
        rank: team.seed,
        seed: team.seed,
      }));
  } catch (err) {
    console.error("Error fetching teams data:", err);
    return [];
  }
}
