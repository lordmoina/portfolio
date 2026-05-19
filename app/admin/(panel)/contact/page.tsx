export const dynamic = "force-dynamic";

import { getContent } from "@/lib/content";
import ContactForm from "@/components/admin/ContactForm";

export default async function ContactPage() {
  const content = await getContent();
  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <p className="font-['Share_Tech_Mono'] text-xs text-[#00c8ff]/60 tracking-widest mb-1">
          // ADMIN
        </p>
        <h1 className="text-2xl font-bold text-slate-100">Contact</h1>
        <p className="text-slate-500 text-sm mt-1">
          Edit the contact page heading and manage all social/contact links.
        </p>
      </div>
      <ContactForm initialContact={content.contact} />
    </div>
  );
}
