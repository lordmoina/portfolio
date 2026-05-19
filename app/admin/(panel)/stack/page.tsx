export const dynamic = "force-dynamic";

import { getContent } from "@/lib/content";
import StackManager from "@/components/admin/StackManager";

export default function StackPage() {
  const content = getContent();
  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <p className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest mb-1">
          // ADMIN
        </p>
        <h1 className="text-2xl font-bold text-slate-100">Stack</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage the tool chips shown in the stack section.
        </p>
      </div>
      <StackManager initialStack={content.stack} />
    </div>
  );
}
