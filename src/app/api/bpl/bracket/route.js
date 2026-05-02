import { NextResponse } from "next/server";
import { getBracketData } from "@/helpers/bpl/bracketData";

export async function GET() {
  try {
    const bracket = await getBracketData();
    return NextResponse.json(bracket);
  } catch (error) {
    console.error("Error fetching bracket data:", error);

    return NextResponse.json(
      { error: "Failed to fetch bracket data" },
      { status: 500 }
    );
  }
}
