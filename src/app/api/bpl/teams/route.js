import { getTeamsData } from "@/helpers/bpl/teamsData";

export async function GET() {
  try {
    const teams = await getTeamsData();
    return Response.json(teams, { status: 200 });
  } catch (error) {
    console.error("Error fetching teams data:", error);
    return Response.json(
      { error: "Failed to fetch teams data" },
      { status: 500 }
    );
  }
}
