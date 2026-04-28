// app/api/bpl/ball/[img]/route.ts

import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { BALLS_DIR, getAllBallImages } from "@/helpers/bpl/ballImages";

export async function GET(
  req,
  { params }
) {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const files = getAllBallImages();

  const safeFile = files.find((f) => f === params.img);

  if (!safeFile) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = path.join(BALLS_DIR, safeFile);
  const buffer = fs.readFileSync(filePath);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": getContentType(safeFile),
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function getContentType(file) {
  if (file.endsWith(".png")) return "image/png";
  if (file.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}
