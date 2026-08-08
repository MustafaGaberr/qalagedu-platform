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

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src={logoSrc}
        alt={appConfig.center.logo.alt}
        width={appConfig.center.logo.width}
        height={appConfig.center.logo.height}
        priority
        className={styles.mark}
        unoptimized={logoSrc.startsWith("http")}
      />
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
