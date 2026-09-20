import Link from "next/link";
import { site } from "@/app/lib/site";

export function CasesLink({ className = "" }: { className?: string }) {
  return (
    <Link
      href={site.hero.casesHref}
      className={`inline-flex items-center gap-2.5 font-ui text-[15px] font-normal leading-[1.2] text-white underline decoration-white underline-offset-[5px] transition-opacity duration-250 hover:opacity-80 ${className}`}
    >
      <img
        src="/cases.svg"
        alt=""
        aria-hidden="true"
        className="h-4 w-auto shrink-0"
      />
      {site.hero.casesLabel}
    </Link>
  );
}

export function LocationLine({ className = "" }: { className?: string }) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 whitespace-nowrap font-ui text-[15px] leading-[1.3] text-white/90 ${className}`}
    >
      <img
        src="/moscow.svg"
        alt=""
        aria-hidden="true"
        className="h-4 w-auto shrink-0"
      />
      {site.hero.location}
    </p>
  );
}
