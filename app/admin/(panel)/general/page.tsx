export const dynamic = "force-dynamic";

import { getContent } from "@/lib/content";
import GeneralForm from "@/components/admin/GeneralForm";

export default function GeneralPage() {
  const content = getContent();
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <p className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest mb-1">
          // ADMIN
        </p>
        <h1 className="text-2xl font-bold text-slate-100">General Settings</h1>
        <p className="text-slate-500 text-sm mt-1">
          Edit all public text content.
        </p>
      </div>
      <GeneralForm initialContent={content} />
    </div>
  );
}
