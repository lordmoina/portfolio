import { NextResponse } from "next/server";
import { saveContent } from "@/lib/content";
import type { Content } from "@/types/content";

/**
 * POST /api/admin/reset-content
 *
 * Force-overwrites the Vercel Blob with the seed data bundled in
 * data/content.json. Use this once after a content schema migration
 * (e.g. adding a new required field) to sync the blob with the repo.
 */
export async function POST() {
  try {
    const seed = (await import("@/data/content.json")).default as Content;
    await saveContent(seed);
    return NextResponse.json({
      success: true,
      projectsCount: seed.projects.length,
      message: "Blob reset to bundled content.json",
    });
  } catch (err) {
    console.error("reset-content error:", err);
    return NextResponse.json({ error: "Reset failed" }, { status: 500 });
  }
}
