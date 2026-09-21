"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/app/lib/site";
import { HeroShell } from "./HeroShell";
import { Logo } from "./Logo";

type HeroHeaderProps = {
  menuOpen: boolean;
  onMenuToggle: () => void;
};

export function HeroHeader({ menuOpen, onMenuToggle }: HeroHeaderProps) {
  const onHero = useHeaderOnHero();

  return (
    <header
      className={`header-tone pointer-events-none fixed inset-x-0 top-0 z-50 ${
        onHero ? "bg-transparent" : "bg-white/20 backdrop-blur-[8px]"
      }`}
    >
      <HeroShell className="pointer-events-auto">
        <div
          className={`flex h-20 items-center justify-between border-b lg:hidden ${
            onHero ? "border-white/18" : "border-transparent"
          }`}
        >
          <Logo inverted={!onHero} />
          <button
            type="button"
            className={`flex h-11 w-11 items-center justify-center ${
              onHero ? "text-white" : "text-[#1A1714]"
            }`}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            onClick={onMenuToggle}
          >
            <BurgerIcon open={menuOpen} />
          </button>
        </div>

        <div className="hidden lg:block">
          <div
            className={`hero-grid items-center border-b py-4 ${
              onHero ? "border-white/18" : "border-transparent"
            }`}
          >
            <div className="col-span-4">
              <Logo inverted={!onHero} />
            </div>
            <nav
              className={`col-span-4 col-start-7 flex items-center justify-between font-ui text-sm font-normal leading-[1.2] ${
                onHero ? "text-white/78" : "text-[#1A1714]/75"
              }`}
              aria-label="Основная навигация"
            >
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors duration-250 ease-[ease] ${
                    onHero ? "hover:text-white" : "hover:text-[#1A1714]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="col-span-2 col-start-11 text-right">
              <a
                href={site.phoneHref}
                className={`font-ui text-sm font-normal leading-[1.2] transition-colors duration-250 ease-[ease] ${
                  onHero ? "text-white hover:text-white/80" : "text-[#1A1714] hover:text-[#1A1714]/80"
                }`}
              >
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </HeroShell>
    </header>
  );
}

function useHeaderOnHero() {
  const [onHero, setOnHero] = useState(true);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnHero(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-72px 0px 0px 0px",
      },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return onHero;
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-[22px]" aria-hidden="true">
      <span
        className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
      />
      <span
        className={`absolute top-1.5 left-0 h-px w-full bg-current transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}
      />
      <span
        className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
      />
    </span>
  );
}
