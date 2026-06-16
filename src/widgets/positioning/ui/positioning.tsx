import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { SectionLabel } from "@/shared/ui/section-label";
import { Tag } from "@/shared/ui/tag";

const TAGS = [
  { number: "01", label: "Темп подачи" },
  { number: "02", label: "Ритм сервиса" },
  { number: "03", label: "Визуальная эстетика" },
  { number: "04", label: "Эмоции" },
] as const;

export function Positioning() {
  return (
    <section className="flex min-h-screen flex-col justify-center bg-background py-section">
      <Container className="flex flex-col gap-8 md:gap-12">
        <SectionLabel number="02" name="ПОЗИЦИОНИРОВАНИЕ" />

        <h2 className="text-h2 md:max-w-[990px]">
          Как режиссёр выстраивает сцену — мы выстраиваем гастрономическую
          историю вашего вечера
        </h2>

        <div className="relative aspect-[358/269] w-full overflow-hidden rounded-sm md:aspect-[1280/463]">
          <Image
            src="/images/positioning/positioning.jpg"
            alt="Кейтеринг на открытой площадке у воды"
            fill
            quality={85}
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:flex-wrap md:items-center md:gap-x-[120px] md:gap-y-6">
          {TAGS.map((tag) => (
            <Tag key={tag.number} number={tag.number} label={tag.label} />
          ))}
        </div>
      </Container>
    </section>
  );
}
