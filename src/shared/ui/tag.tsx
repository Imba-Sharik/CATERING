import * as React from "react";
import { cn } from "@/shared/lib/utils";

type TagProps = React.ComponentProps<"div"> & {
  number: string;
  label: string;
};

// Нумерованный тег: номер + подпись (24px medium).
function Tag({ number, label, className, ...props }: TagProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-6 text-lg whitespace-nowrap",
        className,
      )}
      {...props}
    >
      <span>{number}</span>
      <span>{label}</span>
    </div>
  );
}

export { Tag };
