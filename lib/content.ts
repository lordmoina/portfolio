import type { Content } from "@/types/content";

const KV_KEY = "portfolio:content";

function hasKv() {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function getContent(): Promise<Content> {
  if (hasKv()) {
    const { kv } = await import("@vercel/kv");
    const stored = await kv.get<Content>(KV_KEY);
    if (stored) return stored;
    // First deploy: seed KV from the bundled JSON
    const seed = (await import("@/data/content.json")).default as Content;
    await kv.set(KV_KEY, seed);
    return seed;
  }

  // Local dev: read from filesystem
  const fs = await import("fs");
  const path = await import("path");
  const raw = fs.readFileSync(path.join(process.cwd(), "data/content.json"), "utf-8");
  return JSON.parse(raw) as Content;
}

export async function saveContent(content: Content): Promise<void> {
  if (hasKv()) {
    const { kv } = await import("@vercel/kv");
    await kv.set(KV_KEY, content);
    return;
  }

  // Local dev: write to filesystem
  const fs = await import("fs");
  const path = await import("path");
  await fs.promises.writeFile(
    path.join(process.cwd(), "data/content.json"),
    JSON.stringify(content, null, 2),
    "utf-8"
  );
}
