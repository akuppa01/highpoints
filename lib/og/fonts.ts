import fs from "fs";
import path from "path";

function loadFont(filename: string): Buffer {
  return fs.readFileSync(path.join(process.cwd(), "public/fonts", filename));
}

export function getOgFonts() {
  return [
    {
      name: "Inter",
      data: loadFont("Inter-Regular.woff"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Inter",
      data: loadFont("Inter-SemiBold.woff"),
      weight: 600 as const,
      style: "normal" as const,
    },
    {
      name: "Playfair Display",
      data: loadFont("PlayfairDisplay-Regular.woff"),
      weight: 400 as const,
      style: "normal" as const,
    },
  ];
}
