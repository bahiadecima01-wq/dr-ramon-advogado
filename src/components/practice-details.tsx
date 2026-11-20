import arquitetura from "@/assets/casa-costeira-bahia.jpg";
import contratos from "@/assets/assinatura-contrato-alves.png.asset.json";
import familia from "@/assets/familia-patrimonio.jpg";
import mineracao from "@/assets/mineracao-paisagem.jpg";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { practiceAreas } from "@/lib/site-search";

const images = [
  { src: arquitetura, alt: "Casa costeira de dois pavimentos com vegetação tropical e vista para o mar — imagem ilustrativa", width: 1122, height: 1402 },
  { src: contratos.url, alt: "Assinatura de contrato com a marca Ramon Alves Advocacia", width: 768, height: 1152 },
  { src: familia, alt: "Lar e patrimônio familiar — imagem ilustrativa", width: 1024, height: 1280 },
  { src: mineracao, alt: "Paisagem de extração mineral com formações geológicas e vegetação — imagem ilustrativa", width: 1122, height: 1402 },
];

export function PracticeDetails({ contactUrl }: { contactUrl: string }) {
  return <>{practiceAreas.map((area, index) => {
    const image = images[index];
    if (!image) return null;
    return <section key={area.id} id={area.id} tabIndex={-1} className={`practice-section border-b border-navy-foreground/15 py-20 text-navy-foreground md:py-28 ${index === 1 ? "bg-petroleum-deep" : "bg-navy"}`}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <div className={index % 2 === 1 ? "lg:order-2" : ""}><img src={image.src} alt={image.alt} loading="lazy" width={image.width} height={image.height} className={`aspect-[4/5] max-h-[620px] w-full ${area.id === "contratos" ? "object-contain" : "object-cover"}`} /></div>
        <div>
          <p className="flex items-center gap-4 text-xs font-medium uppercase text-accent"><span className="h-px w-10 bg-accent" />0{index + 1} / {area.label}</p>
          <h2 className="mt-7 text-3xl leading-tight md:text-4xl">{area.title}</h2>
          <p className="mt-6 leading-relaxed text-navy-foreground/80">{area.description}</p>
          <ul className="mt-8 grid gap-x-6 sm:grid-cols-2">{area.services.map(service => <li key={service} className="flex gap-3 border-b border-navy-foreground/20 py-4 text-sm leading-relaxed text-navy-foreground/90"><span className="mt-2 size-1.5 shrink-0 bg-accent" />{service}</li>)}</ul>
          <Button asChild variant="outline" className="mt-9 h-auto min-h-12 max-w-full whitespace-normal border-accent/60 bg-transparent px-5 py-3 text-navy-foreground hover:bg-accent hover:text-accent-foreground"><a href={contactUrl} target="_blank" rel="noopener noreferrer">Converse com nosso escritório<ArrowUpRight className="shrink-0" /></a></Button>
        </div>
      </div>
    </section>;
  })}</>;
}