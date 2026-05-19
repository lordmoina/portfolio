export const dynamic = "force-dynamic";

import { getContent } from "@/lib/content";
import ContactClient from "@/components/ContactClient";

export default function Contact() {
  const content = getContent();
  return <ContactClient content={content} />;
}
