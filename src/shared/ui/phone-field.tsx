import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { Field } from "./field";
import { formatPhone } from "@/shared/lib/phone";

type PhoneFieldProps = Omit<
  React.ComponentProps<typeof Field>,
  "onChange" | "type"
> & {
  onValueChange: (value: string) => void;
};

/**
 * Телефон — тонкая обёртка над центрированным Field: только автоформат
 * ввода в маску +7 (495) 123-45-67. Никаких оверлеев — выделение, каретка
 * и выравнивание работают штатно, дизайн идентичен остальным полям.
 */
function PhoneField({
  onValueChange,
  value,
  className,
  ...props
}: PhoneFieldProps) {
  return (
    <Field
      {...props}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      maxLength={18}
      className={cn("w-48", className)}
      value={value ?? ""}
      onChange={(e) => onValueChange(formatPhone(e.target.value))}
    />
  );
}

export { PhoneField };
