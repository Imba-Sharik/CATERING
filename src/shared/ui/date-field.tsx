"use client";

import * as React from "react";
import { format, isValid, parse } from "date-fns";
import { ru } from "date-fns/locale";

import { cn } from "@/shared/lib/utils";
import { Calendar } from "@/shared/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/popover";

const DISPLAY = "dd.MM.yyyy";

type DateFieldProps = {
  label: string;
  name?: string;
  value: string; // дата в формате dd.MM.yyyy или ""
  onValueChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
};

/**
 * Поле даты: триггер — центрированная линия как у остальных полей, по клику
 * открывается календарь (shadcn/react-day-picker, ru-локаль). Прошедшие
 * даты заблокированы. Наружу отдаём строку dd.MM.yyyy.
 */
function DateField({
  label,
  name,
  value,
  onValueChange,
  error,
  disabled,
}: DateFieldProps) {
  const [open, setOpen] = React.useState(false);
  const fieldId = React.useId();
  const errorId = error ? `${fieldId}-error` : undefined;

  const selected = React.useMemo(() => {
    if (!value) return undefined;
    const parsed = parse(value, DISPLAY, new Date());
    return isValid(parsed) ? parsed : undefined;
  }, [value]);

  // Запрет прошедших дат (сегодня доступно)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            id={fieldId}
            disabled={disabled}
            aria-describedby={errorId}
            className={cn(
              "w-40 border-b border-foreground bg-transparent pb-1 text-center text-sm outline-none focus:border-foreground disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive focus:border-destructive",
            )}
          >
            {value || " "}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="single"
            locale={ru}
            selected={selected}
            defaultMonth={selected}
            disabled={{ before: today }}
            autoFocus
            onSelect={(date) => {
              onValueChange(date ? format(date, DISPLAY) : "");
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      {/* скрытое поле — чтобы значение попадало в FormData/нативную отправку */}
      <input type="hidden" name={name} value={value} />
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

export { DateField };
