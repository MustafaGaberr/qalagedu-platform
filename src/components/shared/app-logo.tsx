import Image from "next/image";

import { appConfig } from "@/config/app";
import { cn } from "@/lib/utils";

type AppLogoProps = {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  logoSrc?: string;
  brandName?: string;
  centerName?: string;
};

const logoSizes = {
  sm: {
    mark: "size-9 rounded-lg",
    title: "text-sm leading-5",
    subtitle: "text-[0.7rem] leading-4",
  },
  md: {
    mark: "size-10 rounded-xl",
    title: "text-base leading-5",
    subtitle: "text-xs leading-4",
  },
  lg: {
    mark: "size-12 rounded-2xl",
    title: "text-xl leading-6",
    subtitle: "text-sm leading-5",
  },
} as const;

export function AppLogo({
  className,
  showText = true,
  size = "md",
  logoSrc = appConfig.center.logo.src,
  brandName = appConfig.name,
  centerName = appConfig.center.name,
}: AppLogoProps) {
  const styles = logoSizes[size];
  const resolvedLogoSrc = absoluteLogoSource(logoSrc);
  const fallbackInitial = (brandName.trim()[0] || appConfig.shortName.trim()[0] || "ق").toUpperCase();

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {resolvedLogoSrc ? (
        <Image
          src={resolvedLogoSrc}
          alt={appConfig.center.logo.alt}
          width={appConfig.center.logo.width}
          height={appConfig.center.logo.height}
          priority
          className={styles.mark}
          unoptimized
        />
      ) : (
        <span aria-hidden="true" className={cn("grid shrink-0 place-items-center bg-primary font-bold text-primary-foreground", styles.mark)}>
          {fallbackInitial}
        </span>
      )}
      {showText ? (
        <div className="flex flex-col text-start">
          <span
            className={cn(
              "font-semibold tracking-normal text-foreground",
              styles.title
            )}
          >
            {brandName}
          </span>
          <span className={cn("text-muted-foreground", styles.subtitle)}>
            {centerName}
          </span>
        </div>
      ) : null}
    </div>
  );
}

function absoluteLogoSource(value: string | undefined): string | undefined {
  const source = value?.trim();
  if (!source) return undefined;
  try {
    const url = new URL(source);
    return url.protocol === "https:" || (process.env.NODE_ENV !== "production" && url.protocol === "http:") ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}
