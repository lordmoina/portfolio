import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("cv") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are accepted" }, { status: 400 });
    }

    let cvUrl = "/cv/cv.pdf";

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import("@vercel/blob");
      const blob = await put("cv.pdf", file, { access: "public", addRandomSuffix: false });
      cvUrl = blob.url;
    } else {
      // Local dev: write to filesystem
      const fs = await import("fs");
      const path = await import("path");
      const buffer = Buffer.from(await file.arrayBuffer());
      const cvDir = path.join(process.cwd(), "public", "cv");
      fs.mkdirSync(cvDir, { recursive: true });
      fs.writeFileSync(path.join(cvDir, "cv.pdf"), buffer);
    }

    const uploadedAt = new Date().toISOString();
    const content = await getContent();
    content.cv = { filename: cvUrl, uploadedAt };
    await saveContent(content);

    return NextResponse.json({ success: true, filename: cvUrl, uploadedAt });
  } catch (err) {
    console.error("cv upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
