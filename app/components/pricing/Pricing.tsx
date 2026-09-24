"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import { BeforeAfterSlider } from "@/app/components/pricing/BeforeAfterSlider";
import { site } from "@/app/lib/site";

export function Pricing() {
  const { pricing } = site;
  const gridRef = useRef<HTMLDivElement>(null);
  const visible = useInView(gridRef);

  return (
    <section
      id="services"
      className="pricing-section scroll-mt-24 bg-[var(--surface)] py-[72px] text-[var(--text)] md:py-24 lg:py-[120px]"
    >
      <div className="hero-container">
        <div className="mx-auto max-w-[1100px] text-center">
          <p className="mb-2.5 font-ui text-base font-medium tracking-[0.02em] text-[#1F1A17]/25">
            {pricing.eyebrow}
          </p>
          <h2 className="section-title mx-auto max-w-[920px]">
            {pricing.title.map((part, index) =>
              part.accent ? (
                <span key={index} className="text-accent">
                  {part.text}
                </span>
              ) : (
                <span key={index}>{part.text}</span>
              ),
            )}
          </h2>
          <p className="mx-auto mt-6 max-w-[760px] font-ui text-[16px] font-normal leading-[1.5] text-[rgba(31,26,23,0.72)] md:text-[18px] lg:text-[20px]">
            {pricing.subtitle.map((part, index) =>
              part.accent ? (
                <span key={index} className="text-accent">
                  {part.text}
                </span>
              ) : (
                <span key={index}>{part.text}</span>
              ),
            )}
          </p>
          <p className="mx-auto mt-4 max-w-[680px] font-ui text-[15px] leading-[1.5] text-[rgba(31,26,23,0.45)] md:text-base">
            {pricing.note}
          </p>
        </div>

        <div
          ref={gridRef}
          className={`pricing-grid is-ready ${visible ? "is-visible" : ""}`}
        >
          {pricing.items.map((item) => (
            <article
              key={item.name}
              className={`pricing-card ${item.accent ? "is-accent" : ""}`}
            >
              <div className="pricing-card__image">
                <BeforeAfterSlider
                  before={item.beforeImage}
                  after={item.afterImage}
                  beforeLabel="До"
                  afterLabel="После"
                  alt={item.image.alt}
                  playHint={visible}
                />
              </div>
              <div className="pricing-card__body">
                <div>
                  <h3 className="pricing-card__title">{item.name}</h3>
                  <p className="pricing-card__price">{item.price}</p>
                  <p className="pricing-card__text">{item.description}</p>
                  <ul className="pricing-card__list">
                    {item.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="pricing-card__bottom">
                  <div className="pricing-card__meta">
                    <span>{item.term}</span>
                    <span>{item.materials}</span>
                  </div>
                  <Link href={pricing.ctaHref} className="pricing-card__cta">
                    <span className="case-block__icon case-block__icon--calc" aria-hidden />
                    {pricing.cta}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="pricing-footer">
          <p>{pricing.footer}</p>
          <Link href={pricing.ctaHref} className="pricing-footer__cta">
            {pricing.footerCta}
          </Link>
        </div>
      </div>
    </section>
  );
}

function useInView(ref: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return visible;
}
