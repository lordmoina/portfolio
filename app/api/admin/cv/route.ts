import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
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

    const buffer = Buffer.from(await file.arrayBuffer());
    const cvDir = path.join(process.cwd(), "public", "cv");

    // Ensure directory exists
    fs.mkdirSync(cvDir, { recursive: true });
    fs.writeFileSync(path.join(cvDir, "cv.pdf"), buffer);

    const uploadedAt = new Date().toISOString();
    const content = getContent();
    content.cv = { filename: "cv.pdf", uploadedAt };
    await saveContent(content);

    return NextResponse.json({ success: true, filename: "cv.pdf", uploadedAt });
  } catch (err) {
    console.error("cv upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
