interface WishCardProps {
  guestName:    string;
  message:      string;
  relationship: string | null;
  avatar:       string | null;
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
      className="w-10 h-10 rounded-full bg-[#EDE7DC] flex items-center justify-center flex-shrink-0"
    >
      <span className="font-serif text-xs text-[#6B6560] uppercase font-500">
        {initials.toUpperCase()}
      </span>
    </div>
  );
}

export default function WishCard({ guestName, message, relationship, avatar }: WishCardProps) {
  return (
    <article className="flex flex-col p-8 bg-[#FFFEF9] hover:bg-[#FAF8F5] transition-colors duration-500 border border-[#DDD8D0] h-full cursor-default">
      {/* Open quote */}
      <span
        className="font-serif leading-none text-[#E8D5B0] mb-2 select-none"
        style={{ fontSize: "3.5rem" }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Quote text */}
      <blockquote className="font-serif italic text-[#1E1E1E] leading-relaxed flex-1 -mt-3 mb-6"
        style={{ fontSize: "clamp(1rem, 1.3vw, 1.125rem)" }}
      >
        {message}
      </blockquote>

      {/* Attribution */}
      <footer className="flex items-center gap-3 pt-5 border-t border-[#EDE7DC]">
        <Avatar name={guestName} />
        <div>
          <p className="font-sans font-500 text-sm text-[#1E1E1E] leading-tight">
            {guestName}
          </p>
          <p className="font-sans text-xs text-[#9A948F] mt-0.5">
            {relationship}
          </p>
        </div>
      </footer>
    </article>
  );
}
