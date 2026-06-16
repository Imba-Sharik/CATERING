import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { SectionLabel } from "@/shared/ui/section-label";
import { Button } from "@/shared/ui/button";

const CARDS = [
  { image: "/images/prices/price-1.jpg", title: "Завтрак", price: "от 1 500 ₽" },
  { image: "/images/prices/price-2.jpg", title: "Кофе-брейк", price: "от 1 100 ₽" },
  { image: "/images/prices/price-3.jpg", title: "Обед", price: "от 2 000 ₽" },
  { image: "/images/prices/price-4.jpg", title: "Фуршет", price: "от 4 500 ₽" },
  { image: "/images/prices/price-5.jpg", title: "Банкет", price: "от 7 500 ₽" },
  {
    image: "/images/prices/price-6.jpg",
    title: "Гала-ужин",
    price: "Рассчитывается индивидуально",
  },
] as const;

function PriceCard({ card }: { card: (typeof CARDS)[number] }) {
  return (
    <article className="relative h-[101px] overflow-hidden rounded-md border border-foreground p-4 md:h-auto md:py-6 md:pr-[200px] md:pl-8">
      <Image
        src={card.image}
        alt={card.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 420px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative flex h-full flex-col justify-between md:h-auto md:w-[337px] md:justify-start md:gap-24">
        <h3 className="text-h3 md:w-[210px]">{card.title}</h3>
        <p className="text-xs font-normal text-muted-foreground md:w-[203px] md:text-base">
          {card.price}
        </p>
      </div>
    </article>
  );
}

export function Prices() {
  return (
    <section
      id="prices"
      className="flex min-h-screen flex-col justify-center bg-background py-section"
    >
      <Container className="flex flex-col gap-8 md:gap-12">
        <SectionLabel number="07" name="ЦЕНЫ" />

        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="text-h2">Стоимость кейтеринга в Москве</h2>
          <p className="h-[64px] w-[171px] rounded-sm border border-muted-foreground px-3 py-3 text-xs font-normal text-muted-foreground md:h-auto md:w-auto md:max-w-[255px] md:rounded-md md:px-6 md:py-4 md:text-sm">
            Сервис: +20% от стоимости меню
            <br className="hidden md:inline" />
            <br className="hidden md:inline" /> Дегустация при подтверждении
            сотрудничества — бесплатно
          </p>
        </div>

        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((card) => (
              <PriceCard key={card.title} card={card} />
            ))}
          </div>

          <Button
            variant="outline"
            className="h-[25px] w-fit rounded-lg px-4 py-2 text-[8px] md:h-[38px] md:rounded-md md:px-6 md:text-sm"
          >
            Отправить заявку
          </Button>
        </div>
      </Container>
    </section>
  );
}
