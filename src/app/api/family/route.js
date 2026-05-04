import { getFamLineData } from "@/helpers/famLineData";

export async function GET() {
  try {
    const famLineData = await getFamLineData();
    return Response.json(famLineData, { status: 200 });
  } catch (error) {
    console.error("Error fetching family line data:", error);
    return Response.json(
      { error: "Failed to fetch family line data" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-static";
export const revalidate = 60
