// app/api/bpl/ball/route.ts

import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { BALLS_DIR, getAllBallImages } from "@/helpers/bpl/ballImages";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const files = getAllBallImages();

  if (files.length === 0) {
    return new NextResponse("No images found", { status: 404 });
  }

  const file = files[Math.floor(Math.random() * files.length)];
  const filePath = path.join(BALLS_DIR, file);

  const buffer = fs.readFileSync(filePath);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": getContentType(file),
      "Cache-Control": "no-store", // prevent caching randomness
    },
  });
}

function getContentType(file) {
  if (file.endsWith(".png")) return "image/png";
  if (file.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}
