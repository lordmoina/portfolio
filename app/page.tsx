export const dynamic = "force-dynamic";

import { getContent } from "@/lib/content";
import HomeClient from "@/components/HomeClient";

export default function Home() {
  const content = getContent();
  return <HomeClient content={content} />;
}
