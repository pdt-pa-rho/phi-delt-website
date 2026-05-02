// helpers/bpl/ballImages.ts
import fs from "fs";
import path from "path";

export const BALLS_DIR = path.join(process.cwd(), "src/data/brotherhood/bpl/balls");

export function getAllBallImages() {
  return fs.readdirSync(BALLS_DIR).filter((f) =>
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  );
}
