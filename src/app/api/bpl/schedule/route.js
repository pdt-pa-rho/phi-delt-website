import { getScheduleData } from "@/helpers/bpl/scheduleData";

export async function GET() {
  try {
    const scheduleData = await getScheduleData();
    return Response.json(scheduleData, { status: 200 });
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    return Response.json(
      { error: "Failed to fetch schedule data" },
      { status: 500 }
    );
  }
}
