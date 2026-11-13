import { useEffect, useState } from "react";
import { Instagram, Play, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { selectedReels } from "@/lib/whatsapp-contact";

function Reel({ id, index }: { id: string; index: number }) {
  const [requested, setRequested] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!requested || loaded) return;
    const timer = window.setTimeout(() => setFailed(true), 12000);
    return () => window.clearTimeout(timer);
  }, [requested, loaded]);
  const url = `https://www.instagram.com/reel/${id}/`;
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="relative aspect-[9/16] bg-secondary">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-5">
          <Instagram className="h-10 w-10 text-primary" strokeWidth={1.3} />
          {!requested && <Button variant="outline" size="icon" aria-label={`Carregar Reel ${index + 1}`} title="Carregar Reel" onClick={() => setRequested(true)} className="h-14 w-14 rounded-full"><Play /></Button>}
          <Button asChild variant="link"><a href={url} target="_blank" rel="noopener noreferrer">Assistir no Instagram <ArrowUpRight /></a></Button>
        </div>
        {requested && <iframe title={`Instagram Reel ${index + 1}`} src={`${url}embed/`} loading="lazy" onLoad={() => { setLoaded(true); setFailed(false); }} onError={() => setFailed(true)} className={`absolute inset-0 h-full w-full border-0 bg-card ${loaded && !failed ? "visible" : "invisible"}`} allow="encrypted-media; fullscreen" referrerPolicy="strict-origin-when-cross-origin" />}
      </div>
      <div className="border-t border-border px-3 py-3 text-center"><Button asChild variant="link" className="h-auto whitespace-normal"><a href={url} target="_blank" rel="noopener noreferrer">Assistir no Instagram <ArrowUpRight /></a></Button></div>
    </article>
  );
}

export function InstagramReels() {
  return (
    <section id="conteudos" className="border-t border-border bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow">Instagram</p>
        <h2 className="mt-6 text-4xl text-foreground md:text-5xl">Acompanhe nossos conteúdos</h2>
        <p className="mt-6 text-lg text-muted-foreground">Informações e conteúdos compartilhados pelo nosso escritório.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">{selectedReels.map((id, index) => <Reel key={id} id={id} index={index} />)}</div>
        <div className="mt-10"><Button asChild variant="outline" className="h-12 px-6"><a href="https://www.instagram.com/ramonalvesadvocacia/" target="_blank" rel="noopener noreferrer"><Instagram />Acompanhe nosso Instagram<ArrowUpRight /></a></Button></div>
      </div>
    </section>
  );
}