export const dynamic = "force-dynamic";

import { getContent } from "@/lib/content";
import ContactClient from "@/components/ContactClient";

export default async function Contact() {
  const content = await getContent();
  return <ContactClient content={content} />;
}
