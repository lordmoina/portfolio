export const dynamic = "force-dynamic";

import { getContent } from "@/lib/content";
import AboutClient from "@/components/AboutClient";

export default function About() {
  const content = getContent();
  return <AboutClient content={content} />;
}
