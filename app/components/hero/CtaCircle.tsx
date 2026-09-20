import Link from "next/link";
import { site } from "@/app/lib/site";

export function CtaCircle({ className = "" }: { className?: string }) {
  return (
    <Link
      href={site.hero.ctaHref}
      className={`hero-cta flex size-[148px] shrink-0 flex-col items-center justify-center gap-1 rounded-full border-0 bg-[rgba(77,68,40,0.28)] text-center font-ui text-[15px] font-medium leading-[1.22] text-white shadow-none outline-none backdrop-blur-[18px] transition-[background-color,transform] duration-250 ease-out hover:scale-[1.025] hover:bg-[rgba(77,68,40,0.42)] focus-visible:bg-[rgba(77,68,40,0.42)] lg:size-48 lg:gap-1.5 lg:text-[17px] ${className}`}
    >
      <img
        src="/calc.svg"
        alt=""
        aria-hidden="true"
        className="h-7 w-auto lg:h-8"
      />
      <span>
        {site.hero.cta[0]}
        <br />
        {site.hero.cta[1]}
      </span>
    </Link>
  );
}
