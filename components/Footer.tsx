import type { FooterContent } from "@/types/content";

interface FooterProps {
  footer: FooterContent;
}

export default function Footer({ footer }: FooterProps) {
  return (
    <footer className="border-t border-[#1e2d3d] bg-[#080b12] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-['Share_Tech_Mono'] text-xs text-slate-500 tracking-wider">
          {footer.copyright}
        </p>
        <p className="font-['Share_Tech_Mono'] text-xs text-slate-600 tracking-wider">
          {footer.coordinates}
        </p>
      </div>
    </footer>
  );
}
