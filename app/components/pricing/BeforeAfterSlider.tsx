"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

type BeforeAfterSliderProps = {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt?: string;
  playHint?: boolean;
};

const HINT_MS = 900;
const KEY_STEP = 3;

export function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "До",
  afterLabel = "После",
  alt = "Сравнить интерьер до и после ремонта",
  playHint = false,
}: BeforeAfterSliderProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const positionRef = useRef(50);
  const draggingRef = useRef(false);
  const interactedRef = useRef(false);
  const startRef = useRef({
    x: 0,
    y: 0,
    decided: false,
    dragging: false,
  });

  const setPos = useCallback((value: number) => {
    const next = Math.min(100, Math.max(0, value));
    positionRef.current = next;
    setPosition(next);
  }, []);

  const positionFromClientX = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return positionRef.current;
    const rect = frame.getBoundingClientRect();
    if (rect.width <= 0) return positionRef.current;
    return ((clientX - rect.left) / rect.width) * 100;
  }, []);

  function markInteracted() {
    interactedRef.current = true;
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    startRef.current = {
      x: event.clientX,
      y: event.clientY,
      decided: event.pointerType !== "touch",
      dragging: event.pointerType !== "touch",
    };

    if (event.pointerType !== "touch") {
      draggingRef.current = true;
      markInteracted();
      event.currentTarget.setPointerCapture(event.pointerId);
      setPos(positionFromClientX(event.clientX));
    }
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const start = startRef.current;

    if (event.pointerType === "touch" && !start.decided) {
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;

      if (Math.abs(dx) > Math.abs(dy)) {
        start.decided = true;
        start.dragging = true;
        draggingRef.current = true;
        markInteracted();
        event.currentTarget.setPointerCapture(event.pointerId);
        setPos(positionFromClientX(event.clientX));
      } else {
        start.decided = true;
        start.dragging = false;
      }
      return;
    }

    if (!draggingRef.current) return;
    event.preventDefault();
    setPos(positionFromClientX(event.clientX));
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType === "touch" &&
      !startRef.current.dragging &&
      !startRef.current.decided
    ) {
      markInteracted();
      setPos(positionFromClientX(event.clientX));
    }

    draggingRef.current = false;
    startRef.current.dragging = false;
    startRef.current.decided = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Home") {
      event.preventDefault();
      markInteracted();
      setPos(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      markInteracted();
      setPos(100);
    }
  }

  useEffect(() => {
    if (!playHint) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let started = 0;

    const tick = (time: number) => {
      if (interactedRef.current) return;
      if (!started) started = time;
      const progress = Math.min(1, (time - started) / HINT_MS);
      const wave = progress < 0.5 ? progress / 0.5 : 1 - (progress - 0.5) / 0.5;
      const eased = 1 - (1 - wave) ** 2;
      setPos(50 + 7 * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      setPos(50);
    };

    const timeout = window.setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, 180);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [playHint, setPos]);

  return (
    <div
      ref={frameRef}
      className="ba-slider"
      style={{ "--position": `${position}%` } as CSSProperties}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className="ba-slider__layer">
        <Image
          src={before}
          alt=""
          fill
          sizes="(max-width: 1023px) 100vw, 33vw"
          className="object-cover object-center"
          draggable={false}
        />
      </div>
      <div className="ba-slider__layer ba-slider__after">
        <Image
          src={after}
          alt={alt}
          fill
          sizes="(max-width: 1023px) 100vw, 33vw"
          className="object-cover object-center"
          draggable={false}
        />
      </div>

      <span className="ba-slider__label is-before">{beforeLabel}</span>
      <span className="ba-slider__label is-after">{afterLabel}</span>

      <div className="ba-slider__divider" aria-hidden="true">
        <span className="ba-slider__handle">
          <HandleArrows />
        </span>
      </div>

      <input
        className="ba-slider__range"
        type="range"
        min={0}
        max={100}
        step={1}
        value={position}
        aria-label="Сравнить интерьер до и после ремонта"
        onChange={(event) => {
          markInteracted();
          setPos(Number(event.target.value));
        }}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

function HandleArrows() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M9 7.5 4.5 12 9 16.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 7.5 19.5 12 15 16.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
