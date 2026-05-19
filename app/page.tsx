export const dynamic = "force-dynamic";

import { getContent } from "@/lib/content";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const content = await getContent();
  return <HomeClient content={content} />;
}
