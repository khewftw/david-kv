"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function HeroBackground() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    let frame = 0;
    const update = () => {
      layer.style.transform = `translate3d(0, ${window.scrollY * 0.35}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        ref={layerRef}
        className="absolute inset-[-18%] will-change-transform"
      >
        <Image
          src="/hero/apartment.jpg"
          alt="Современный интерьер квартиры после ремонта"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,7,0.44)_0%,rgba(7,7,7,0.22)_45%,rgba(7,7,7,0.32)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[28%] bg-[linear-gradient(180deg,rgba(7,7,7,0)_0%,rgba(7,7,7,0.28)_100%)]"
        aria-hidden="true"
      />
    </div>
  );
}
