import { getPhilanthropyData } from "@/helpers/philanthropyData";

export async function GET() {
  try {
    const philanthropyData = await getPhilanthropyData();
    return Response.json(philanthropyData, { status: 200 });
  } catch (error) {
    console.error("Error fetching philanthropy data:", error);
    return Response.json(
      { error: "Failed to fetch philanthropy data" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-static";
export const revalidate = 60
