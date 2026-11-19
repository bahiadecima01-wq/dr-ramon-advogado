import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { searchSite } from "@/lib/site-search";

export function SiteSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const results = searchSite(query);
  const showing = open && query.trim().length > 0;
  useEffect(() => {
    function close(event: PointerEvent) {
      if (event.target instanceof Node && !container.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  function select(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    setOpen(false);
    window.history.replaceState(null, "", `#${id}`);
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    target.focus({ preventScroll: true });
  }
  return (
    <div ref={container} className="relative z-20 mt-9 max-w-2xl">
      <form role="search" onSubmit={event => { event.preventDefault(); const result = results[active]; if (result && showing) select(result.id); else setOpen(true); }} className="flex items-center rounded-md border border-accent/40 bg-hero-search text-primary-foreground focus-within:border-accent">
        <input type="search" role="combobox" aria-label="Pesquisar no site" aria-autocomplete="list" aria-expanded={showing} aria-controls="site-search-results" aria-activedescendant={showing && results[active] ? `search-result-${active}` : undefined} value={query} onChange={event => { setQuery(event.target.value); setOpen(true); setActive(0); }} onFocus={() => setOpen(true)} onKeyDown={event => {
          if (event.key === "Escape") { setOpen(false); return; }
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault(); setOpen(true);
            setActive(index => results.length ? (index + (event.key === "ArrowDown" ? 1 : -1) + results.length) % results.length : 0);
          }
        }} placeholder="O que você procura?" className="h-16 min-w-0 flex-1 bg-transparent px-5 text-base outline-none placeholder:text-primary-foreground/75 [&::-webkit-search-cancel-button]:appearance-none" />
        <Button type="submit" variant="ghost" size="icon" aria-label="Buscar" className="mr-3 size-10 text-accent hover:bg-accent/15 hover:text-primary-foreground"><Search className="size-5" /></Button>
      </form>
      {showing && <div className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-md border border-border bg-card text-foreground shadow-search">
        <ul id="site-search-results" role="listbox" aria-label="Resultados da busca" className="max-h-72 overflow-y-auto">
          {results.map((result, index) => <li key={result.id} id={`search-result-${index}`} role="option" aria-selected={active === index}>
            <Button variant="ghost" onClick={() => select(result.id)} onMouseEnter={() => setActive(index)} className={`h-auto min-h-14 w-full justify-between gap-4 whitespace-normal rounded-none px-5 py-3 text-left text-sm ${active === index ? "bg-secondary text-primary" : "text-foreground"}`}><span>{result.title}</span><ArrowUpRight className="size-4 shrink-0" /></Button>
          </li>)}
        </ul>
        {results.length === 0 && <p role="status" className="px-5 py-5 text-sm text-muted-foreground">Nenhum resultado encontrado. Tente outro termo.</p>}
      </div>}
    </div>
  );
}