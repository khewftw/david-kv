"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/app/lib/site";

type CaseItem = (typeof site.cases.items)[number];

export function Cases() {
  const { cases } = site;
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState<boolean[]>(() =>
    cases.items.map((_, index) => index === 0),
  );

  useEffect(() => {
    const nodes = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const appear = new IntersectionObserver(
      (entries) => {
        setVisible((current) => {
          const next = [...current];
          for (const entry of entries) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (entry.isIntersecting) next[index] = true;
          }
          return next;
        });
      },
      { threshold: 0.28 },
    );

    const activeObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visibleEntries[0]) return;
        setActive(Number(visibleEntries[0].target.getAttribute("data-index")));
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: "-20% 0px -35% 0px" },
    );

    for (const node of nodes) {
      appear.observe(node);
      activeObserver.observe(node);
    }

    return () => {
      appear.disconnect();
      activeObserver.disconnect();
    };
  }, [cases.items.length]);

  const indexLabel = String(active + 1).padStart(2, "0");
  const totalLabel = String(cases.items.length).padStart(2, "0");

  return (
    <section
      id="projects"
      className="cases-scroll-section scroll-mt-0 bg-[var(--surface)] text-[var(--text)]"
    >
      <div className="hero-container">
        <div className="cases-layout">
          <div className="cases-left">
            <div className="cases-left-inner">
              <div>
                <div className="mb-6 flex items-baseline justify-between gap-4 md:max-w-[600px]">
                  <p className="font-ui text-base leading-[1.2] font-medium text-[rgba(31,26,23,0.32)]">
                    {cases.eyebrow}
                  </p>
                  <p className="hidden font-ui text-xs tracking-[0.04em] text-[rgba(31,26,23,0.35)] lg:block">
                    {indexLabel} / {totalLabel}
                  </p>
                </div>
                <h2 className="section-title max-w-[600px]">
                  <span className="block">{cases.title[0].text}</span>
                  <span className="text-accent">{cases.title[1].text}</span>
                </h2>
              </div>
              <p className="max-w-[520px] font-ui text-[17px] leading-[1.5] text-[rgba(31,26,23,0.78)] md:text-[18px]">
                {cases.description.map((part, index) =>
                  part.accent ? (
                    <span key={index} className="text-accent">
                      {part.text}
                    </span>
                  ) : (
                    <span key={index}>{part.text}</span>
                  ),
                )}
              </p>
            </div>
          </div>

          <div className="cases-right">
            {cases.items.map((item, index) => (
              <CaseCard
                key={item.name}
                item={item}
                index={index}
                visible={visible[index]}
                cta={cases.cardCta}
                href={cases.ctaHref}
                cardRef={(node) => {
                  cardRefs.current[index] = node;
                }}
              />
            ))}
          </div>
        </div>

        <Link
          href={cases.ctaHref}
          className="mt-7 hidden min-h-[56px] w-full items-center justify-center rounded-[18px] bg-accent font-ui text-sm font-semibold text-white transition-opacity duration-250 hover:opacity-90 md:hidden"
        >
          {cases.moreCta}
        </Link>
      </div>
    </section>
  );
}

function CaseCard({
  item,
  index,
  visible,
  cta,
  href,
  cardRef,
}: {
  item: CaseItem;
  index: number;
  visible: boolean;
  cta: string;
  href: string;
  cardRef: (node: HTMLElement | null) => void;
}) {
  return (
    <article
      ref={cardRef}
      data-index={index}
      className={`case-block ${item.accent ? "is-accent" : "is-neutral"} ${visible ? "is-visible" : ""}`}
    >
      <CaseGallery images={item.images} />
      <div className="case-block__content">
        <div className="case-block__top">
          <div className="case-block__object-badge">
            <span className="case-block__icon case-block__icon--cases" aria-hidden="true" />
            {item.name}
          </div>
          <h3 className="case-block__headline">
            {item.headline} — {item.area} за {item.term}
          </h3>
        </div>
        <p className="case-block__description">{item.description}</p>
        <Link href={href} className="case-block__cta">
          <span className="case-block__icon case-block__icon--calc" aria-hidden="true" />
          {cta}
        </Link>
      </div>
    </article>
  );
}

function CaseGallery({
  images,
}: {
  images: CaseItem["images"];
}) {
  const [current, setCurrent] = useState(0);
  const total = images.length;
  const extra = Math.max(0, total - 3);
  const thumbs = images.slice(0, 3);
  const photo = images[current];

  const goTo = (index: number) => {
    setCurrent((index + total) % total);
  };

  return (
    <div className="case-gallery">
      <div className="case-block__image">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          quality={90}
          sizes="(max-width: 767px) 90vw, 50vw"
          className="object-cover"
        />
        {total > 1 ? (
          <>
            <button
              type="button"
              className="case-gallery__nav is-prev"
              aria-label="Предыдущее фото"
              onClick={(event) => {
                event.stopPropagation();
                goTo(current - 1);
              }}
            >
              <NavChevron />
            </button>
            <button
              type="button"
              className="case-gallery__nav is-next"
              aria-label="Следующее фото"
              onClick={(event) => {
                event.stopPropagation();
                goTo(current + 1);
              }}
            >
              <NavChevron />
            </button>
          </>
        ) : null}
      </div>
      <div className="case-gallery__thumbs">
        {thumbs.map((image, thumbIndex) => {
          const isLast = thumbIndex === thumbs.length - 1 && extra > 0;
          return (
            <button
              key={`${image.src}-${thumbIndex}`}
              type="button"
              className={`case-gallery__thumb ${current === thumbIndex ? "is-active" : ""}`}
              aria-label={
                isLast
                  ? `Ещё ${extra} фотографий`
                  : `Показать фото ${thumbIndex + 1}`
              }
              onClick={(event) => {
                event.stopPropagation();
                goTo(isLast ? 3 : thumbIndex);
              }}
            >
              <Image
                src={image.src}
                alt=""
                fill
                quality={75}
                sizes="160px"
                className="object-cover"
              />
              {isLast ? (
                <span className="case-gallery__more">+{extra}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
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
