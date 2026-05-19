import { NextResponse } from "next/server";
import { getContent } from "@/lib/content";

export async function GET() {
  const content = await getContent();
  const cvUrl = content.cv?.filename;

  if (!cvUrl) {
    return new NextResponse(null, { status: 404 });
  }

  // Local dev uses a static public file — same-origin redirect works fine
  if (cvUrl.startsWith("/")) {
    return NextResponse.redirect(cvUrl);
  }

  // Production: proxy from Vercel Blob so the download attribute works cross-origin
  const blob = await fetch(cvUrl, { cache: "no-store" });
  if (!blob.ok) {
    return new NextResponse(null, { status: 404 });
  }

  const buffer = await blob.arrayBuffer();
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="cv.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
