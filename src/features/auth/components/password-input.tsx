"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, "type">;

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);
    const Icon = visible ? EyeOffIcon : EyeIcon;

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={visible ? "text" : "password"}
          className={cn("pe-10", className)}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="absolute end-1 top-1/2 -translate-y-1/2"
          aria-label={visible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          onClick={() => setVisible((current) => !current)}
        >
          <Icon aria-hidden="true" />
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
