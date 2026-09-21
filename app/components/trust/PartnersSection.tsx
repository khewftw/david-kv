import Link from "next/link";
import { partners, partnersCopy } from "@/app/lib/partners";

export function PartnersSection() {
  return (
    <section className="trust-section partners-section" aria-labelledby="partners-title">
      <div className="hero-container">
        <p className="trust-eyebrow">{partnersCopy.eyebrow}</p>
        <h2 id="partners-title" className="section-title">
          {partnersCopy.title.map((part, index) => (
            <span key={index} className={part.accent ? "text-accent" : undefined}>
              {part.text}
              {index === 0 ? <br /> : null}
            </span>
          ))}
        </h2>
        <p className="trust-subtitle">{partnersCopy.subtitle}</p>

        <ul className="partners-grid">
          {partners.map((item) => (
            <li key={item.id} className="partners-cell">
              <img src={item.src} alt={item.name} loading="lazy" />
            </li>
          ))}
        </ul>

        <p className="partners-note">{partnersCopy.note}</p>
        <Link href={partnersCopy.ctaHref} className="trust-cta">
          {partnersCopy.cta}
        </Link>
      </div>
    </section>
  );
}
