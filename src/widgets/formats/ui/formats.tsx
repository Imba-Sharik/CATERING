import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { SectionLabel } from "@/shared/ui/section-label";

type FormatCard = {
  image: string;
  title: string[];
  subtitle: string[];
  chip: string;
  /** Карточка с уже затемнённым фоном (не накладываем оверлей повторно). */
  bakedOverlay?: boolean;
};

const CARDS: FormatCard[] = [
  {
    image: "/images/formats/format-1.jpg",
    title: ["Завтрак.", "Кофе-брейк"],
    subtitle: ["Деловые форматы", "для лёгкого начала события"],
    chip: "Кофе-брейк в офис",
    bakedOverlay: true,
  },
  {
    image: "/images/formats/format-2.jpg",
    title: ["Форум.", "Гала-ужин"],
    subtitle: ["Высокая гастрономия —", "каждый штрих как часть постановки"],
    chip: "Выездной банкет",
  },
  {
    image: "/images/formats/format-3.jpg",
    title: ["Банкет.", "Фуршет"],
    subtitle: ["От закрытых ужинов до крупных", "корпоративных мероприятий"],
    chip: "Корпоративный фуршет",
  },
  {
    image: "/images/formats/format-4.jpg",
    title: ["Кейтеринг", "на свадьбу"],
    subtitle: ["Формат задаёте вы — мы собираем", "под него сервис и атмосферу"],
    chip: "Кейтеринг на свадьбу",
  },
];

function FormatCard({ card }: { card: FormatCard }) {
  return (
    <article className="relative flex h-[640px] flex-col justify-between overflow-hidden rounded-sm py-6 pr-24 pl-6">
      <Image
        src={card.image}
        alt={card.title.join(" ")}
        fill
        sizes="(max-width: 768px) 100vw, 320px"
        className="object-cover"
      />
      {!card.bakedOverlay && <div className="absolute inset-0 bg-black/50" />}

      <div className="relative flex w-[186px] flex-col gap-4">
        <h3 className="text-xl">
          {card.title.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h3>
        <p className="text-sm font-normal">
          {card.subtitle.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>

      <span className="relative inline-flex w-fit items-center rounded-lg border border-foreground px-4 py-2 text-xs whitespace-nowrap">
        {card.chip}
      </span>
    </article>
  );
}

export function Formats() {
  return (
    <section
      id="formats"
      className="flex min-h-screen flex-col justify-center bg-background py-24"
    >
      <Container className="flex flex-col gap-12">
        <SectionLabel number="03" name="ФОРМАТЫ МЕРОПРИЯТИЙ" />
        <h2 className="text-2xl">Форматы мероприятий</h2>

        <div className="grid grid-cols-4 gap-4">
          {CARDS.map((card) => (
            <FormatCard key={card.chip} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}
