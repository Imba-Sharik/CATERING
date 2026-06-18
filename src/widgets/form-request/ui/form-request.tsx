"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { SectionLabel } from "@/shared/ui/section-label";
import { Button } from "@/shared/ui/button";
import { Field } from "@/shared/ui/field";
import { PhoneField } from "@/shared/ui/phone-field";
import { Chip } from "@/shared/ui/chip";
import { Reveal } from "@/shared/ui/reveal";
import { cn } from "@/shared/lib/utils";
import { isValidPhone } from "@/shared/lib/phone";
import { FORMAT_EVENT } from "@/shared/lib/format-request";
import { submitRequest } from "@/features/submit-request";
import type { RequestFormPayload } from "@/shared/lib/mail/types";

const FIELDS = [
  "Имя",
  "Телефон",
  "Дата события",
  "Количество гостей",
  "Формат",
  "Комментарий",
] as const;

const OPTIONS = [
  "Кофе-брейк в офис",
  "Выездной банкет",
  "Корпоративный банкет",
  "Кейтеринг на свадьбу",
];

const EMPTY_FORM: RequestFormPayload = {
  name: "",
  phone: "",
  eventDate: "",
  guests: "",
  format: "",
  comment: "",
};

const FIELD_KEYS: Record<(typeof FIELDS)[number], keyof RequestFormPayload> = {
  Имя: "name",
  Телефон: "phone",
  "Дата события": "eventDate",
  "Количество гостей": "guests",
  Формат: "format",
  Комментарий: "comment",
};

// Явная заливка выбранного чипа (видно и на мобайле, где нет поля «Формат»).
const CHIP_ACTIVE = "bg-foreground text-background hover:bg-foreground";

export function FormRequest() {
  const [form, setForm] = React.useState<RequestFormPayload>(EMPTY_FORM);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");

  React.useEffect(() => {
    function onSelect(e: Event) {
      setForm((prev) => ({ ...prev, format: (e as CustomEvent<string>).detail }));
    }
    window.addEventListener(FORMAT_EVENT, onSelect);
    return () => window.removeEventListener(FORMAT_EVENT, onSelect);
  }, []);

  function updateField(key: keyof RequestFormPayload, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "phone") setPhoneError("");
    if (status !== "idle") {
      setStatus("idle");
      setErrorMessage("");
    }
  }

  function validatePhone() {
    setPhoneError(
      form.phone && !isValidPhone(form.phone) ? "Введите номер полностью" : "",
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidPhone(form.phone)) {
      setPhoneError("Введите корректный номер телефона");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const result = await submitRequest(form);

    if (result.ok) {
      setForm(EMPTY_FORM);
      setStatus("success");
      return;
    }

    setStatus("error");
    setErrorMessage(result.error);
  }

  function renderField(label: (typeof FIELDS)[number]) {
    const key = FIELD_KEYS[label];

    if (key === "phone") {
      return (
        <PhoneField
          key={label}
          label={label}
          name={key}
          value={form.phone}
          onValueChange={(v) => updateField("phone", v)}
          onBlur={validatePhone}
          error={phoneError}
          required
          disabled={status === "loading"}
        />
      );
    }

    return (
      <Field
        key={label}
        label={label}
        name={key}
        value={form[key]}
        onChange={(e) => updateField(key, e.target.value)}
        required={key !== "format" && key !== "comment"}
        disabled={status === "loading"}
      />
    );
  }

  return (
    <section
      id="form"
      className="flex min-h-screen flex-col justify-center bg-background py-section"
    >
      <Container className="flex flex-col items-start gap-8 md:gap-20">
        <Reveal>
          <SectionLabel number="09" name="ФОРМА ЗАЯВКИ" />
        </Reveal>

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-[993px] flex-col items-center gap-8 md:gap-12"
        >
          <div className="flex w-full flex-col items-center gap-6 md:gap-8">
            <Reveal as="p" className="text-center text-body font-normal">
              Расскажите нам о вашем событии
            </Reveal>

            <Reveal delay={100} className="flex items-center justify-center gap-8">
              <Image
                src="/images/form/deco-left.svg"
                alt=""
                width={154}
                height={75}
                unoptimized
                className="hidden h-[75px] w-[154px] shrink-0 lg:block"
              />
              <h2 className="max-w-[266px] text-center text-h2 md:max-w-[685px]">
                Получите расчёт стоимости{" "}
                <span className="hidden md:inline">кейтеринга </span>в течение
                рабочего дня
              </h2>
              <Image
                src="/images/form/deco-right.svg"
                alt=""
                width={154}
                height={75}
                unoptimized
                className="hidden h-[75px] w-[154px] shrink-0 lg:block"
              />
            </Reveal>

            <Reveal
              as="div"
              delay={200}
              className="flex flex-col items-center gap-2 text-center text-sm"
            >
              <p className="max-w-[193px]">
                Дегустация при подтверждении — бесплатно. Работаем в Москве,
                Московской области
              </p>
              <p>info@lofthall.ru</p>
            </Reveal>
          </div>

          {/* Мобайл: поля в столбик, «Формат» + чипы между ними */}
          <Reveal as="div" className="flex w-full flex-col gap-8 md:hidden">
            {renderField("Имя")}
            {renderField("Телефон")}
            {renderField("Дата события")}
            {renderField("Количество гостей")}

            <div className="flex w-full flex-col items-center gap-4">
              <Field
                label="Формат"
                name="format"
                value={form.format}
                onChange={(e) => updateField("format", e.target.value)}
                disabled={status === "loading"}
              />
              <div className="grid w-fit grid-cols-2 gap-2">
                {OPTIONS.map((option) => (
                  <Chip
                    key={option}
                    type="button"
                    aria-pressed={form.format === option}
                    onClick={() =>
                      updateField(
                        "format",
                        form.format === option ? "" : option,
                      )
                    }
                    disabled={status === "loading"}
                    className={cn(
                      "w-full",
                      form.format === option && CHIP_ACTIVE,
                    )}
                  >
                    {option}
                  </Chip>
                ))}
              </div>
            </div>

            {renderField("Комментарий")}
          </Reveal>

          {/* Десктоп: сетка полей 3×2 + чипы */}
          <Reveal
            as="div"
            className="hidden w-full max-w-[608px] flex-col items-center gap-6 md:flex"
          >
            <div className="grid w-full grid-cols-3 gap-x-16 gap-y-12">
              {FIELDS.map((label) => renderField(label))}
            </div>
            <div className="grid w-fit grid-cols-2 gap-3">
              {OPTIONS.map((option) => (
                <Chip
                  key={option}
                  type="button"
                  aria-pressed={form.format === option}
                  onClick={() =>
                    updateField(
                      "format",
                      form.format === option ? "" : option,
                    )
                  }
                  disabled={status === "loading"}
                  className={cn(
                    "w-full",
                    form.format === option && CHIP_ACTIVE,
                  )}
                >
                  {option}
                </Chip>
              ))}
            </div>
          </Reveal>

          <Reveal as="div" className="flex flex-col items-center gap-3">
            <Button
              type="submit"
              variant="outline"
              disabled={status === "loading"}
              className="h-[36px] rounded-lg px-6 py-2 text-sm md:h-[48px] md:rounded-md md:px-8 md:text-base"
            >
              {status === "loading" ? "Отправка…" : "Отправить заявку"}
            </Button>

            {status === "success" && (
              <p className="text-center text-sm text-foreground">
                Заявка отправлена. Мы свяжемся с вами в ближайшее время.
              </p>
            )}
            {status === "error" && (
              <p className="max-w-sm text-center text-sm text-destructive">
                {errorMessage}
              </p>
            )}
          </Reveal>

          <div className="flex w-full flex-col items-center gap-1 text-center text-sm text-muted-foreground">
            <p>Или позвоните нам (Москва)</p>
            <p>+7 (966) 195-02-25</p>
          </div>
        </form>
      </Container>
    </section>
  );
}
