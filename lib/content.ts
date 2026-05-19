import type { Content } from "@/types/content";

const CONTENT_BLOB = "content.json";

export async function getContent(): Promise<Content> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: CONTENT_BLOB });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, { cache: "no-store" });
      return res.json() as Promise<Content>;
    }
    // First deploy: seed blob from the bundled JSON
    const seed = (await import("@/data/content.json")).default as Content;
    await saveContent(seed);
    return seed;
  }

  // Local dev: read from filesystem
  const fs = await import("fs");
  const path = await import("path");
  const raw = fs.readFileSync(path.join(process.cwd(), "data/content.json"), "utf-8");
  return JSON.parse(raw) as Content;
}

export async function saveContent(content: Content): Promise<void> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    await put(CONTENT_BLOB, JSON.stringify(content, null, 2), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
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
