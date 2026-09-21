"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  galleryCopy,
  galleryItems,
  type GalleryItem,
} from "@/app/lib/gallery";

const LOOP = [...galleryItems, ...galleryItems];

export function ProjectGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);
  const openRef = useRef(open);
  const hoveringRef = useRef(hovering);
  openRef.current = open;
  hoveringRef.current = hovering;

  const syncPlayback = useCallback((animation: Animation) => {
    if (openRef.current !== null) {
      animation.pause();
      return;
    }
    animation.play();
    const rate = hoveringRef.current ? 0.25 : 1;
    if (typeof animation.updatePlaybackRate === "function") {
      animation.updatePlaybackRate(rate);
    } else {
      animation.playbackRate = rate;
    }
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animation: Animation | null = null;
    let started = false;

    const start = () => {
      if (started || track.scrollWidth < 200) return;
      started = true;
      const duration =
        (window.matchMedia("(max-width: 767px)").matches ? 80 : 55) * 1000;
      animation = track.animate(
        [
          { transform: "translate3d(0,0,0)" },
          { transform: "translate3d(-50%,0,0)" },
        ],
        { duration, iterations: Infinity, easing: "linear" },
      );
      animRef.current = animation;
      syncPlayback(animation);
    };

    start();
    const observer = new ResizeObserver(start);
    observer.observe(track);

    return () => {
      observer.disconnect();
      animation?.cancel();
      animRef.current = null;
    };
  }, [syncPlayback]);

  useEffect(() => {
    const animation = animRef.current;
    if (!animation) return;
    syncPlayback(animation);
  }, [open, hovering, syncPlayback]);

  return (
    <section className="gallery-section" aria-labelledby="gallery-title">
      <div className="gallery-intro hero-container">
        <p className="gallery-eyebrow">{galleryCopy.eyebrow}</p>
        <div className="gallery-intro__row">
          <h2 id="gallery-title" className="gallery-title">
            {galleryCopy.title.map((part, index) => (
              <span key={index} className={part.accent ? "text-accent" : undefined}>
                {part.text}
                {index === 0 ? <br /> : null}
              </span>
            ))}
          </h2>
          <Link href={galleryCopy.allProjectsHref} className="gallery-all">
            {galleryCopy.allProjects}
            <NavChevron />
          </Link>
        </div>
        <p className="gallery-subtitle">{galleryCopy.subtitle}</p>
      </div>

      <div
        className={`gallery-viewport${hovering ? " is-hover" : ""}`}
        onMouseEnter={() => {
          if (window.matchMedia("(hover: hover)").matches) setHovering(true);
        }}
        onMouseLeave={() => setHovering(false)}
      >
        <div ref={trackRef} className="gallery-track">
          {LOOP.map((item, index) => (
            <button
              key={`${item.id}-${index}`}
              type="button"
              className="gallery-card relative"
              onClick={() => setOpen(index % galleryItems.length)}
              aria-label={`${item.project}, ${item.size}. Открыть фото`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 767px) 70vw, 375px"
                quality={90}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {open !== null ? (
        <Lightbox
          index={open}
          onClose={() => setOpen(null)}
          onChange={setOpen}
        />
      ) : null}
    </section>
  );
}

function Lightbox({
  index,
  onClose,
  onChange,
}: {
  index: number;
  onClose: () => void;
  onChange: (next: number) => void;
}) {
  const item = galleryItems[index];
  const startX = useRef(0);
  const [mounted, setMounted] = useState(false);

  const go = useCallback(
    (dir: number) => {
      onChange((index + dir + galleryItems.length) % galleryItems.length);
    },
    [index, onChange],
  );

  useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      onClick={onClose}
    >
      <button type="button" className="gallery-lightbox__close" onClick={onClose} aria-label="Закрыть">
        ×
      </button>
      <button
        type="button"
        className="gallery-lightbox__nav is-prev"
        onClick={(event) => {
          event.stopPropagation();
          go(-1);
        }}
        aria-label="Предыдущее фото"
      >
        <NavChevron />
      </button>
      <figure
        className="gallery-lightbox__figure"
        onClick={(event) => event.stopPropagation()}
        onTouchStart={(event) => {
          startX.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          const delta = event.changedTouches[0].clientX - startX.current;
          if (delta > 50) go(-1);
          if (delta < -50) go(1);
        }}
      >
        <div className="gallery-lightbox__image relative">
          <LightboxImage item={item} />
        </div>
        <figcaption>
          {item.project} · {item.size}
        </figcaption>
      </figure>
      <button
        type="button"
        className="gallery-lightbox__nav is-next"
        onClick={(event) => {
          event.stopPropagation();
          go(1);
        }}
        aria-label="Следующее фото"
      >
        <NavChevron />
      </button>
    </div>,
    document.body,
  );
}

function LightboxImage({ item }: { item: GalleryItem }) {
  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      sizes="90vw"
      quality={90}
      className="object-contain"
      priority
    />
  );
}

function NavChevron() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4">
      <path
        d="M10 3.5 5.5 8 10 12.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
