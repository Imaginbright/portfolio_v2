import { getPlaiceholder } from "plaiceholder";
import fs from "node:fs/promises";
import path from "node:path";

export async function getBlurData(src: string) {
  try {
    // 1. Check if the image is a remote URL (like YouTube) or local
    const isRemote = src.startsWith("http");
    let buffer: Buffer;

    if (isRemote) {
      // For YouTube/Remote: Use fetch
      const res = await fetch(src);
      buffer = Buffer.from(await res.arrayBuffer());
    } else {
      // For Local: Use the file system (much more stable for localhost)
      const filePath = path.join(process.cwd(), "public", src);
      buffer = await fs.readFile(filePath);
    }

    const { base64 } = await getPlaiceholder(buffer);
    return base64;
  } catch (e) {
    console.error("Blur generation failed for:", src, e);
    // Return a slightly nicer semi-transparent dark placeholder
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNksAcAAI0Ag9P6Eg0AAAAASUVORK5CYII=";
  }
}
