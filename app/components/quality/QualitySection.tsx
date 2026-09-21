"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  qualityCopy,
  qualityItems,
  type QualityItem,
} from "@/app/lib/quality";

function headerOffset() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-height")
    .trim();
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : 80;
}

export function Quality() {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;

    const refresh = () => ScrollTrigger.refresh();
    const images = Array.from(track.querySelectorAll("img"));
    images.forEach((image) => {
      if (!image.complete) {
        image.addEventListener("load", refresh, { once: true });
      }
    });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const getScrollAmount = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      const horizontalTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: () => `top ${headerOffset()}px`,
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils
        .toArray<HTMLElement>(track.querySelectorAll(".quality-scene__image"))
        .forEach((image) => {
          const scene = image.closest(".quality-scene");
          if (!scene) return;

          gsap.fromTo(
            image,
            { xPercent: -4 },
            {
              xPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: scene,
                containerAnimation: horizontalTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });

      requestAnimationFrame(refresh);

      return () => {
        horizontalTween.scrollTrigger?.kill();
        horizontalTween.kill();
      };
    });

    window.addEventListener("load", refresh);
    window.addEventListener("orientationchange", refresh);

    return () => {
      images.forEach((image) => image.removeEventListener("load", refresh));
      window.removeEventListener("load", refresh);
      window.removeEventListener("orientationchange", refresh);
      mm.revert();
    };
  }, []);

  return (
    <section className="quality-section" aria-labelledby="quality-title">
      <QualityIntro />
      <div ref={stageRef} className="quality-stage">
        <div ref={trackRef} className="quality-track">
          {qualityItems.map((item) => (
            <QualityScene key={item.id} item={item} />
          ))}
        </div>
      </div>
      <QualityOutro />
    </section>
  );
}

function QualityIntro() {
  return (
    <div className="quality-intro hero-container">
      <div className="quality-intro__grid">
        <div className="quality-intro__copy">
          <p className="quality-eyebrow">{qualityCopy.eyebrow}</p>
          <h2 id="quality-title" className="quality-title">
            {qualityCopy.title.map((part, index) => (
              <Fragment key={index}>
                <span className={part.accent ? "text-accent" : undefined}>
                  {part.text}
                </span>
                {index === 0 || part.text === "под" ? <br /> : null}
              </Fragment>
            ))}
          </h2>
        </div>
        <p className="quality-subtitle">
          {qualityCopy.subtitle.map((part, index) =>
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
  );
}

function QualityScene({ item }: { item: QualityItem }) {
  return (
    <div
      className={`quality-scene quality-scene--${item.size} quality-scene--${item.copy}`}
    >
      <div className="quality-scene__image-wrap">
        <div className="quality-scene__image relative">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width: 767px) 92vw, 82vw"
            quality={90}
            priority={item.id === "01" || item.id === "02"}
            className="object-cover"
            style={
              item.objectPosition
                ? { objectPosition: item.objectPosition }
                : undefined
            }
          />
        </div>
      </div>
      <article className="quality-scene__copy">
        <p className="quality-scene__num">[{item.id}]</p>
        <h3 className="quality-scene__headline">{item.title}</h3>
        <p className="quality-scene__text">{item.text}</p>
      </article>
    </div>
  );
}

function QualityOutro() {
  return (
    <div className="quality-outro hero-container">
      <p className="quality-outro__text">
        {qualityCopy.outro.map((part, index) =>
          part.accent ? (
            <span key={index} className="text-accent">
              {part.text}
            </span>
          ) : (
            <span key={index}>{part.text}</span>
          ),
        )}
      </p>
      <Link href={qualityCopy.ctaHref} className="quality-outro__cta">
        <span className="case-block__icon case-block__icon--calc" aria-hidden />
        {qualityCopy.cta}
      </Link>
    </div>
  );
}
