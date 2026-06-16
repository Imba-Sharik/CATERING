import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { SectionLabel } from "@/shared/ui/section-label";
import { Button } from "@/shared/ui/button";
import { Field } from "@/shared/ui/field";
import { Chip } from "@/shared/ui/chip";

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

export function FormRequest() {
  return (
    <section
      id="form"
      className="flex min-h-screen flex-col justify-center bg-background py-14 md:py-24"
    >
      <Container className="flex flex-col items-start gap-8 md:gap-20">
        <SectionLabel number="09" name="ФОРМА ЗАЯВКИ" />

        <form className="mx-auto flex w-full max-w-[993px] flex-col items-center gap-8 md:gap-12">
          <div className="flex w-full flex-col items-center gap-6 md:gap-8">
            <p className="text-center text-sm font-normal md:text-base">
              Расскажите нам о вашем событии
            </p>

            <div className="flex items-center justify-center gap-8">
              <Image
                src="/images/form/deco-left.svg"
                alt=""
                width={154}
                height={75}
                unoptimized
                className="hidden h-[75px] w-[154px] shrink-0 lg:block"
              />
              <h2 className="max-w-[266px] text-center text-xl md:max-w-[685px] md:text-2xl">
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
            </div>

            <div className="flex flex-col items-center gap-2 text-center text-xs">
              <p className="max-w-[193px]">
                Дегустация при подтверждении — бесплатно. Работаем в Москве,
                Московской области
              </p>
              <p>info@lofthall.ru</p>
            </div>
          </div>

          {/* Мобайл: поля в столбик, «Формат» + чипы между ними */}
          <div className="flex w-full flex-col gap-8 md:hidden">
            <Field label="Имя" />
            <Field label="Телефон" />
            <Field label="Дата события" />
            <Field label="Количество гостей" />

            <div className="flex w-full flex-col items-center gap-4">
              <div className="flex w-full flex-col items-center gap-3">
                <div className="w-[160px] border-t border-foreground" />
                <span className="text-sm">Формат</span>
              </div>
              <div className="grid w-fit grid-cols-2 gap-2">
                {OPTIONS.map((option) => (
                  <Chip key={option} className="w-full">
                    {option}
                  </Chip>
                ))}
              </div>
            </div>

            <Field label="Комментарий" />
          </div>

          {/* Десктоп: сетка полей 3×2 + чипы */}
          <div className="hidden w-full max-w-[608px] flex-col items-center gap-6 md:flex">
            <div className="grid w-full grid-cols-3 gap-x-16 gap-y-12">
              {FIELDS.map((label) => (
                <Field key={label} label={label} />
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {OPTIONS.map((option) => (
                <Chip key={option}>{option}</Chip>
              ))}
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-[25px] rounded-lg px-4 py-2 text-[8px] md:h-[38px] md:rounded-md md:px-6 md:text-sm"
          >
            Отправить заявку
          </Button>

          <div className="flex w-full flex-col items-center gap-1 text-center text-sm text-muted-foreground">
            <p>Или позвоните нам (Москва)</p>
            <p>+7 (966) 195-02-25</p>
          </div>
        </form>
      </Container>
    </section>
  );
}
