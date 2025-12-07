import { NextResponse } from "next/server";
import { createReadStream, statSync, existsSync } from "fs";
import { Readable } from "stream";

export async function GET() {
  try {
    const filePath = `${process.cwd()}/16468923-hd_1920_1080_60fps.mp4`;
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const stat = statSync(filePath);
    const nodeStream = createReadStream(filePath);
    const webStream = Readable.toWeb(nodeStream);

    return new NextResponse(webStream as any, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Length": stat.size.toString(),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to load video" }, { status: 500 });
  }
}

