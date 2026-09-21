"use client";

import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { reviews, reviewsCopy, type ReviewItem } from "@/app/lib/reviews";

const reviewsAverage = (
  reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length
).toFixed(1);

export function ReviewsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    skipSnaps: false,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="trust-section reviews-section" aria-labelledby="reviews-title">
      <div className="hero-container">
        <div className="reviews-head">
          <div className="reviews-head__copy">
            <p className="trust-eyebrow">{reviewsCopy.eyebrow}</p>
            <h2 id="reviews-title" className="section-title reviews-title">
              {reviewsCopy.title.map((part, titleIndex) => (
                <span key={titleIndex} className={part.accent ? "text-accent" : undefined}>
                  {part.text}
                  {titleIndex === 0 ? <br /> : null}
                </span>
              ))}
            </h2>
            <p className="trust-subtitle">{reviewsCopy.subtitle}</p>
          </div>

          <div className="reviews-head__aside">
            <ReviewsSummary score={reviewsAverage} className="reviews-summary" />
            <div className="reviews-nav">
              <button
                type="button"
                className="reviews-nav__btn is-prev"
                onClick={() => emblaApi?.scrollPrev()}
                aria-label="Предыдущий отзыв"
                disabled={!canPrev}
              >
                <NavChevron />
              </button>
              <button
                type="button"
                className="reviews-nav__btn is-next"
                onClick={() => emblaApi?.scrollNext()}
                aria-label="Следующий отзыв"
                disabled={!canNext}
              >
                <NavChevron />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="reviews-viewport"
        ref={emblaRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Отзывы клиентов"
      >
        <div className="reviews-track">
          {reviews.map((item) => (
            <div className="review-slide" key={item.id}>
              <ReviewCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSummary({ score, className }: { score: string; className: string }) {
  return (
    <div className={className}>
      <div className="reviews-summary__row">
        <Stars />
        <span className="reviews-summary__score">{score}</span>
      </div>
      <p className="reviews-summary__caption">{reviewsCopy.summaryCaption}</p>
    </div>
  );
}

function ReviewCard({ item }: { item: ReviewItem }) {
  return (
    <article className={`review-card${item.accent ? " is-accent" : ""}`}>
      <span className="review-card__quote" aria-hidden>
        “
      </span>

      <div className="review-card__top">
        <div className="review-card__person">
          <span className="review-card__avatar" aria-hidden>
            {item.initials}
          </span>
          <div>
            <p className="review-card__name">{item.name}</p>
            <p className="review-card__meta">
              {item.location} · {item.date}
            </p>
          </div>
        </div>
        <div className="review-card__rating" aria-label={`Оценка ${item.rating.toFixed(1)}`}>
          <Stars />
          <span className="review-card__score">{item.rating.toFixed(1)}</span>
        </div>
      </div>

      <p className="review-card__status">
        <CheckIcon />
        {item.projectStatus}
      </p>

      <ReviewText text={item.text} highlight={item.highlight} />

      <div className="review-card__divider" />

      <dl className="review-stats">
        <div>
          <dt>{reviewsCopy.areaLabel}</dt>
          <dd>{item.area}</dd>
        </div>
        <div>
          <dt>{reviewsCopy.durationLabel}</dt>
          <dd>{item.duration}</dd>
        </div>
      </dl>
      <p className="review-card__type">{item.type}</p>

      <div className="review-card__footer">
        <p className="review-card__verified">
          <CheckIcon />
          {reviewsCopy.verifiedProject}
        </p>
        {item.projectUrl ? (
          <Link href={item.projectUrl} className="review-card__case">
            {reviewsCopy.viewCase}
            <span aria-hidden> →</span>
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function ReviewText({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight || !text.includes(highlight)) {
    return <p className="review-card__text">{text}</p>;
  }

  const [before, ...rest] = text.split(highlight);

  return (
    <p className="review-card__text">
      {before}
      <strong>{highlight}</strong>
      {rest.join(highlight)}
    </p>
  );
}

function Stars() {
  return (
    <span className="review-stars" aria-hidden>
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 20 20">
          <path
            fill="currentColor"
            d="M10 1.6 12.4 6.6l5.5.8-4 3.9.9 5.5L10 14.4 5.2 16.8l.9-5.5-4-3.9 5.5-.8L10 1.6Z"
          />
        </svg>
      ))}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.2 8.2 6.4 11.4 12.8 4.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavChevron() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
