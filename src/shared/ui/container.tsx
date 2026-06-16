import * as React from "react";
import { cn } from "@/shared/lib/utils";

// Контейнер контента: 1280px по центру, гаттеры 80px на десктопе (16px на мобиле).
function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1440px] px-4 md:px-20", className)}
      {...props}
    />
  );
}

export { Container };
