import * as React from "react";
import { cn } from "@/shared/lib/utils";

type StatProps = React.ComponentProps<"div"> & {
  value: string;
  caption: string;
};

// Крупная цифра-показатель + подпись.
function Stat({ value, caption, className, ...props }: StatProps) {
  return (
    <div
      className={cn("flex flex-col gap-4 whitespace-nowrap", className)}
      {...props}
    >
      <span className="text-3xl md:text-4xl">{value}</span>
      <span className="text-sm font-normal text-muted-foreground md:text-base">
        {caption}
      </span>
    </div>
  );
}

export { Stat };
