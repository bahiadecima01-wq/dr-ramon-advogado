import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Building2,
  FileSignature,
  Users,
  ShieldCheck,
  Scale3d,
  Eye,
  UserCheck,
  Landmark,
  Search,
  MapPin,
  Phone,
  Menu,
  X,
  ArrowRight,
  MessageCircle,
  Instagram,
  Linkedin,
  ArrowUpRight,
  ArrowDown,
} from "lucide-react";
import ramon from "@/assets/ramon-alves.png";
import corporateHero from "@/assets/arquitetura-institucional.jpg";
import { SiteSearch } from "@/components/site-search";
import { PracticeDetails } from "@/components/practice-details";
import { BrandedLoading } from "@/components/branded-loading";
import { practiceAreas, socialLinks } from "@/lib/site-search";
import officialLogo from "@/assets/ramon-alves-logo-oficial.png";
import { Button } from "@/components/ui/button";
import { WhatsAppContactForm } from "@/components/whatsapp-contact-form";
import { InstagramReels } from "@/components/instagram-reels";
import { HOME_URL, SHARE_IMAGE_URL, SEO_TITLE, SEO_DESCRIPTION, legalService } from "@/lib/seo";

const WA =
  "https://wa.me/5573988662627?text=" +
  encodeURIComponent(
    "Olá! Gostaria de obter informações sobre os serviços jurídicos do escritório Ramon Alves Advocacia.",
  );
const ADDRESS =
  "Edifício Palazzo Itália, Av. 22 de Abril, Sala 03, Centro, Porto Seguro - BA, 45810-000";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: SEO_TITLE },
      {
        name: "description",
        content:
          SEO_DESCRIPTION,
      },
      { property: "og:title", content: SEO_TITLE },
      {
        property: "og:description",
        content: SEO_DESCRIPTION,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:url", content: HOME_URL },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: "Ramon Alves Advocacia" },
      { property: "og:image", content: SHARE_IMAGE_URL },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Retrato do advogado Ramon Alves" },
      { name: "twitter:title", content: SEO_TITLE },
      { name: "twitter:description", content: SEO_DESCRIPTION },
      { name: "twitter:image", content: SHARE_IMAGE_URL },
      { name: "twitter:image:alt", content: "Retrato do advogado Ramon Alves" },
    ],
    links: [
      { rel: "canonical", href: HOME_URL },
      { rel: "preload", as: "image", href: corporateHero, fetchpriority: "high" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(legalService) }],
  }),
  component: Index,
});

const nav = [
  ["Escritório", "#escritorio"],
  ["Áreas de Atuação", "#atuacao"],
  ["Diferenciais", "#diferenciais"],
  ["Conteúdos", "#conteudos"],
  ["Contato", "#contato"],
] as const;

function Btn({
  href,
  children,
  variant = "solid",
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "gold" | "ghostLight";
  external?: boolean;
}) {
  const styles = {
    solid: "bg-primary text-primary-foreground hover:bg-foreground",
    outline: "border border-primary/30 text-primary hover:border-primary hover:bg-primary/5",
    gold: "bg-accent text-foreground hover:bg-background",
    ghostLight: "border border-navy-foreground/30 text-navy-foreground hover:border-gold hover:text-gold",
  }[variant];
  return (
    <Button asChild variant="ghost" className={`group h-auto whitespace-normal rounded-md px-7 py-4 text-xs font-medium uppercase tracking-[0.18em] transition-all duration-300 ${styles}`}>
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
    </a>
    </Button>
  );
}

function Logo() {
  return (
    <a href="#topo" aria-label="Ramon Alves Advocacia — início" className="shrink-0">
      <img src={officialLogo} alt="Logo oficial Ramon Alves Advocacia" width={387} height={173} className="h-auto w-[148px] sm:w-[166px]" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-brand-surface text-brand-foreground">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav aria-label="Navegação principal" className="hidden items-center gap-6 lg:flex">
          {nav.map(([l, h]) => (
            <a key={h} href={h} className="text-xs uppercase tracking-normal text-brand-foreground/85 transition-colors hover:text-accent">
              {l}
            </a>
          ))}
        </nav>
        <Button variant="ghost" size="icon" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="menu-movel" className="text-accent hover:bg-primary lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6 text-accent" /> : <Menu className="h-6 w-6 text-accent" />}
        </Button>
      </div>
      {open && (
        <nav id="menu-movel" aria-label="Navegação principal móvel" className="border-t border-border bg-background px-6 py-6 lg:hidden">
          {nav.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-border py-4 font-serif text-2xl text-primary">
              {l}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function SectionHead({ eyebrow, title, text, light }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow flex items-center gap-4">
        <span className="h-px w-10 bg-gold" />
        {eyebrow}
      </p>
      <h2 className={`mt-6 text-4xl leading-[1.1] md:text-5xl ${light ? "text-navy-foreground" : "text-primary"}`}>{title}</h2>
      {text && <p className={`mt-6 text-lg leading-relaxed ${light ? "text-navy-foreground/70" : "text-muted-foreground"}`}>{text}</p>}
    </div>
  );
}

function Index() {
  return (
    <div id="topo" className="bg-background text-foreground">
      <BrandedLoading />
      <Header />
      <main>

      {/* Institutional introduction */}
      <section className="corporate-hero relative isolate mt-20 flex items-center text-primary-foreground">
        <img src={corporateHero} alt="Fachada de arquitetura contemporânea — imagem ilustrativa" width={1920} height={1024} fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0 -z-10" />
        <div className="mx-auto w-full max-w-7xl px-6 py-10 md:py-20">
          <p className="mb-6 flex items-center gap-4 text-xs font-medium uppercase text-accent"><span className="h-px w-10 bg-accent" />Advocacia em Porto Seguro</p>
          <h1 className="max-w-3xl text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">Ramon Alves Advocacia</h1>
          <p className="mt-5 max-w-2xl font-serif text-2xl leading-snug text-primary-foreground md:text-3xl">Segurança jurídica para decisões que constroem o futuro.</p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/90">Atuação jurídica pautada pela responsabilidade, atenção aos detalhes e soluções alinhadas às necessidades de cada cliente.</p>
          <SiteSearch />
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button asChild variant="ghost" className="h-auto px-0 py-2 text-primary-foreground hover:bg-transparent hover:text-accent"><a href="#atuacao">Conheça nossa atuação<ArrowDown className="size-4" /></a></Button>
            <span className="hidden h-4 w-px bg-primary-foreground/40 sm:block" />
            <Button asChild variant="ghost" className="h-auto px-0 py-2 text-primary-foreground hover:bg-transparent hover:text-accent"><a href={WA} target="_blank" rel="noopener noreferrer">Fale com nosso escritório<ArrowUpRight className="size-4" /></a></Button>
          </div>
        </div>
      </section>

      <section id="solicitar-atendimento" tabIndex={-1} className="border-t border-border bg-card py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6"><WhatsAppContactForm /></div>
      </section>

      {/* Sobre */}
      <section id="escritorio" tabIndex={-1} className="border-t border-border bg-card py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHead eyebrow="O escritório" title="Assessoria jurídica com estratégia, transparência e confiança." />
            <figure className="mt-10 max-w-[18rem]">
              <img src={ramon} alt="Advogado Ramon Alves" width={1265} height={1244} loading="lazy" className="h-auto w-full" />
              <figcaption className="mt-3 text-sm text-muted-foreground">Ramon Alves · Advogado</figcaption>
            </figure>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-foreground/80 lg:pt-14">
            <p>Segurança jurídica para proteger seu patrimônio e seus negócios. Assessoria jurídica estratégica em Direito Imobiliário, Família e Sucessões. Atuação pautada pela excelência técnica, transparência e atendimento personalizado.</p>
            <p className="font-serif text-2xl leading-snug text-primary">
              A Ramon Alves Advocacia é um escritório localizado em Porto Seguro/BA, com atuação especializada em Direito e
              Contratos Imobiliários, Direito de Família e Sucessões.
            </p>
            <p>
              Atuamos como parceiros estratégicos de nossos clientes, oferecendo soluções jurídicas seguras para a proteção
              patrimonial e o desenvolvimento de negócios.
            </p>
            <p>
              Nosso trabalho vai além da prestação de serviços jurídicos. Buscamos antecipar riscos, prevenir conflitos e
              transformar desafios jurídicos em soluções que geram segurança, confiança e valor.
            </p>
          </div>
        </div>
      </section>

      {/* Áreas */}
      <section id="atuacao" tabIndex={-1} className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead
            eyebrow="Atuação"
            title="Áreas de atuação"
            text="Atuação jurídica especializada, com soluções personalizadas para diferentes necessidades."
          />
          <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-3">
            {practiceAreas.map((area, i) => {
              const Icon = [Building2, FileSignature, Users][i] ?? Building2;
              return <article key={area.id} className="group relative bg-background transition-colors duration-300 hover:bg-primary">
                <Button asChild variant="ghost" className="block h-full w-full whitespace-normal rounded-none p-8 text-left hover:bg-transparent lg:p-10">
                  <a href={`#${area.id}`} aria-label={`Conheça ${area.label}`}>
                    <span className="flex items-start justify-between"><Icon className="size-8 text-gold group-hover:text-accent" strokeWidth={1.2} /><span className="font-serif text-3xl text-primary/55 group-hover:text-accent">0{i + 1}</span></span>
                    <h3 className="mt-10 text-2xl text-primary group-hover:text-primary-foreground">{area.label}</h3>
                    <p className="mt-4 text-base font-normal leading-relaxed text-muted-foreground group-hover:text-primary-foreground/90">{area.summary}</p>
                    <span className="mt-8 flex items-center gap-3 text-sm text-primary group-hover:text-primary-foreground">Saiba mais<ArrowUpRight className="size-4" /></span>
                  </a>
                </Button>
              </article>;
            })}
          </div>
          <div className="mt-12">
            <Btn href={WA} external variant="outline">Agende uma conversa</Btn>
          </div>
        </div>
      </section>

      <PracticeDetails contactUrl={WA} />

      {/* Diferenciais */}
      <section id="diferenciais" tabIndex={-1} className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead eyebrow="Diferenciais" title="Por que contar com a Ramon Alves Advocacia?" />
          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {[
              [Search, "Atuação preventiva", "Identificação de riscos e orientação jurídica para evitar problemas futuros."],
              [Landmark, "Excelência técnica", "Análise cuidadosa e soluções jurídicas fundamentadas."],
              [Eye, "Transparência", "Comunicação clara e acompanhamento responsável de cada demanda."],
              [UserCheck, "Atendimento personalizado", "Estratégias jurídicas alinhadas às necessidades e objetivos de cada cliente."],
              [ShieldCheck, "Segurança patrimonial", "Foco na proteção de bens, interesses e negócios."],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Scale3d;
              return (
                <div key={t as string} className="border-t border-primary pt-8">
                  <I className="h-7 w-7 text-gold" strokeWidth={1.2} />
                  <h3 className="mt-6 text-2xl text-primary">{t as string}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <InstagramReels />

      <section id="redes-sociais" className="border-t border-border bg-secondary py-16 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl"><p className="eyebrow">Canais digitais</p><h2 className="mt-5 text-3xl text-foreground md:text-4xl">Conecte-se com nosso escritório</h2><p className="mt-5 leading-relaxed text-muted-foreground">Acompanhe conteúdos, informações jurídicas e atualizações pelos nossos canais digitais.</p></div>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="outline" className="h-12 px-5"><a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"><Instagram />Instagram<ArrowUpRight /></a></Button>
            <Button asChild variant="outline" className="h-12 px-5"><a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn — perfil profissional de Ramon Alves"><Linkedin />LinkedIn<ArrowUpRight /></a></Button>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" tabIndex={-1} className="border-t border-border bg-card py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow="Atendimento"
              title="Atendimento presencial e online."
              text="Estamos localizados no Centro de Porto Seguro/BA, oferecendo atendimento presencial e consultoria online para clientes de todo o Brasil."
            />
            <div className="mt-10 space-y-6 border-l border-gold pl-6">
              <p className="font-serif text-xl tracking-[0.15em] text-primary">RAMON ALVES ADVOCACIA</p>
              <p className="flex gap-3 leading-relaxed text-foreground/80">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" />
                <span>
                  Edifício Palazzo Itália
                  <br />
                  Av. 22 de Abril, Sala 03 – Centro
                  <br />
                  Porto Seguro – BA · CEP 45810-000
                </span>
              </p>
              <a href="tel:+5573988662627" className="flex items-center gap-3 text-foreground/80 hover:text-primary">
                <Phone className="h-4 w-4 text-gold" /> (73) 98866-2627
              </a>
            </div>
            <div className="mt-10">
              <Btn href={WA} external>Entre em contato</Btn>
            </div>
          </div>
          <iframe
            title="Mapa do escritório"
            src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
            className="min-h-[420px] w-full border border-border"
            loading="lazy"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="mx-auto block h-12 w-px bg-gold" />
          <h2 className="mt-10 text-4xl leading-tight text-primary-foreground md:text-5xl">
            Conte com orientação jurídica especializada para tomar decisões com mais segurança.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/70">
            Entre em contato e conheça como podemos ajudar você a proteger seu patrimônio e seus interesses.
          </p>
          <div className="mt-10">
            <Btn href={WA} external variant="gold">Fale pelo WhatsApp</Btn>
          </div>
        </div>
      </section>

      {/* Footer */}
      </main>
      <footer className="bg-brand-surface pt-16 text-brand-foreground">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-12 px-6 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.85fr_1.15fr_1.1fr_0.75fr]">
          <div><Logo /><p className="mt-6 max-w-xs text-sm leading-relaxed text-brand-foreground/85">Atuação jurídica com responsabilidade, técnica e compromisso com cada cliente.</p></div>
          <div><p className="text-sm font-semibold text-accent">O Escritório</p><ul className="footer-links mt-6 space-y-3 text-sm"><li><a href="#escritorio">Quem Somos</a></li><li><a href="#atuacao">Áreas de Atuação</a></li><li><a href="#diferenciais">Diferenciais</a></li><li><a href="#contato">Contato</a></li></ul></div>
          <div><p className="text-sm font-semibold text-accent">Áreas de Atuação</p><ul className="footer-links mt-6 space-y-3 text-sm leading-relaxed">{practiceAreas.map(area => <li key={area.id}><a href={`#${area.id}`}>{area.label}</a></li>)}</ul></div>
          <div><p className="text-sm font-semibold text-accent">Contato</p><a href={WA} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center gap-2 text-sm text-brand-foreground hover:text-accent"><MessageCircle className="size-4 shrink-0" />(73) 98866-2627</a><p className="mt-4 text-sm leading-relaxed text-brand-foreground/85">Porto Seguro – Bahia<br />Edifício Palazzo Itália<br />Av. 22 de Abril, Sala 03 – Centro<br />CEP 45810-000</p></div>
          <div><p className="text-sm font-semibold text-accent">Redes Sociais</p><ul className="footer-links mt-6 space-y-4 text-sm"><li><a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2"><Instagram className="size-4" />Instagram</a></li><li><a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn — perfil profissional de Ramon Alves" className="flex items-center gap-2"><Linkedin className="size-4" />LinkedIn</a></li></ul></div>
        </div>
        <div className="mx-auto mt-14 max-w-7xl border-t border-brand-foreground/20 px-6 py-7 text-xs text-brand-foreground/80"><p>© {new Date().getFullYear()} Ramon Alves Advocacia. Todos os direitos reservados.</p></div>
        <div className="w-full bg-background px-6 py-6 text-center text-sm text-foreground"><a href="https://baze-mkt.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-normal transition-opacity hover:opacity-80">Criado por <span className="font-bold text-primary">Baze Mkt</span></a></div>
      </footer>

      {/* WhatsApp flutuante */}
      <a
        href="https://wa.me/5573988662627"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar pelo WhatsApp"
        className="fixed right-5 bottom-5 z-50 flex items-center gap-3 rounded-full border border-gold bg-primary py-3.5 pr-5 pl-4 text-primary-foreground shadow-2xl transition-transform hover:-translate-y-1 md:right-8 md:bottom-8"
      >
        <MessageCircle className="h-5 w-5 text-accent" />
        <span className="hidden text-xs uppercase tracking-[0.18em] sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
