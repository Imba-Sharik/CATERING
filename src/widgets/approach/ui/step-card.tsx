import Image from "next/image";
import { cn } from "@/shared/lib/utils";

type StepCardProps = {
  number: string;
  title: string;
  /** Порядковый шаг (1–7) — сколько сегментов прогресса залито. */
  step: number;
  /** Показывать стрелку-коннектор к следующему шагу (только десктоп). */
  hasConnector?: boolean;
};

// Прогресс из 7 слотов на всю ширину карточки: первые `step` залиты, остальные
// прозрачны. Сегменты резиновые (flex-1) — не вылезают на любой ширине.
function StepProgress({ step }: { step: number }) {
  return (
    <div className="flex w-full gap-px">
      {Array.from({ length: 7 }).map((_, i) => {
        const filled = i < step;
        return (
          <span
            key={i}
            className={cn(
              "h-3 flex-1 md:h-[21px]",
              filled ? "bg-foreground" : "bg-transparent",
              filled &&
                (step === 1
                  ? "rounded-full"
                  : i === 0
                    ? "rounded-l-full"
                    : i === step - 1
                      ? "rounded-r-full"
                      : "rounded-none"),
            )}
          />
        );
      })}
    </div>
  );
}

export function StepCard({ number, title, step, hasConnector }: StepCardProps) {
  return (
    <article className="relative flex h-[215px] w-full shrink-0 flex-col items-center rounded-md border border-foreground bg-card px-4 py-4 backdrop-blur-sm md:h-[420px] md:w-[255px] md:px-[25px] md:py-[50px]">
      <span className="text-3xl leading-[85px] md:text-4xl md:leading-[143px]">
        {number}
      </span>
      <span className="my-auto text-center text-[14px] md:text-lg">{title}</span>
      <StepProgress step={step} />

      {hasConnector && (
        <Image
          src="/images/approach/arrow.svg"
          alt=""
          width={53}
          height={15}
          unoptimized
          className="absolute top-[207px] left-[309px] hidden w-[53px] md:block"
        />
      )}
    </article>
  );
}
