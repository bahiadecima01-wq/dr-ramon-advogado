import { Instagram, Play, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { selectedReels } from "@/lib/whatsapp-contact";
import imobHilario from "@/assets/reel-imob-hilario.png";
import recursoMineral from "@/assets/reel-recurso-mineral.png";
import locacaoTemporada from "@/assets/reel-locacao-temporada.png";
import protegerBens from "@/assets/reel-proteger-bens.png";

const covers = [
  { src: imobHilario, alt: "Imob Hilário", width: 482, height: 687 },
  { src: recursoMineral, alt: "Recurso mineral — a quem pertence?", width: 502, height: 722 },
  { src: locacaoTemporada, alt: "Locação por temporada", width: 477, height: 690 },
  { src: protegerBens, alt: "Como proteger seus bens", width: 530, height: 762 },
] as const;

function Reel({ id, index }: { id: string; index: number }) {
  const cover = covers[index];
  if (!cover) return null;
  const url = `https://www.instagram.com/reel/${id}/`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Assistir no Instagram: ${cover.alt}`} className="group relative block overflow-hidden rounded-md transition-transform duration-300 hover:-translate-y-1">
      <img src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} loading="lazy" className="aspect-[7/10] w-full object-contain" />
      <span aria-hidden="true" className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full border border-brand-foreground/40 bg-brand-surface/80 text-brand-foreground transition-colors group-hover:text-accent"><Play className="h-4 w-4 fill-current" /></span>
    </a>
  );
}

export function InstagramReels() {
  return (
    <section id="conteudos" className="border-t border-border bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow">Instagram</p>
        <h2 className="mt-6 text-4xl text-foreground md:text-5xl">Acompanhe nossos conteúdos</h2>
        <p className="mt-6 text-lg text-muted-foreground">Informações e conteúdos compartilhados pelo nosso escritório.</p>
        <div className="mt-12 grid grid-cols-1 gap-4 min-[360px]:grid-cols-2 md:gap-6 lg:grid-cols-4">{selectedReels.map((id, index) => <Reel key={id} id={id} index={index} />)}</div>
        <div className="mt-10"><Button asChild variant="outline" className="h-12 px-6"><a href="https://www.instagram.com/ramonalvesadvocacia/" target="_blank" rel="noopener noreferrer"><Instagram />Acompanhe nosso Instagram<ArrowUpRight /></a></Button></div>
      </div>
    </section>
  );
}