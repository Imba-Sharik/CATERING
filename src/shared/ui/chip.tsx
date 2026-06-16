import * as React from "react";
import { cn } from "@/shared/lib/utils";

// Чип-выбор: обведённая «таблетка» с подписью (8px medium).
function Chip({
  className,
  type = "button",
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border border-foreground px-4 py-2 text-center text-xs whitespace-nowrap transition-colors hover:bg-foreground/10",
        className,
      )}
      {...props}
    />
  );
}

export { Chip };
