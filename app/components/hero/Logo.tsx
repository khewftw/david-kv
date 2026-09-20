import Link from "next/link";
import { site } from "@/app/lib/site";

type LogoProps = {
  variant?: "horiz" | "vert";
  className?: string;
  inverted?: boolean;
};

const logoMeta = {
  horiz: {
    src: "/horiz-logo.svg",
    darkSrc: "/horiz-logo-dark.svg",
    width: 183,
    height: 52,
    className: "h-9 w-auto max-w-[min(100%,210px)] lg:h-[52px] lg:max-w-[240px]",
  },
  vert: {
    src: "/vert-logo.svg",
    darkSrc: "/vert-logo.svg",
    width: 97,
    height: 66,
    className: "h-[66px] w-auto",
  },
} as const;

export function Logo({
  variant = "horiz",
  className = "",
  inverted = false,
}: LogoProps) {
  const logo = logoMeta[variant];

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label={site.name}
    >
      {variant === "horiz" ? (
        <span className={`relative inline-flex ${logo.className}`}>
          <img
            src={logo.src}
            alt=""
            width={logo.width}
            height={logo.height}
            className={`h-full w-auto object-contain object-left transition-opacity duration-250 ease-[ease] ${
              inverted ? "opacity-0" : "opacity-100"
            }`}
          />
          <img
            src={logo.darkSrc}
            alt=""
            width={logo.width}
            height={logo.height}
            className={`absolute top-0 left-0 h-full w-auto object-contain object-left transition-opacity duration-250 ease-[ease] ${
              inverted ? "opacity-100" : "opacity-0"
            }`}
          />
        </span>
      ) : (
        <img
          src={logo.src}
          alt=""
          width={logo.width}
          height={logo.height}
          className={`${logo.className} object-contain object-left`}
        />
      )}
    </Link>
  );
}
