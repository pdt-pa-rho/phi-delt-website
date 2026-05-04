import { getRushEvents } from "@/helpers/rushData";

export async function GET() {
  try {
    const rushEvents = await getRushEvents();
    return Response.json(rushEvents, { status: 200 });
  } catch (error) {
    console.error("Error fetching rush events:", error);
    return Response.json(
      { error: "Failed to fetch rush events" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-static";
export const revalidate = 60;
