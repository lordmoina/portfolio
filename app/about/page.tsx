export const dynamic = "force-dynamic";

import { getContent } from "@/lib/content";
import AboutClient from "@/components/AboutClient";

export default async function About() {
  const content = await getContent();
  return <AboutClient content={content} />;
}
