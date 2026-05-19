export const dynamic = "force-dynamic";

import { getContent } from "@/lib/content";
import ProjectsClient from "@/components/ProjectsClient";

export default function Projects() {
  const content = getContent();
  return <ProjectsClient content={content} />;
}
