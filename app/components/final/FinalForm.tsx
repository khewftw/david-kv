"use client";

import { FormEvent, useState } from "react";
import { finalCopy } from "@/app/lib/final";

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

export function FinalForm() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

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

  if (submitted) {
    return (
      <div className="final-cta-form final-cta-form--success">
        <h3>{finalCopy.successTitle}</h3>
        <p>{finalCopy.successText}</p>
      </div>
    );
  }

  return (
    <form className="final-cta-form" onSubmit={onSubmit} noValidate>
      <p className="final-cta-form__lead">{finalCopy.formLead}</p>
      <a className="final-cta-form__phone" href={finalCopy.phoneHref}>
        {finalCopy.phoneDisplay}
      </a>

      <label>
        <span className="sr-only">{finalCopy.nameLabel}</span>
        <input
          type="text"
          autoComplete="name"
          placeholder={finalCopy.namePlaceholder}
          value={form.name}
          onChange={(event) => patch({ name: event.target.value })}
        />
      </label>
      <label>
        <span className="sr-only">{finalCopy.phoneFieldLabel}</span>
        <input
          type="tel"
          autoComplete="tel"
          placeholder={finalCopy.phonePlaceholder}
          value={form.phone}
          onChange={(event) => patch({ phone: event.target.value })}
        />
      </label>

      <label className="consent-row">
        <input
          type="checkbox"
          checked={form.policy}
          onChange={(event) => patch({ policy: event.target.checked })}
        />
        <span>
          Я ознакомлен(-а) с{" "}
          <a href="#policy">{finalCopy.policy}</a>
        </span>
      </label>
      <label className="consent-row">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(event) => patch({ consent: event.target.checked })}
        />
        <span>
          Я даю своё{" "}
          <a href="#consent">{finalCopy.consent}</a>
        </span>
      </label>

      {error ? <p className="final-cta-form__error">{error}</p> : null}

      <button type="submit" className="final-cta-form__submit">
        {finalCopy.submit}
      </button>
    </form>
  );
}
