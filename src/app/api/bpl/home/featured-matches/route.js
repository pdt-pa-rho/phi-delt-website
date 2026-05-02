import { getFeaturedMatches } from "@/helpers/bpl/homeData";

export async function GET() {
  try {
    const featuredMatches = await getFeaturedMatches();
    return Response.json(featuredMatches, { status: 200 });
  } catch (error) {
    console.error("Error fetching featured matches:", error);
    return Response.json(
      { error: "Failed to fetch featured matches" },
      { status: 500 }
    );
  }
}
