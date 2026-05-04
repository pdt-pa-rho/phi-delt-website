import { getExecData } from "@/helpers/execData";

export async function GET() {
  try {
    const execData = await getExecData();
    return Response.json(execData, { status: 200 });
  } catch (error) {
    console.error("Error fetching exec data:", error);
    return Response.json(
      { error: "Failed to fetch exec data" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-static";
export const revalidate = 60
