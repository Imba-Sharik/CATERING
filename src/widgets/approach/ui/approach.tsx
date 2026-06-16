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
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background py-24"
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

      <div className="relative flex flex-col gap-20">
        <Container>
          <div className="flex flex-col gap-8">
            <SectionLabel number="08" name="НАШ ПОДХОД" />
            <h2 className="max-w-[1047px] text-2xl">Как мы работаем</h2>
            <p className="max-w-[368px] text-base font-normal">
              Даже если до события две недели — соберём сильный результат без
              потери качества
            </p>
          </div>
        </Container>

        {/* Лента на всю ширину экрана: клип по краям экрана (скролл доходит до
            обоих краёв), а первая карточка стартует от линии заголовка —
            left-паддинг повторяет левый край контейнера (max-w 1440 + гаттер). */}
        <div className="no-scrollbar flex gap-[160px] overflow-x-auto pl-[max(1rem,calc((100%-1440px)/2+1rem))] pr-[max(1rem,calc((100%-1440px)/2+1rem))] md:pl-[max(5rem,calc((100%-1440px)/2+5rem))] md:pr-[max(5rem,calc((100%-1440px)/2+5rem))]">
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
