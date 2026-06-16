import * as React from "react";
import { cn } from "@/shared/lib/utils";

type SectionLabelProps = React.ComponentProps<"div"> & {
  number: string;
  name: string;
};

// Метка секции: порядковый номер + название мелким капслоком (8px).
function SectionLabel({ number, name, className, ...props }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-16 text-xs font-normal whitespace-nowrap",
        className,
      )}
      {...props}
    >
      <span>{number}</span>
      <span>{name}</span>
    </div>
  );
}

export { SectionLabel };
