import fs from "fs";
import path from "path";
import type { Content } from "@/types/content";

const CONTENT_PATH = path.join(process.cwd(), "data/content.json");

export function getContent(): Content {
  const raw = fs.readFileSync(CONTENT_PATH, "utf-8");
  return JSON.parse(raw) as Content;
}

export async function saveContent(content: Content): Promise<void> {
  const json = JSON.stringify(content, null, 2);
  await fs.promises.writeFile(CONTENT_PATH, json, "utf-8");
}
