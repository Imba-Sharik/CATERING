import * as React from "react";
import { cn } from "@/shared/lib/utils";

type FieldProps = React.ComponentProps<"input"> & {
  label: string;
  error?: string;
};

// Поле формы: линия-инпут сверху + подпись снизу по центру.
function Field({ label, className, id, error, ...props }: FieldProps) {
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  const errorId = error ? `${fieldId}-error` : undefined;
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <input
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          "w-40 border-b border-foreground bg-transparent pb-1 text-center text-sm outline-none placeholder:text-muted-foreground focus:border-foreground",
          error && "border-destructive focus:border-destructive",
          className,
        )}
        {...props}
      />
      <label htmlFor={fieldId} className="text-center text-sm">
        {label}
      </label>
      {error && (
        <p id={errorId} className="text-center text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export { Field };
