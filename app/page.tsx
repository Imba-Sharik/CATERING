import { Hero } from "@/widgets/hero";
import { Numbers } from "@/widgets/numbers";
import { Positioning } from "@/widgets/positioning";
import { Formats } from "@/widgets/formats";
import { Additions } from "@/widgets/additions";
import { Service } from "@/widgets/service";
import { Decor } from "@/widgets/decor";
import { Prices } from "@/widgets/prices";
import { Approach } from "@/widgets/approach";
import { FormRequest } from "@/widgets/form-request";
import { SiteFooter } from "@/widgets/site-footer";

export default function Page() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Numbers />
      <Positioning />
      <Formats />
      <Additions />
      <Service />
      <Decor />
      <Prices />
      <Approach />
      <FormRequest />
      <SiteFooter />
    </main>
  );
}
