import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { SectionLabel } from "@/shared/ui/section-label";
import { Button } from "@/shared/ui/button";

const CARDS = [
  { image: "/images/price-1.webp", title: "Завтрак", price: "от 1 500 ₽" },
  { image: "/images/price-2.webp", title: "Кофе-брейк", price: "от 1 100 ₽" },
  { image: "/images/price-3.webp", title: "Обед", price: "от 2 000 ₽" },
  { image: "/images/price-4.webp", title: "Фуршет", price: "от 4 500 ₽" },
  { image: "/images/price-5.webp", title: "Банкет", price: "от 7 500 ₽" },
  {
    image: "/images/price-6.webp",
    title: "Гала-ужин",
    price: "Рассчитывается индивидуально",
  },
] as const;

export function Prices() {
  return (
    <section
      id="prices"
      className="flex min-h-screen flex-col justify-center bg-background py-24"
    >
      <Container className="flex flex-col gap-12">
        <SectionLabel number="07" name="ЦЕНЫ" />

        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl">
            Стоимость
            <br />
            кейтеринга в Москве
          </h2>
          <p className="max-w-[255px] rounded-md border border-muted-foreground px-6 py-4 text-sm font-normal text-muted-foreground">
            Сервис: +20% от стоимости меню
            <br />
            <br />
            Дегустация при подтверждении сотрудничества — бесплатно
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-3 gap-4">
            {CARDS.map((card) => (
              <article
                key={card.title}
                className="relative flex items-start overflow-hidden rounded-md border border-foreground py-6 pr-[200px] pl-8"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative flex w-[337px] flex-col gap-24">
                  <h3 className="w-[210px] text-xl">{card.title}</h3>
                  <p className="w-[203px] text-base font-normal text-muted-foreground">
                    {card.price}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <Button variant="outline" className="w-fit">
            Отправить заявку
          </Button>
        </div>
      </Container>
    </section>
  );
}
