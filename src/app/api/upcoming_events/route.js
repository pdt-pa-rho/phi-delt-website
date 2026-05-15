import { getUpcomingEvents } from "@/helpers/eventData";

export async function GET() {
  try {
    const rushEvents = await getUpcomingEvents();
    return Response.json(rushEvents, { status: 200 });
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return Response.json(
      { error: "Failed to fetch upcoming events" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-static";
export const revalidate = 60;
