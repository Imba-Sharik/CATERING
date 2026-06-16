import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { SectionLabel } from "@/shared/ui/section-label";
import { Reveal } from "@/shared/ui/reveal";
import { DragScroll } from "@/shared/ui/drag-scroll";
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
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-background py-section"
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
              <Reveal as="h2" className="text-h2 md:max-w-[1047px]">
                Как мы работаем
              </Reveal>
              <Reveal
                as="p"
                delay={120}
                className="max-w-[266px] text-body font-normal md:max-w-[368px]"
              >
                Даже если до события две недели — соберём сильный результат без
                потери качества
              </Reveal>
            </div>
          </div>
        </Container>

        {/* Мобайл: сетка 2 кол (в контейнере); десктоп: full-bleed карусель */}
        <DragScroll className="no-scrollbar grid grid-cols-2 gap-4 px-4 md:flex md:gap-[160px] md:overflow-x-auto md:px-0 md:pr-[max(5rem,calc((100%-1440px)/2+5rem))] md:pl-[max(5rem,calc((100%-1440px)/2+5rem))]">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 90} className="shrink-0">
              <StepCard
                number={step.number}
                title={step.title}
                step={i + 1}
                hasConnector={i < STEPS.length - 1}
              />
            </Reveal>
          ))}
        </DragScroll>
      </div>
    </section>
  );
}
