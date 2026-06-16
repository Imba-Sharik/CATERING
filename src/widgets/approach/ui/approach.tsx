import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { SectionLabel } from "@/shared/ui/section-label";
import { StepCard } from "./step-card";

const STEPS = [
  { number: "01", title: "Получаем запрос" },
  { number: "02", title: "Предлагаем меню" },
  { number: "03", title: "Проводим дегустацию" },
  { number: "04", title: "Формируем предложение" },
  { number: "05", title: "Выезжаем на объект" },
  { number: "06", title: "Собираем команду" },
  { number: "07", title: "Проводим событие" },
] as const;

export function Approach() {
  return (
    <section
      id="approach"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background py-14 md:py-24"
    >
      <Image
        src="/images/approach/approach-bg.jpg"
        alt=""
        fill
        quality={85}
        sizes="100vw"
        className="pointer-events-none object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative flex flex-col gap-8 md:gap-20">
        <Container>
          <div className="flex flex-col gap-8">
            <SectionLabel
              number="08"
              name="НАШ ПОДХОД"
              className="hidden md:flex"
            />
            <SectionLabel
              number="08"
              name="КАК МЫ РАБОТАЕМ"
              className="flex md:hidden"
            />
            <div className="flex flex-col gap-6 md:gap-8">
              <h2 className="text-xl md:max-w-[1047px] md:text-2xl">
                Как мы работаем
              </h2>
              <p className="max-w-[266px] text-sm font-normal md:max-w-[368px] md:text-base">
                Даже если до события две недели — соберём сильный результат без
                потери качества
              </p>
            </div>
          </div>
        </Container>

        {/* Мобайл: сетка 2 кол (в контейнере); десктоп: full-bleed карусель */}
        <div className="no-scrollbar grid grid-cols-2 gap-4 px-4 md:flex md:gap-[160px] md:overflow-x-auto md:px-0 md:pr-[max(5rem,calc((100%-1440px)/2+5rem))] md:pl-[max(5rem,calc((100%-1440px)/2+5rem))]">
          {STEPS.map((step, i) => (
            <StepCard
              key={step.number}
              number={step.number}
              title={step.title}
              step={i + 1}
              hasConnector={i < STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
