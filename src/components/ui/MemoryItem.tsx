import Image from "next/image";

interface MemoryItemProps {
  contributorName: string;
  relationship:    string | null;
  memory:          string;
  photo:           string | null;
  isLast:          boolean;
  onPhotoClick?:   () => void;
}

function Avatar({ name }: { name: string }) {
  const parts    = name.trim().split(" ");
  const initials =
    parts.length >= 2
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`
      : parts[0].slice(0, 2);
  return (
    <div
      aria-hidden="true"
      className="w-11 h-11 rounded-full bg-[#FBF7F1] flex items-center justify-center flex-shrink-0"
    >
      <span className="font-serif text-sm text-[#6B6560] font-500 uppercase">
        {initials.toUpperCase()}
      </span>
    </div>
  );
}

export default function MemoryItem({
  contributorName,
  relationship,
  memory,
  photo,
  isLast,
  onPhotoClick,
}: MemoryItemProps) {
  return (
    <article
      className={[
        "py-10 md:py-12",
        !isLast ? "border-b border-[#B89558]" : "",
      ].join(" ")}
    >
      {/* Contributor */}
      <header className="flex items-center gap-4 mb-6">
        <Avatar name={contributorName} />
        <div>
          <p className="font-sans font-500 text-[15px] text-[#1E1E1E] leading-tight">
            {contributorName}
          </p>
          <p className="font-sans font-300 text-xs text-[#9A948F] mt-0.5 tracking-wide">
            {relationship}
          </p>
        </div>
      </header>

      {/* Memory — champagne left border, constrained line length */}
      <blockquote className="border-l-2 border-[#B89558] pl-6">
        <p
          className="font-serif italic text-[#1E1E1E] leading-relaxed max-w-[60ch]"
          style={{ fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)" }}
        >
          {memory}
        </p>
      </blockquote>
      
      {photo && (
        <div 
          className={`mt-8 relative w-full max-w-[60ch] aspect-video overflow-hidden rounded-xl border border-[#B89558] ${onPhotoClick ? 'cursor-zoom-in hover:opacity-95 transition-opacity' : ''}`}
          onClick={onPhotoClick}
        >
          <Image
            src={photo}
            alt={`Memory shared by ${contributorName}`}
            fill
            sizes="(max-width: 768px) 100vw, 60ch"
            className="object-cover"
          />
        </div>
      )}
    </article>
  );
}
