import { coupleInfo } from "@/data/content";
import { DecorativeLeaf } from "@/components/ui/DecorativeLeaf";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-[#5C202C] text-[#FBF7F1]"
    >
      <div className="container-e py-20 md:py-24 flex flex-col items-center text-center gap-0">

        {/* Brand */}
        <p className="font-serif tracking-[0.28em] text-[22px] md:text-[26px] text-white mb-5">
          THE ESSUMAN&apos;S
        </p>

        {/* Botanical accent */}
        <div className="text-[#B89558] mb-6 opacity-80" aria-hidden="true">
          <DecorativeLeaf width={20} height={20} />
        </div>

        {/* Couple + date */}
        <p className="text-eyebrow text-[#B89558] mb-1.5">
          {coupleInfo.groom} &amp; {coupleInfo.bride}
        </p>
        <p className="font-sans font-300 text-sm text-[#FBF7F1] opacity-70 tracking-[0.12em] mb-8">
          {coupleInfo.weddingDateFmt}
        </p>

        {/* Tagline */}
        <p className="font-serif italic text-lg md:text-xl text-[#B89558] mb-8 max-w-sm">
          &ldquo;{coupleInfo.tagline}&rdquo;
        </p>

        {/* Closing line */}
        <p className="font-sans font-300 text-xs text-[#FBF7F1] opacity-50 tracking-wide">
          {coupleInfo.closingLine}
        </p>
      </div>
    </footer>
  );
}
