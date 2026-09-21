"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { QuizIcon } from "@/app/components/quiz/QuizIcons";
import { designCtaCopy, designOfferNote } from "@/app/lib/designCta";

type FormState = {
  name: string;
  phone: string;
  policy: boolean;
  consent: boolean;
};

const emptyForm: FormState = {
  name: "",
  phone: "",
  policy: false,
  consent: false,
};

export function DesignCta() {
  const rootRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.24 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function patch(partial: Partial<FormState>) {
    setForm((current) => ({ ...current, ...partial }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Укажите имя и телефон.");
      return;
    }
    if (!form.policy || !form.consent) {
      setError("Подтвердите согласие на обработку персональных данных.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <section
      ref={rootRef}
      className={`design-cta-section${visible ? " is-visible" : ""}`}
      aria-labelledby="design-cta-title"
    >
      <div className="hero-container">
        <div className="design-cta">
          <div className="design-cta__copy">
            <p className="design-cta__eyebrow">{designCtaCopy.eyebrow}</p>
            <h2 id="design-cta-title" className="design-cta__title">
              {designCtaCopy.title[0]}
              <br />
              {designCtaCopy.title[1]}
            </h2>
            <p className="design-cta__subtitle">{designCtaCopy.subtitle}</p>
            {designOfferNote ? (
              <p className="design-cta__note">{designOfferNote}</p>
            ) : null}
            <ul className="design-cta__benefits">
              {designCtaCopy.benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="design-cta__phone">
              <p>{designCtaCopy.phoneLabel}</p>
              <a href={designCtaCopy.phoneHref}>
                <span className="design-cta__phone-icon">
                  <QuizIcon name="phone" />
                </span>
                {designCtaCopy.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="design-cta__form-wrap">
            {submitted ? (
              <div className="design-cta__success">
                <h3>{designCtaCopy.successTitle}</h3>
                <p>{designCtaCopy.successText}</p>
              </div>
            ) : (
              <form className="design-cta__form" onSubmit={onSubmit} noValidate>
                <h3>{designCtaCopy.formTitle}</h3>
                <p>{designCtaCopy.formLead}</p>
                <label>
                  <span>{designCtaCopy.nameLabel}</span>
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder={designCtaCopy.namePlaceholder}
                    value={form.name}
                    onChange={(event) => patch({ name: event.target.value })}
                  />
                </label>
                <label>
                  <span>{designCtaCopy.phoneFieldLabel}</span>
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder={designCtaCopy.phonePlaceholder}
                    value={form.phone}
                    onChange={(event) => patch({ phone: event.target.value })}
                  />
                </label>
                <label className="design-cta__check">
                  <input
                    type="checkbox"
                    checked={form.policy}
                    onChange={(event) => patch({ policy: event.target.checked })}
                  />
                  <span>
                    Я ознакомлен(-а) с{" "}
                    <a href="#policy">политикой обработки персональных данных</a>
                  </span>
                </label>
                <label className="design-cta__check">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(event) => patch({ consent: event.target.checked })}
                  />
                  <span>{designCtaCopy.consent}</span>
                </label>
                {error ? <p className="design-cta__error">{error}</p> : null}
                <button type="submit" className="design-cta__submit">
                  <span className="case-block__icon case-block__icon--cases" aria-hidden />
                  {designCtaCopy.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
