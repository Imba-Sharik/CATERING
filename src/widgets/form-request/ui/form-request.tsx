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
      className="flex min-h-screen flex-col justify-center bg-background py-24"
    >
      <Container className="flex flex-col items-start gap-20">
        <SectionLabel number="09" name="ФОРМА ЗАЯВКИ" />

        <form className="mx-auto flex w-full max-w-[993px] flex-col items-center gap-12">
          <div className="flex w-full flex-col items-center gap-8">
            <p className="text-center text-base font-normal">
              Расскажите нам о вашем событии
            </p>

            <div className="flex items-center justify-center gap-8">
              <Image
                src="/images/deco-left.svg"
                alt=""
                width={154}
                height={75}
                unoptimized
                className="hidden h-[75px] w-[154px] shrink-0 lg:block"
              />
              <h2 className="max-w-[685px] text-center text-2xl">
                Получите расчёт стоимости кейтеринга в течение рабочего дня
              </h2>
              <Image
                src="/images/deco-right.svg"
                alt=""
                width={154}
                height={75}
                unoptimized
                className="hidden h-[75px] w-[154px] shrink-0 lg:block"
              />
            </div>

            <div className="flex flex-col items-center gap-2 text-center text-xs">
              <p className="max-w-[187px]">
                Дегустация при подтверждении — бесплатно. Работаем в Москве,
                Московской области
              </p>
              <p>info@lofthall.ru</p>
            </div>
          </div>

          <div className="flex w-full max-w-[608px] flex-col items-center gap-6">
            <div className="grid w-full grid-cols-1 gap-x-16 gap-y-12 sm:grid-cols-3">
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

          <Button type="button" variant="outline">
            Отправить заявку
          </Button>

          <div className="flex flex-col items-center gap-1 text-center text-sm text-muted-foreground">
            <p>Или позвоните нам (Москва)</p>
            <p>+7 (966) 195-02-25</p>
          </div>
        </form>
      </Container>
    </section>
  );
}
