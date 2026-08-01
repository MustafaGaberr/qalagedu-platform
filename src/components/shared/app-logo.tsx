import Image from "next/image";

import { appConfig } from "@/config/app";
import { cn } from "@/lib/utils";

type AppLogoProps = {
  className?: string;
  showText?: boolean;
};

export function AppLogo({ className, showText = true }: AppLogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src={appConfig.center.logo.src}
        alt={appConfig.center.logo.alt}
        width={appConfig.center.logo.width}
        height={appConfig.center.logo.height}
        priority
        className="size-10 rounded-lg"
      />
      {showText ? (
        <div className="flex flex-col text-start">
          <span className="text-sm font-semibold leading-5 text-foreground">
            {appConfig.shortName}
          </span>
          <span className="text-xs leading-4 text-muted-foreground">
            {appConfig.center.name}
          </span>
        </div>
      ) : null}
    </div>
  );
}
