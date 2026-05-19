export const dynamic = "force-dynamic";

import { getContent } from "@/lib/content";
import ProjectsManager from "@/components/admin/ProjectsManager";

export default async function ProjectsPage() {
  const content = await getContent();
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <p className="font-['Share_Tech_Mono'] text-xs text-[#ff2d6b]/60 tracking-widest mb-1">
          // ADMIN
        </p>
        <h1 className="text-2xl font-bold text-slate-100">Projects</h1>
        <p className="text-slate-500 text-sm mt-1">
          Add, edit, and reorder portfolio projects.
        </p>
      </div>
      <ProjectsManager initialProjects={content.projects} />
    </div>
  );
}
