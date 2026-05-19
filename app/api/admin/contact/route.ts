import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import type { ContactContent } from "@/types/content";

export async function POST(request: Request) {
  try {
    const { contact } = (await request.json()) as { contact: ContactContent };
    const content = getContent();
    content.contact = contact;
    await saveContent(content);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("contact save error:", err);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
