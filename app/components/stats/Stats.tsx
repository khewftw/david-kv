"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { site } from "@/app/lib/site";

export function Stats() {
  const { stats } = site;
  const rootRef = useRef<HTMLElement>(null);
  const visible = useInView(rootRef);

  return (
    <section
      ref={rootRef}
      className="stats-section bg-[#F8F6F2] py-[72px] text-[#1F1A17] md:py-24 lg:py-[120px]"
    >
      <div className="hero-container">
        <div className="mx-auto max-w-[1200px] text-center">
          <p className="mb-2.5 font-ui text-base font-medium tracking-[0.02em] text-[#1F1A17]/25">
            {stats.eyebrow}
          </p>
          <h2 className="section-title mx-auto lg:whitespace-nowrap">
            {stats.title.map((part, index) =>
              part.accent ? (
                <span key={index} className="text-accent">
                  {part.text}
                </span>
              ) : (
                <span key={index}>{part.text}</span>
              ),
            )}
          </h2>
          <p className="mx-auto mt-6 max-w-[860px] font-ui text-[16px] font-normal leading-[1.5] text-[rgba(31,26,23,0.72)] md:text-[18px] lg:text-[20px]">
            {stats.subtitle.map((part, index) =>
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

        <div className="mt-12 grid grid-cols-1 gap-9 md:mt-16 md:grid-cols-2 md:gap-7 lg:mt-[72px] lg:grid-cols-4 lg:gap-8">
          {stats.items.map((item, index) => (
            <article
              key={item.title}
              className={`stat-item px-2 text-center lg:border-r lg:border-[rgba(31,26,23,0.08)] lg:px-6 lg:last:border-r-0 ${
                visible ? "is-visible" : ""
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <StatValue
                value={item.value}
                suffix={item.suffix}
                unit={item.unit}
                active={visible}
                delay={index * 100}
              />
              <h3 className="mx-auto mt-[18px] max-w-[18rem] font-ui text-[22px] font-semibold leading-[1.1] lg:text-[28px]">
                {item.title}
              </h3>
              <p className="mx-auto mt-3.5 max-w-[320px] font-ui text-[15px] font-normal leading-[1.55] text-[rgba(31,26,23,0.72)] md:text-base lg:text-[17px]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatValue({
  value,
  suffix,
  unit,
  active,
  delay,
}: {
  value: number;
  suffix: string;
  unit: string;
  active: boolean;
  delay: number;
}) {
  const count = useCountUp(value, active, delay);

  return (
    <p className="stat-number flex items-end justify-center whitespace-nowrap text-[clamp(68px,8vw,132px)] font-medium tracking-[-0.03em] leading-[0.9]">
      <span>{count}</span>
      {suffix && count >= value ? <span>{suffix}</span> : null}
      {unit ? (
        <span className="mb-[0.08em] ml-[0.12em] text-[clamp(28px,2.6vw,52px)] leading-none tracking-[-0.02em]">
          {unit}
        </span>
      ) : null}
    </p>
  );
}

function useInView(ref: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return visible;
}

function useCountUp(target: number, active: boolean, delay: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setValue(target);
      return;
    }

    const duration = 1600;
    let frame = 0;
    let start = 0;

    const timeout = window.setTimeout(() => {
      const tick = (time: number) => {
        if (!start) start = time;
        const progress = Math.min(1, (time - start) / duration);
        const eased = 1 - (1 - progress) ** 3;
        setValue(Math.round(target * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [active, delay, target]);

  return value;
}
