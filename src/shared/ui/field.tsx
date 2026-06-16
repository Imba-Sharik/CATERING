import * as React from "react";
import { cn } from "@/shared/lib/utils";

type FieldProps = React.ComponentProps<"input"> & {
  label: string;
};

// Поле формы: линия-инпут сверху + подпись снизу по центру.
function Field({ label, className, id, ...props }: FieldProps) {
  const fieldId = id ?? React.useId();
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <input
        id={fieldId}
        className={cn(
          "w-full border-b border-foreground bg-transparent pb-1 text-center text-sm outline-none placeholder:text-muted-foreground focus:border-foreground",
          className,
        )}
        {...props}
      />
      <label htmlFor={fieldId} className="text-center text-sm">
        {label}
      </label>
    </div>
  );
}

export { Field };
