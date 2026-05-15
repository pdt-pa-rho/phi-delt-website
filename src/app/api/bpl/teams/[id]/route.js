import { getTeamsData } from "@/helpers/bpl/teamsData";

export async function GET(request, { params }) {
  try {
    const teamsData = await getTeamsData();
    const team = teamsData.find((team) => team.id === parseInt(params.id));

    if (!team) {
      return Response.json({ error: "Team not found" }, { status: 404 });
    }

    return Response.json(team, { status: 200 });
  } catch (error) {
    console.error("Error fetching team data:", error);
    return Response.json(
      { error: "Failed to fetch team data" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-static";
export const revalidate = 60
