import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { SectionLabel } from "@/shared/ui/section-label";

const STEPS = [
  { number: "01", title: "Получаем запрос" },
  { number: "02", title: "Предлагаем меню" },
  { number: "03", title: "Проводим дегустацию" },
  { number: "04", title: "Формируем предложение" },
  { number: "05", title: "Выезжаем на объект" },
  { number: "06", title: "Собираем команду" },
  { number: "07", title: "Проводим событие" },
] as const;

function StepProgress({ step }: { step: number }) {
  return (
    <div className="absolute top-[377px] left-[25px] flex gap-px">
      {Array.from({ length: step }).map((_, i) => (
        <span key={i} className="h-[21px] w-7 rounded-[10px] bg-foreground" />
      ))}
    </div>
  );
}

export function Approach() {
  return (
    <section
      id="approach"
      className="relative overflow-hidden bg-background py-24"
    >
      <Image
        src="/images/approach-bg.webp"
        alt=""
        fill
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
            <article
              key={step.number}
              className="relative h-[420px] w-[255px] shrink-0 rounded-md border border-foreground bg-card backdrop-blur-sm"
            >
              <span className="absolute top-[50px] left-1/2 -translate-x-1/2 text-4xl leading-[143px]">
                {step.number}
              </span>
              <span className="absolute top-[260px] left-1/2 w-[205px] -translate-x-1/2 text-center text-lg">
                {step.title}
              </span>
              <StepProgress step={i + 1} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
