"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { certificates, certificatesCopy } from "@/app/lib/certificates";

export function CertificatesSection() {
  const [open, setOpen] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(dir: number) {
    const node = scrollerRef.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>(".certificate-card");
    const delta = card ? card.offsetWidth + 16 : 280;
    node.scrollBy({ left: dir * delta, behavior: "smooth" });
  }

  return (
    <section className="trust-section certificates-section" aria-labelledby="certificates-title">
      <div className="hero-container">
        <p className="trust-eyebrow">{certificatesCopy.eyebrow}</p>
        <div className="certificates-head">
          <h2 id="certificates-title" className="section-title certificates-title">
            {certificatesCopy.title.map((part, index) => (
              <span key={index} className={part.accent ? "text-accent" : undefined}>
                {part.text}
                {index === 0 ? <br /> : null}
              </span>
            ))}
          </h2>
          <p className="trust-subtitle">{certificatesCopy.subtitle}</p>
        </div>

        <div className="certificates-shell">
          <button
            type="button"
            className="trust-nav is-prev"
            onClick={() => scrollBy(-1)}
            aria-label="Предыдущий сертификат"
          >
            <NavChevron />
          </button>
          <div ref={scrollerRef} className="certificates-track">
            {certificates.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="certificate-card"
                onClick={() => setOpen(index)}
                aria-label={`${item.title}. Открыть документ`}
              >
                <span className="certificate-card__preview">
                  <img src={item.image} alt="" />
                </span>
                <span className="certificate-card__title">{item.title}</span>
                <span className="certificate-card__caption">{item.caption}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="trust-nav is-next"
            onClick={() => scrollBy(1)}
            aria-label="Следующий сертификат"
          >
            <NavChevron />
          </button>
        </div>
      </div>

      {open !== null ? (
        <CertificateLightbox index={open} onClose={() => setOpen(null)} onChange={setOpen} />
      ) : null}
    </section>
  );
}

function CertificateLightbox({
  index,
  onClose,
  onChange,
}: {
  index: number;
  onClose: () => void;
  onChange: (next: number) => void;
}) {
  const item = certificates[index];
  const [mounted, setMounted] = useState(false);

  const go = useCallback(
    (dir: number) => {
      onChange((index + dir + certificates.length) % certificates.length);
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
      aria-label={item.title}
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
        aria-label="Предыдущий документ"
      >
        <NavChevron />
      </button>
      <figure className="gallery-lightbox__figure certificate-lightbox__figure" onClick={(event) => event.stopPropagation()}>
        <img src={item.image} alt={item.title} />
        <figcaption>
          {item.title} · {item.caption}
        </figcaption>
      </figure>
      <button
        type="button"
        className="gallery-lightbox__nav is-next"
        onClick={(event) => {
          event.stopPropagation();
          go(1);
        }}
        aria-label="Следующий документ"
      >
        <NavChevron />
      </button>
    </div>,
    document.body,
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
