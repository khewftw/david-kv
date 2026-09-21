"use client";

import Image from "next/image";
import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  AREA_DEFAULT,
  AREA_MAX,
  AREA_MIN,
  AREA_STEP,
  areaPresetId,
  areaPresets,
  formatArea,
  quizCopy,
  quizSteps,
  type QuizOption,
  type QuizStep,
} from "@/app/lib/quiz";
import { QuizIcon } from "./QuizIcons";

type FormDataState = {
  name: string;
  phone: string;
  messenger: string;
  comment: string;
  policy: boolean;
  consent: boolean;
};

const emptyForm: FormDataState = {
  name: "",
  phone: "",
  messenger: "",
  comment: "",
  policy: false,
  consent: false,
};

const AUTO_NEXT_MS = 220;

export function RepairQuizSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedGift, setSelectedGift] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [formData, setFormData] = useState<FormDataState>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [animKey, setAnimKey] = useState(0);
  const [areaDraft, setAreaDraft] = useState(AREA_DEFAULT);

  const stepIndexRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  const step = quizSteps[currentStep];
  const total = quizSteps.length;
  const selectedId = answers[step.id];
  const needsMessenger = contactMethod === "telegram" || contactMethod === "max";
  const contactLabel =
    quizSteps[6].options.find((option) => option.id === contactMethod)?.title ?? "";
  const giftTitle =
    quizSteps[5].options.find((option) => option.id === selectedGift)?.title ?? "";

  stepIndexRef.current = currentStep;

  const progress = useMemo(() => {
    if (isSubmitted || showForm) return 100;
    return ((currentStep + (selectedId ? 0.55 : 0)) / total) * 100;
  }, [currentStep, isSubmitted, selectedId, showForm, total]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function clearTimer() {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function goTo(index: number) {
    clearTimer();
    setCurrentStep(index);
    setShowForm(false);
    setAnimKey((value) => value + 1);
    const nextStep = quizSteps[index];
    if (nextStep?.id === "area") {
      setAreaDraft(Number(answers.area) || AREA_DEFAULT);
    }
  }

  function goNext() {
    const index = stepIndexRef.current;
    const current = quizSteps[index];
    if (current.id === "contact") {
      setShowForm(true);
      setAnimKey((value) => value + 1);
      return;
    }
    goTo(Math.min(index + 1, total - 1));
  }

  function scheduleNext(delay: number) {
    clearTimer();
    timerRef.current = window.setTimeout(goNext, delay);
  }

  function selectOption(option: QuizOption, autoAdvance = true) {
    setAnswers((current) => ({ ...current, [step.id]: option.id }));
    if (step.id === "gift") setSelectedGift(option.id);
    if (step.id === "contact") {
      setContactMethod(option.id);
      setFormError("");
    }
    if (autoAdvance) scheduleNext(AUTO_NEXT_MS);
  }

  function selectArea(value: number) {
    const next = Math.min(AREA_MAX, Math.max(AREA_MIN, value));
    setAreaDraft(next);
    setAnswers((current) => ({ ...current, area: String(next) }));
  }

  function handleNext() {
    if (step.id === "area") {
      if (!answers.area) selectArea(areaDraft);
      goNext();
      return;
    }
    if (!selectedId) return;
    goNext();
  }

  function handleBack() {
    clearTimer();
    if (showForm) {
      setShowForm(false);
      setAnimKey((value) => value + 1);
      return;
    }
    if (currentStep === 0) return;
    goTo(currentStep - 1);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setFormError("Укажите имя и телефон, чтобы отправить расчёт.");
      return;
    }
    if (needsMessenger && !formData.messenger.trim()) {
      setFormError("Добавьте ник или телефон для выбранного мессенджера.");
      return;
    }
    if (!formData.policy || !formData.consent) {
      setFormError("Подтвердите согласие на обработку персональных данных.");
      return;
    }

    setFormError("");
    setIsSubmitted(true);
    setAnimKey((value) => value + 1);
  }

  const canNext = step.id === "area" || Boolean(selectedId);

  return (
    <section
      id="contacts"
      className="quiz-section scroll-mt-24"
    >
      <div className="hero-container">
        <div className="quiz-shell">
          <QuizHeader />
          <div className="quiz-panel">
            {isSubmitted ? (
              <QuizSuccess key={animKey} />
            ) : (
              <>
                <QuizProgress
                  current={showForm ? total : currentStep + 1}
                  total={total}
                  value={progress}
                />
                <div key={animKey} className="quiz-step">
                  {showForm ? (
                    <QuizForm
                      contactLabel={contactLabel}
                      giftTitle={giftTitle}
                      needsMessenger={needsMessenger}
                      contactMethod={contactMethod}
                      formData={formData}
                      error={formError}
                      onChange={setFormData}
                      onSubmit={handleSubmit}
                    />
                  ) : (
                    <QuizStepView
                      step={step}
                      selectedId={selectedId}
                      areaValue={areaDraft}
                      onSelect={selectOption}
                      onAreaInput={selectArea}
                    />
                  )}
                </div>
                <QuizNavigation
                  canBack={currentStep > 0 || showForm}
                  canNext={canNext}
                  isForm={showForm}
                  onBack={handleBack}
                  onNext={handleNext}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuizHeader() {
  return (
    <div className="quiz-head">
      <p className="quiz-eyebrow">{quizCopy.eyebrow}</p>
      <h2 className="quiz-title">{quizCopy.title}</h2>
      <p className="quiz-subtitle">{quizCopy.subtitle}</p>
      <ul className="quiz-badges">
        {quizCopy.badges.map((badge) => (
          <li key={badge}>{badge}</li>
        ))}
      </ul>
    </div>
  );
}

function QuizProgress({
  current,
  total,
  value,
}: {
  current: number;
  total: number;
  value: number;
}) {
  return (
    <div className="quiz-progress">
      <div className="quiz-progress__meta">
        <p>
          {quizCopy.stepLabel} {current} {quizCopy.ofLabel} {total}
        </p>
        <p>{quizCopy.timeHint}</p>
      </div>
      <div className="quiz-progress__track" aria-hidden>
        <span style={{ width: `${Math.min(100, Math.max(8, value))}%` }} />
      </div>
    </div>
  );
}

function QuizStepView({
  step,
  selectedId,
  areaValue,
  onSelect,
  onAreaInput,
}: {
  step: QuizStep;
  selectedId?: string;
  areaValue: number;
  onSelect: (option: QuizOption) => void;
  onAreaInput: (value: number) => void;
}) {
  return (
    <>
      <h3 className="quiz-question">{step.question}</h3>
      {step.type === "image-cards" ? (
        <div className="quiz-grid">
          {step.options.map((option) => (
            <ImageOptionCard
              key={option.id}
              option={option}
              selected={selectedId === option.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : null}
      {step.type === "range" ? (
        <RangeStep value={areaValue} onInput={onAreaInput} />
      ) : null}
      {step.type === "vertical-options" ? (
        <div className="quiz-rows">
          {step.options.map((option) => (
            <VerticalOption
              key={option.id}
              option={option}
              selected={selectedId === option.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : null}
      {step.type === "gift-options" ? (
        <div className="quiz-grid">
          {step.options.map((option) => (
            <GiftOptionCard
              key={option.id}
              option={option}
              selected={selectedId === option.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}

function ImageOptionCard({
  option,
  selected,
  onSelect,
}: {
  option: QuizOption;
  selected: boolean;
  onSelect: (option: QuizOption) => void;
}) {
  return (
    <button
      type="button"
      className={`quiz-media ${selected ? "is-selected" : ""}`}
      onClick={() => onSelect(option)}
    >
      <span className="quiz-media-photo relative">
        {option.image ? (
          <Image src={option.image} alt="" fill sizes="(max-width: 767px) 90vw, 280px" className="object-cover" />
        ) : null}
      </span>
      <span className="quiz-media-copy">
        <span className="quiz-card-title">{option.title}</span>
        {option.hint ? <span className="quiz-card-hint">{option.hint}</span> : null}
      </span>
    </button>
  );
}

function GiftOptionCard({
  option,
  selected,
  onSelect,
}: {
  option: QuizOption;
  selected: boolean;
  onSelect: (option: QuizOption) => void;
}) {
  return (
    <button
      type="button"
      className={`quiz-gift ${selected ? "is-selected" : ""}`}
      onClick={() => onSelect(option)}
    >
      <span className="quiz-gift-photo relative">
        {option.image ? (
          <Image src={option.image} alt="" fill sizes="(max-width: 767px) 90vw, 240px" className="object-cover" />
        ) : null}
        <span className="quiz-gift-icon">
          <QuizIcon name={option.icon} />
        </span>
      </span>
      <span className="quiz-media-copy">
        <span className="quiz-gift-label">Подарок</span>
        <span className="quiz-card-title">{option.title}</span>
        {option.hint ? <span className="quiz-card-hint">{option.hint}</span> : null}
      </span>
    </button>
  );
}

function VerticalOption({
  option,
  selected,
  onSelect,
}: {
  option: QuizOption;
  selected: boolean;
  onSelect: (option: QuizOption) => void;
}) {
  return (
    <button
      type="button"
      className={`quiz-row ${selected ? "is-selected" : ""}`}
      onClick={() => onSelect(option)}
    >
      <span className="quiz-radio" aria-hidden />
      <span className="quiz-row-copy">
        <span className="quiz-row-title">{option.title}</span>
        {option.hint ? <span className="quiz-row-hint">{option.hint}</span> : null}
      </span>
    </button>
  );
}

function RangeStep({
  value,
  onInput,
}: {
  value: number;
  onInput: (value: number) => void;
}) {
  const fill = ((value - AREA_MIN) / (AREA_MAX - AREA_MIN)) * 100;
  const activePreset = areaPresetId(value);

  return (
    <div className="quiz-range">
      <p className="quiz-range-value">{formatArea(value)}</p>
      <p className="quiz-range-hint">{quizCopy.areaHint}</p>
      <label className="quiz-slider-wrap">
        <input
          className="quiz-slider"
          type="range"
          min={AREA_MIN}
          max={AREA_MAX}
          step={AREA_STEP}
          value={value}
          style={{ "--quiz-fill": `${fill}%` } as CSSProperties}
          aria-label="Площадь объекта"
          onChange={(event) => onInput(Number(event.target.value))}
        />
        <span className="quiz-slider-scale">
          <span>{AREA_MIN} м²</span>
          <span>{AREA_MAX}+ м²</span>
        </span>
      </label>
      <div className="quiz-chips">
        {areaPresets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className={`quiz-chip ${activePreset === preset.id ? "is-selected" : ""}`}
            onClick={() => onInput(preset.value)}
          >
            {preset.title}
          </button>
        ))}
      </div>
    </div>
  );
}

function QuizNavigation({
  canBack,
  canNext,
  isForm,
  onBack,
  onNext,
}: {
  canBack: boolean;
  canNext: boolean;
  isForm: boolean;
  onBack: () => void;
  onNext: () => void;
}) {
  if (isForm) {
    return (
      <div className="quiz-nav">
        <button type="button" className="quiz-btn quiz-btn--ghost" onClick={onBack}>
          {quizCopy.back}
        </button>
        <button type="submit" form="quiz-lead-form" className="quiz-btn quiz-btn--primary">
          {quizCopy.submit}
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-nav">
      <button
        type="button"
        className="quiz-btn quiz-btn--ghost"
        onClick={onBack}
        disabled={!canBack}
      >
        {quizCopy.back}
      </button>
      <button
        type="button"
        className="quiz-btn quiz-btn--primary"
        onClick={onNext}
        disabled={!canNext}
      >
        {quizCopy.next}
      </button>
    </div>
  );
}

function QuizForm({
  contactLabel,
  giftTitle,
  needsMessenger,
  contactMethod,
  formData,
  error,
  onChange,
  onSubmit,
}: {
  contactLabel: string;
  giftTitle: string;
  needsMessenger: boolean;
  contactMethod: string;
  formData: FormDataState;
  error: string;
  onChange: (next: FormDataState) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const messengerPlaceholder =
    contactMethod === "max" ? "@username или телефон в Max" : "@username или телефон в Telegram";

  function patch(partial: Partial<FormDataState>) {
    onChange({ ...formData, ...partial });
  }

  return (
    <form id="quiz-lead-form" className="quiz-form" onSubmit={onSubmit} noValidate>
      <div className="quiz-form-head">
        <p className="quiz-form-channel">
          Способ связи: {contactLabel}
          {giftTitle ? ` · Подарок: ${giftTitle}` : ""}
        </p>
        <h3 className="quiz-question">{quizCopy.formTitle}</h3>
        <p className="quiz-form-lead">{quizCopy.formSubtitle}</p>
      </div>

      <div className="quiz-fields">
        <label className="quiz-field">
          <span>Имя</span>
          <input
            type="text"
            autoComplete="name"
            placeholder="Как к вам обращаться"
            value={formData.name}
            onChange={(event) => patch({ name: event.target.value })}
          />
        </label>
        <label className="quiz-field">
          <span>Телефон</span>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="+7 900 000-00-00"
            value={formData.phone}
            onChange={(event) => patch({ phone: event.target.value })}
          />
        </label>
        {needsMessenger ? (
          <label className="quiz-field quiz-field--full">
            <span>{contactMethod === "max" ? "Ник или телефон в Max" : "Ник или телефон в Telegram"}</span>
            <input
              type="text"
              placeholder={messengerPlaceholder}
              value={formData.messenger}
              onChange={(event) => patch({ messenger: event.target.value })}
            />
          </label>
        ) : null}
        <label className="quiz-field quiz-field--full">
          <span>Комментарий</span>
          <textarea
            rows={3}
            placeholder="Можно коротко описать объект — необязательно"
            value={formData.comment}
            onChange={(event) => patch({ comment: event.target.value })}
          />
        </label>
      </div>

      <label className="quiz-check">
        <input
          type="checkbox"
          checked={formData.policy}
          onChange={(event) => patch({ policy: event.target.checked })}
        />
        <span>
          Я ознакомлен(-а) с{" "}
          <a href="#policy">политикой обработки персональных данных</a>
        </span>
      </label>
      <label className="quiz-check">
        <input
          type="checkbox"
          checked={formData.consent}
          onChange={(event) => patch({ consent: event.target.checked })}
        />
        <span>Даю согласие на обработку персональных данных</span>
      </label>

      {error ? <p className="quiz-form-error">{error}</p> : null}
    </form>
  );
}

function QuizSuccess() {
  return (
    <div className="quiz-success">
      <span className="quiz-success-mark" aria-hidden>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M11 18.5 15.8 23 25 13.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h3>{quizCopy.successTitle}</h3>
      <p>{quizCopy.successText}</p>
    </div>
  );
}
