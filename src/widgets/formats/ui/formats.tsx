import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { SectionLabel } from "@/shared/ui/section-label";

type FormatCard = {
  image: string;
  title: string;
  subtitle: string;
  chip: string;
  /** Карточка с уже затемнённым фоном (не накладываем оверлей повторно). */
  bakedOverlay?: boolean;
};

const CARDS: FormatCard[] = [
  {
    image: "/images/formats/format-1.jpg",
    title: "Завтрак. Кофе-брейк",
    subtitle: "Деловые форматы для лёгкого начала события",
    chip: "Кофе-брейк в офис",
    bakedOverlay: true,
  },
  {
    image: "/images/formats/format-2.jpg",
    title: "Форум. Гала-ужин",
    subtitle: "Высокая гастрономия — каждый штрих как часть постановки",
    chip: "Выездной банкет",
  },
  {
    image: "/images/formats/format-3.jpg",
    title: "Банкет. Фуршет",
    subtitle: "От закрытых ужинов до крупных корпоративных мероприятий",
    chip: "Корпоративный фуршет",
  },
  {
    image: "/images/formats/format-4.jpg",
    title: "Кейтеринг на свадьбу",
    subtitle: "Формат задаёте вы — мы собираем под него сервис и атмосферу",
    chip: "Кейтеринг на свадьбу",
  },
];

function FormatCard({ card }: { card: FormatCard }) {
  return (
    <article className="relative h-[141px] overflow-hidden rounded-sm p-4 md:h-[640px] md:py-6 md:pr-24 md:pl-6">
      <Image
        src={card.image}
        alt={card.title}
        fill
        sizes="(max-width: 768px) 100vw, 320px"
        className="object-cover"
      />
      {!card.bakedOverlay && <div className="absolute inset-0 bg-black/50" />}

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex w-full flex-col gap-2 md:w-[186px] md:gap-4">
          <h3 className="text-lg md:text-xl">{card.title}</h3>
          <p className="text-xs font-normal md:text-sm">{card.subtitle}</p>
        </div>
        <span className="inline-flex w-fit items-center rounded-lg border border-foreground px-4 py-2 text-xs whitespace-nowrap">
          {card.chip}
        </span>
      </div>
    </article>
  );
}

export function Formats() {
  return (
    <section
      id="formats"
      className="flex min-h-screen flex-col justify-center bg-background py-14 md:py-24"
    >
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-8 md:gap-12">
          <SectionLabel number="03" name="ФОРМАТЫ МЕРОПРИЯТИЙ" />
          <h2 className="text-xl md:text-2xl">Форматы мероприятий</h2>
        </div>

        <div className="flex flex-col gap-4 md:grid md:grid-cols-4">
          {CARDS.map((card) => (
            <FormatCard key={card.chip} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}
