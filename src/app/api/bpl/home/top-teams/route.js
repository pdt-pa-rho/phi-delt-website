import { getTopTeams } from "@/helpers/bpl/homeData";

export async function GET() {
  try {
    const topTeams = await getTopTeams();
    return Response.json(topTeams, { status: 200 });
  } catch (error) {
    console.error("Error fetching top teams:", error);
    return Response.json(
      { error: "Failed to fetch top teams" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-static";
export const revalidate = 60
