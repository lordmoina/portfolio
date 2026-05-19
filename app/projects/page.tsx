export const dynamic = "force-dynamic";

import { getContent } from "@/lib/content";
import ProjectsClient from "@/components/ProjectsClient";

export default async function Projects() {
  const content = await getContent();
  return <ProjectsClient content={content} />;
}
