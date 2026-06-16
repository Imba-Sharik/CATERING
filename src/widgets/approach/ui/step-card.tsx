import Image from "next/image";
import { cn } from "@/shared/lib/utils";

type StepCardProps = {
  number: string;
  title: string;
  /** Порядковый шаг (1–7) — сколько сегментов прогресса залито. */
  step: number;
  /** Показывать стрелку-коннектор к следующему шагу. */
  hasConnector?: boolean;
};

function StepProgress({ step }: { step: number }) {
  return (
    <div className="absolute top-[377px] left-[25px] flex gap-px">
      {Array.from({ length: step }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-[21px] w-7 bg-foreground",
            step === 1
              ? "rounded-full"
              : i === 0
                ? "rounded-l-full"
                : i === step - 1
                  ? "rounded-r-full"
                  : "rounded-none",
          )}
        />
      ))}
    </div>
  );
}

export function StepCard({ number, title, step, hasConnector }: StepCardProps) {
  return (
    <article className="relative h-[420px] w-[255px] shrink-0 rounded-md border border-foreground bg-card backdrop-blur-sm">
      <span className="absolute top-[50px] left-1/2 -translate-x-1/2 text-4xl leading-[143px]">
        {number}
      </span>
      <span className="absolute top-[260px] left-1/2 w-[205px] -translate-x-1/2 text-center text-lg">
        {title}
      </span>
      <StepProgress step={step} />

      {hasConnector && (
        <Image
          src="/images/arrow.svg"
          alt=""
          width={53}
          height={15}
          unoptimized
          className="absolute top-[207px] left-[309px] w-[53px]"
        />
      )}
    </article>
  );
}
