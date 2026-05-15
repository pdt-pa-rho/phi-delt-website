import { getRecentResults } from "@/helpers/bpl/homeData";

export async function GET() {
  try {
    const recentResults = await getRecentResults();
    return Response.json(recentResults, { status: 200 });
  } catch (error) {
    console.error("Error fetching recent results:", error);
    return Response.json(
      { error: "Failed to fetch recent results" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-static";
export const revalidate = 60
