import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import type { StackItem } from "@/types/content";

export async function POST(request: Request) {
  try {
    const { stack } = (await request.json()) as { stack: StackItem[] };
    const content = getContent();
    content.stack = stack;
    await saveContent(content);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("stack save error:", err);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
