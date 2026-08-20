import { coupleInfo } from "@/data/content";
import { DecorativeLeaf } from "@/components/ui/DecorativeLeaf";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-[#1E1E1E] text-[#EDE7DC]"
    >
      <div className="container-e py-20 md:py-24 flex flex-col items-center text-center gap-0">

        {/* Brand */}
        <p className="font-serif tracking-[0.28em] text-[22px] md:text-[26px] text-white mb-5">
          THE ESSUMAN&apos;S
        </p>

        {/* Botanical accent */}
        <div className="text-[#C9A96E] mb-6 opacity-80" aria-hidden="true">
          <DecorativeLeaf width={20} height={20} />
        </div>

        {/* Couple + date */}
        <p className="text-eyebrow text-[#9A948F] mb-1.5">
          {coupleInfo.groom} &amp; {coupleInfo.bride}
        </p>
        <p className="font-sans font-300 text-sm text-[#6B6560] tracking-[0.12em] mb-8">
          {coupleInfo.weddingDateFmt}
        </p>

        {/* Tagline */}
        <p className="font-serif italic text-lg md:text-xl text-[#C9A96E] mb-8 max-w-sm">
          &ldquo;{coupleInfo.tagline}&rdquo;
        </p>

        {/* Closing line */}
        <p className="font-sans font-300 text-xs text-[#4A4540] tracking-wide">
          {coupleInfo.closingLine}
        </p>
      </div>
    </footer>
  );
}
