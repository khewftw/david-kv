import type { QuizIconName } from "@/app/lib/quiz";

const svg = {
  className: "quiz-card-icon",
  width: 32,
  height: 32,
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function QuizIcon({ name }: { name: QuizIconName }) {
  switch (name) {
    case "newbuild":
      return (
        <svg {...svg}>
          <path d="M4 28V12l8-6 8 6v16" />
          <path d="M12 28V18h8v10" />
          <path d="M20 12.5V6h5v6.8" />
          <path d="M7.5 16h3M7.5 20h3" />
        </svg>
      );
    case "secondary":
      return (
        <svg {...svg}>
          <path d="M5 28V14l11-8 11 8v14" />
          <path d="M13 28V19h6v9" />
          <path d="M12 16h2.5M17.5 16H20" />
        </svg>
      );
    case "house":
      return (
        <svg {...svg}>
          <path d="M4 15.5 16 6l12 9.5" />
          <path d="M7 14.5V27h18V14.5" />
          <path d="M13 27v-8h6v8" />
        </svg>
      );
    case "commercial":
      return (
        <svg {...svg}>
          <rect x="5" y="7" width="22" height="21" rx="1.5" />
          <path d="M10 27v-6h5v6" />
          <path d="M10 12h3M19 12h3M10 17h3M19 17h3" />
        </svg>
      );
    case "design":
      return (
        <svg {...svg}>
          <path d="M7 25 21.5 10.5a3 3 0 0 1 4.2 4.2L11.2 29H7v-4Z" />
          <path d="M19 13l4 4" />
        </svg>
      );
    case "capital":
      return (
        <svg {...svg}>
          <path d="M6 26h20" />
          <path d="M8 26V14l8-6 8 6v12" />
          <path d="M14 26v-7h4v7" />
          <path d="M12 17h2.5M17.5 17H20" />
        </svg>
      );
    case "cosmetic":
      return (
        <svg {...svg}>
          <rect x="6" y="8" width="20" height="16" rx="2" />
          <path d="M6 14h20" />
          <path d="M12 8v16" />
        </svg>
      );
    case "undecided":
      return (
        <svg {...svg}>
          <circle cx="16" cy="16" r="10" />
          <path d="M12.5 13a3.5 3.5 0 1 1 5.2 3.1c-.8.5-1.7 1.2-1.7 2.4" />
          <path d="M16 22.5v.5" />
        </svg>
      );
    case "area-s":
      return (
        <svg {...svg}>
          <rect x="9" y="9" width="14" height="14" rx="1.5" />
          <path d="M9 16h14M16 9v14" />
        </svg>
      );
    case "area-m":
      return (
        <svg {...svg}>
          <rect x="6" y="9" width="20" height="14" rx="1.5" />
          <path d="M16 9v14M6 16h20" />
        </svg>
      );
    case "area-l":
      return (
        <svg {...svg}>
          <rect x="4.5" y="8" width="23" height="16" rx="1.5" />
          <path d="M4.5 16h23M12 8v16M20 8v16" />
        </svg>
      );
    case "area-xl":
      return (
        <svg {...svg}>
          <rect x="4" y="6" width="24" height="20" rx="1.5" />
          <path d="M4 13h24M4 20h24M12 6v20M20 6v20" />
        </svg>
      );
    case "project-full":
      return (
        <svg {...svg}>
          <rect x="7" y="5" width="18" height="22" rx="2" />
          <path d="M11 11h10M11 16h10M11 21h6" />
        </svg>
      );
    case "project-part":
      return (
        <svg {...svg}>
          <rect x="6" y="7" width="20" height="18" rx="2" />
          <path d="M6 14h20" />
          <path d="M14 7v18" />
        </svg>
      );
    case "project-none":
      return (
        <svg {...svg}>
          <path d="M7 8h18v16H7z" />
          <path d="M11 12l10 8M21 12 11 20" />
        </svg>
      );
    case "project-consult":
      return (
        <svg {...svg}>
          <path d="M7 8h18v12H13l-6 5V8Z" />
          <path d="M12 14h8" />
        </svg>
      );
    case "clock":
      return (
        <svg {...svg}>
          <circle cx="16" cy="16" r="10" />
          <path d="M16 10v7l4 2.5" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...svg}>
          <rect x="6" y="8" width="20" height="18" rx="2" />
          <path d="M6 13h20M11 5.5v5M21 5.5v5" />
          <path d="M12 18h2M16 18h2M20 18h.01" />
        </svg>
      );
    case "keys":
      return (
        <svg {...svg}>
          <circle cx="12" cy="14" r="5" />
          <path d="M16 14h10v3.5M22 14v4.5" />
        </svg>
      );
    case "plan":
      return (
        <svg {...svg}>
          <path d="M8 6h12l6 6v14H8z" />
          <path d="M20 6v6h6" />
          <path d="M12 16h8M12 21h5" />
        </svg>
      );
    case "gift":
      return (
        <svg {...svg}>
          <rect x="6" y="14" width="20" height="12" rx="1.5" />
          <path d="M6 14h20v-4H6z" />
          <path d="M16 10v16" />
          <path d="M16 10c-3-4-7-1.5-4 1.5C14.5 14 16 10 16 10Z" />
          <path d="M16 10c3-4 7-1.5 4 1.5C17.5 14 16 10 16 10Z" />
        </svg>
      );
    case "discount":
      return (
        <svg {...svg}>
          <path d="M7 18 18 7h7v7L14 25a3 3 0 0 1-4.2 0L7 22.2A3 3 0 0 1 7 18Z" />
          <circle cx="21" cy="11" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "materials":
      return (
        <svg {...svg}>
          <path d="M6 24h20" />
          <path d="M8 24V14h6v10" />
          <path d="M16 24V10h8v14" />
          <path d="M18.5 14h3M18.5 18h3" />
        </svg>
      );
    case "tile":
      return (
        <svg {...svg}>
          <rect x="6" y="6" width="9" height="9" rx="1" />
          <rect x="17" y="6" width="9" height="9" rx="1" />
          <rect x="6" y="17" width="9" height="9" rx="1" />
          <rect x="17" y="17" width="9" height="9" rx="1" />
        </svg>
      );
    case "telegram":
      return (
        <svg {...svg}>
          <path d="M6.5 15.8 25 8.5 21.2 24.5l-6.1-5.2-3.2 3.1.5-5.6 9.2-8.3-11.4 6.8-3.7-.5Z" />
        </svg>
      );
    case "max":
      return (
        <svg {...svg}>
          <rect x="6" y="7" width="20" height="18" rx="5" />
          <path d="M11 20V12l5 6 5-6v8" />
        </svg>
      );
    case "phone":
      return (
        <svg {...svg}>
          <path d="M10 7.5h4.2l1.3 4-2.2 1.4a13 13 0 0 0 5.8 5.8l1.4-2.2 4 1.3V22a2.5 2.5 0 0 1-2.7 2.5A17 17 0 0 1 7.5 10.2 2.5 2.5 0 0 1 10 7.5Z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...svg}>
          <path d="M8 23.5 9.6 18A9 9 0 1 1 14 24.4L8 23.5Z" />
          <path d="M12.5 13.2c.3 1.8 1.7 3.4 3.4 4.2.4.2.8 0 1-.4l.5-1 .9.4c.4.2.5.7.3 1.1l-.6 1.1c-.3.6-1 .9-1.6.7a9.5 9.5 0 0 1-5.3-5.1c-.2-.6.1-1.3.7-1.6l1.1-.6c.4-.2.9-.1 1.1.3l.4.9c.1.4 0 .8-.4 1Z" />
        </svg>
      );
    default:
      return null;
  }
}
