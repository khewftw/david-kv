"use client";

import Link from "next/link";
import { Logo } from "@/app/components/hero/Logo";
import { QuizIcon } from "@/app/components/quiz/QuizIcons";
import { finalCopy, footerCopy } from "@/app/lib/final";
import { site } from "@/app/lib/site";

export function SiteFooter() {
  function toTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__brand">
          <Logo className="site-footer__logo" />
          <p>{footerCopy.about}</p>
          <p className="site-footer__copy">{footerCopy.copyright}</p>
        </div>

        <div className="site-footer__menu">
          <h3>{footerCopy.menuTitle}</h3>
          <nav aria-label="Меню в подвале">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="site-footer__contacts-col">
          <h3>{footerCopy.contactsTitle}</h3>
          <div className="site-footer__contacts">
            <a href={site.phoneHref}>{finalCopy.phoneDisplay}</a>
            <a href={footerCopy.emailHref}>{footerCopy.email}</a>
            <p>{footerCopy.office}</p>
            <p>{footerCopy.region}</p>
          </div>
        </div>

        <div className="site-footer__social">
          <h3>{footerCopy.socialTitle}</h3>
          <p>{footerCopy.socialNote}</p>
          <div className="site-footer__social-row">
            <a href={footerCopy.telegramHref} target="_blank" rel="noreferrer" aria-label="Telegram">
              <QuizIcon name="telegram" />
            </a>
            <a href={footerCopy.whatsappHref} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <QuizIcon name="whatsapp" />
            </a>
            <a href={footerCopy.emailHref} aria-label="E-mail">
              <MailIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="site-footer__legal">
        <div className="site-footer__legal-links">
          {footerCopy.legal.map((item) => (
            <a key={item.id} id={item.id} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="site-footer__legal-meta">
          <span>{footerCopy.developer}</span>
          <button type="button" onClick={toTop}>
            {footerCopy.toTop}
          </button>
        </div>
      </div>
    </footer>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" aria-hidden="true">
      <rect x="6" y="9" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 11.2 16 17.2 25 11.2" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}
