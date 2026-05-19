export const dynamic = "force-dynamic";

import { getContent } from "@/lib/content";
import CvManager from "@/components/admin/CvManager";

export default async function CvPage() {
  const content = await getContent();
  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <p className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest mb-1">
          // ADMIN
        </p>
        <h1 className="text-2xl font-bold text-slate-100">CV</h1>
        <p className="text-slate-500 text-sm mt-1">
          Upload your CV and control the download button visibility.
        </p>
      </div>
      <CvManager initialContent={content} />
    </div>
  );
}
