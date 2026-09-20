"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/app/lib/site";
import { CtaCircle } from "./CtaCircle";
import { HeroBackground } from "./HeroBackground";
import { HeroHeader } from "./HeroHeader";
import { CasesLink, LocationLine } from "./HeroMeta";
import { HeroShell } from "./HeroShell";
import { Logo } from "./Logo";

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <section
      data-hero
      className="relative h-svh min-h-[720px] overflow-x-hidden text-white max-lg:min-h-svh"
    >
      <HeroBackground />
      <div className="relative z-10 flex h-full min-h-[720px] flex-col max-lg:min-h-svh">
        <HeroHeader
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen((open) => !open)}
        />
        <div className="h-20 shrink-0 lg:h-[84px]" aria-hidden="true" />
        <HeroShell
          className="flex min-h-0 flex-1 flex-col"
          innerClassName="flex h-full min-h-0 flex-1 flex-col"
        >
          <DesktopHero />
          <MobileHero />
        </HeroShell>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </section>
  );
}

function DesktopHero() {
  const { hero } = site;

  return (
    <div className="relative hidden min-h-0 flex-1 lg:block">
      <div className="hero-grid mt-[clamp(180px,24vh,230px)]">
        <p className="hero-eyebrow hero-enter col-span-5 col-start-1 text-[21px] font-normal leading-none text-white/92">
          {hero.eyebrow}
        </p>
      </div>

      <div className="hero-grid mt-7 items-start">
        <h1
          className="hero-title hero-enter col-span-5 col-start-1 text-[clamp(58px,4.7vw,72px)] font-medium tracking-[-0.02em] uppercase leading-[0.92] delay-100"
          aria-label="Ремонт квартир под ключ в Москве"
        >
          <span className="block whitespace-nowrap">{hero.titleLine1}</span>
          <span className="block whitespace-nowrap">{hero.titleLine2}</span>
          <span className="block whitespace-nowrap">
            {hero.titleLine3}{" "}
            <em className="not-italic text-accent">{hero.titleAccent}</em>
          </span>
        </h1>

        <div className="col-span-4 col-start-7">
          <p className="hero-support hero-enter max-w-[390px] text-[34px] font-medium leading-[1.02] delay-150">
            {hero.headline.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </p>
          <p className="hero-enter mt-6 max-w-[390px] font-ui text-[15px] font-normal leading-[1.4] text-white/82 delay-200">
            {hero.description}
          </p>
        </div>

        <div className="col-span-2 col-start-11 flex justify-end self-center">
          <CtaCircle className="hero-enter delay-[400ms]" />
        </div>
      </div>

      <div className="hero-grid absolute inset-x-0 bottom-12 items-center">
        <div className="col-span-4 col-start-1">
          <LocationLine className="hero-enter delay-300" />
        </div>
        <div className="col-span-4 col-start-7">
          <CasesLink className="hero-enter delay-300" />
        </div>
      </div>
    </div>
  );
}

function MobileHero() {
  const { hero } = site;

  return (
    <div className="flex flex-1 flex-col pb-6 lg:hidden">
      <div className="min-h-[12vh] flex-1" aria-hidden="true" />
      <p className="hero-eyebrow hero-enter text-[18px] font-normal leading-none text-white/92">
        {hero.eyebrow}
      </p>
      <h1
        className="hero-title hero-enter mt-4 text-[clamp(36px,9.5vw,44px)] font-medium tracking-[-0.02em] uppercase leading-[0.92] delay-100"
        aria-label="Ремонт квартир под ключ в Москве"
      >
        <span className="block whitespace-nowrap">{hero.titleLine1}</span>
        <span className="block whitespace-nowrap">{hero.titleLine2}</span>
        <span className="block whitespace-nowrap">
          {hero.titleLine3}{" "}
          <em className="not-italic text-accent">{hero.titleAccent}</em>
        </span>
      </h1>
      <p className="hero-support hero-enter mt-5 max-w-[20rem] text-[26px] font-medium leading-[1.02] delay-150">
        {hero.headline.map((line, index) => (
          <span key={line}>
            {index > 0 ? <br /> : null}
            {line}
          </span>
        ))}
      </p>
      <p className="hero-enter mt-4 max-w-[22rem] font-ui text-sm font-normal leading-[1.4] text-white/82 delay-200">
        {hero.description}
      </p>
      <CasesLink className="hero-enter mt-8 self-start delay-300" />
      <CtaCircle className="hero-enter mt-8 self-end delay-[400ms]" />
      <LocationLine className="hero-enter mt-6 self-start delay-300" />
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div className="absolute inset-0 bg-[rgba(18,14,10,0.78)] backdrop-blur-md" />
      <div className="relative flex h-full flex-col">
        <HeroShell>
          <div className="flex h-20 items-center justify-between border-b border-white/18">
            <Logo />
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center text-white"
              aria-label="Закрыть меню"
              onClick={onClose}
            >
              <span className="relative block h-3.5 w-[22px]" aria-hidden="true">
                <span className="absolute top-1.5 left-0 h-px w-full rotate-45 bg-white" />
                <span className="absolute top-1.5 left-0 h-px w-full -rotate-45 bg-white" />
              </span>
            </button>
          </div>
        </HeroShell>
        <HeroShell
          className="flex min-h-0 flex-1 flex-col"
          innerClassName="flex h-full min-h-0 flex-1 flex-col"
        >
          <nav className="flex flex-col gap-7 pt-12" aria-label="Мобильная навигация">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="font-heading text-[22px] font-normal leading-[1.1] text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={site.phoneHref}
            className="mt-auto pb-10 font-ui text-sm text-white/86"
          >
            {site.phone}
          </a>
        </HeroShell>
      </div>
    </div>
  );
}
