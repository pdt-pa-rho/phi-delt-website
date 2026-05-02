import { getScheduleData } from "@/helpers/bpl/scheduleData";

export async function GET(request) {
  try {
    const week = parseInt(request.nextUrl.searchParams.get('week') || 0);

    const scheduleData = await getScheduleData(week);
    return Response.json(scheduleData, { status: 200 });
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    return Response.json(
      { error: "Failed to fetch schedule data" },
      { status: 500 }
    );
  }
}
