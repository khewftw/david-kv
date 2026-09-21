"use client";

import { FinalForm } from "@/app/components/final/FinalForm";
import { SiteFooter } from "@/app/components/final/SiteFooter";
import { finalCopy } from "@/app/lib/final";

export function FinalSection() {
  return (
    <section className="final-section" aria-labelledby="final-title">
      <div className="final-inner">
        <div className="final-cta-grid">
          <div className="final-cta-left">
            <div className="final-cta-left__top">
              <p className="final-cta__eyebrow">{finalCopy.eyebrow}</p>
              <h2 id="final-title" className="final-cta__title">
                {finalCopy.title.map((part, index) => (
                  <span key={part.text} className={part.accent ? "text-accent" : undefined}>
                    {part.text}
                    {index === 0 ? <br /> : null}
                  </span>
                ))}
              </h2>
            </div>
            <div className="final-cta-left__bottom">
              <p className="final-cta__subtitle">{finalCopy.subtitle}</p>
              <p className="final-cta__note">{finalCopy.subtitleNote}</p>
            </div>
          </div>

          <FinalForm />
        </div>

        <div className="final-divider" />

        <SiteFooter />
      </div>
    </section>
  );
}
