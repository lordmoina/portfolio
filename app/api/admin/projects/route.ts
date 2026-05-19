import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import type { Project } from "@/types/content";

export async function POST(request: Request) {
  try {
    const { projects } = (await request.json()) as { projects: Project[] };
    const content = await getContent();
    content.projects = projects;
    await saveContent(content);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("projects save error:", err);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
