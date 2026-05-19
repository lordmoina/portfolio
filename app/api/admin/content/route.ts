import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import type { NavContent, HeroContent, AboutContent, FooterContent } from "@/types/content";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nav, hero, about, footer } = body as {
      nav: NavContent;
      hero: HeroContent;
      about: AboutContent;
      footer: FooterContent;
    };

    const content = await getContent();
    content.nav = nav;
    content.hero = hero;
    content.about = about;
    content.footer = footer;
    await saveContent(content);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("content save error:", err);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
