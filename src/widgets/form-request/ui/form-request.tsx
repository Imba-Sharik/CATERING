"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { SectionLabel } from "@/shared/ui/section-label";
import { Button } from "@/shared/ui/button";
import { Field } from "@/shared/ui/field";
import { Chip } from "@/shared/ui/chip";
import { Reveal } from "@/shared/ui/reveal";
import { cn } from "@/shared/lib/utils";
import { FORMAT_EVENT } from "@/shared/lib/format-request";

const FIELDS = [
  "Имя",
  "Телефон",
  "Дата события",
  "Количество гостей",
  "Формат",
  "Комментарий",
];

const OPTIONS = [
  "Кофе-брейк в офис",
  "Выездной банкет",
  "Корпоративный банкет",
  "Кейтеринг на свадьбу",
];

// Явная заливка выбранного чипа (видно и на мобайле, где нет поля «Формат»).
const CHIP_ACTIVE = "bg-foreground text-background hover:bg-foreground";

export function FormRequest() {
  const [format, setFormat] = React.useState("");

  React.useEffect(() => {
    function onSelect(e: Event) {
      setFormat((e as CustomEvent<string>).detail);
    }
    window.addEventListener(FORMAT_EVENT, onSelect);
    return () => window.removeEventListener(FORMAT_EVENT, onSelect);
  }, []);

  return (
    <section
      id="form"
      className="flex min-h-screen flex-col justify-center bg-background py-section"
    >
      <Container className="flex flex-col items-start gap-8 md:gap-20">
        <Reveal>
          <SectionLabel number="09" name="ФОРМА ЗАЯВКИ" />
        </Reveal>

        <form className="mx-auto flex w-full max-w-[993px] flex-col items-center gap-8 md:gap-12">
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
            <Field label="Имя" />
            <Field label="Телефон" />
            <Field label="Дата события" />
            <Field label="Количество гостей" />

            <div className="flex w-full flex-col items-center gap-4">
              <Field
                label="Формат"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
              />
              <div className="grid w-fit grid-cols-2 gap-2">
                {OPTIONS.map((option) => (
                  <Chip
                    key={option}
                    aria-pressed={format === option}
                    onClick={() =>
                      setFormat((prev) => (prev === option ? "" : option))
                    }
                    className={cn("w-full", format === option && CHIP_ACTIVE)}
                  >
                    {option}
                  </Chip>
                ))}
              </div>
            </div>

            <Field label="Комментарий" />
          </Reveal>

          {/* Десктоп: сетка полей 3×2 + чипы */}
          <Reveal
            as="div"
            className="hidden w-full max-w-[608px] flex-col items-center gap-6 md:flex"
          >
            <div className="grid w-full grid-cols-3 gap-x-16 gap-y-12">
              {FIELDS.map((label) =>
                label === "Формат" ? (
                  <Field
                    key={label}
                    label={label}
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                  />
                ) : (
                  <Field key={label} label={label} />
                ),
              )}
            </div>
            <div className="grid w-fit grid-cols-2 gap-3">
              {OPTIONS.map((option) => (
                <Chip
                  key={option}
                  aria-pressed={format === option}
                  onClick={() =>
                    setFormat((prev) => (prev === option ? "" : option))
                  }
                  className={cn("w-full", format === option && CHIP_ACTIVE)}
                >
                  {option}
                </Chip>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <Button
              type="button"
              variant="outline"
              className="h-[36px] rounded-lg px-6 py-2 text-sm md:h-[48px] md:rounded-md md:px-8 md:text-base"
            >
              Отправить заявку
            </Button>
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
