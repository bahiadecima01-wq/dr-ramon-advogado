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
} from "lucide-react";
import ramon from "@/assets/ramon-alves.png";
import arquitetura from "@/assets/arquitetura.jpg";

const WA =
  "https://wa.me/5573988662627?text=" +
  encodeURIComponent(
    "Olá! Gostaria de obter informações sobre os serviços jurídicos do escritório Ramon Alves Advocacia.",
  );
const ADDRESS =
  "Edifício Palazzo Itália, Av. 22 de Abril, Sala 03, Centro, Porto Seguro - BA, 45810-000";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ramon Alves Advocacia | Direito Imobiliário em Porto Seguro – BA" },
      {
        name: "description",
        content:
          "Assessoria jurídica em Direito Imobiliário, Contratos, Família e Sucessões em Porto Seguro/BA. Atendimento presencial e online.",
      },
      { property: "og:title", content: "Ramon Alves Advocacia" },
      {
        property: "og:description",
        content: "Segurança jurídica para proteger seu patrimônio e seus negócios.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  ["Escritório", "#escritorio"],
  ["Atuação", "#atuacao"],
  ["Imobiliário", "#imobiliario"],
  ["Diferenciais", "#diferenciais"],
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
    gold: "bg-gold text-foreground hover:bg-background",
    ghostLight: "border border-navy-foreground/30 text-navy-foreground hover:border-gold hover:text-gold",
  }[variant];
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center justify-center gap-3 px-7 py-4 text-xs font-medium uppercase tracking-[0.18em] transition-all duration-300 ${styles}`}
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function Logo({ light }: { light?: boolean }) {
  return (
    <a href="#topo" className="flex items-center gap-3">
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center border font-serif text-lg italic ${light ? "border-gold text-gold" : "border-primary text-primary"}`}
      >
        RA
      </span>
      <span className="leading-none">
        <span className={`block font-serif text-lg tracking-[0.2em] ${light ? "text-navy-foreground" : "text-primary"}`}>
          RAMON ALVES
        </span>
        <span className="mt-1 block text-[0.6rem] tracking-[0.45em] text-gold">ADVOCACIA</span>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map(([l, h]) => (
            <a key={h} href={h} className="text-xs uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-primary">
              {l}
            </a>
          ))}
          <a href={WA} target="_blank" rel="noopener noreferrer" className="border border-primary px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
            WhatsApp
          </a>
        </nav>
        <button aria-label="Abrir menu" className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6 text-primary" /> : <Menu className="h-6 w-6 text-primary" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-6 py-6 lg:hidden">
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
      <Header />

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 pt-32 pb-20 lg:grid-cols-[1.1fr_1fr] lg:pt-40 lg:pb-28">
        <div className="reveal order-2 lg:order-1">
          <p className="eyebrow flex items-center gap-4">
            <span className="h-px w-10 bg-gold" />
            Advocacia em Porto Seguro
          </p>
          <h1 className="mt-8 text-5xl leading-[1.05] text-primary md:text-6xl xl:text-7xl">
            Segurança jurídica para proteger seu <em className="text-gold">patrimônio</em> e seus negócios.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Assessoria jurídica estratégica em Direito Imobiliário, Família e Sucessões. Atuação pautada pela excelência
            técnica, transparência e atendimento personalizado.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Btn href={WA} external>Fale com um advogado</Btn>
            <Btn href="#atuacao" variant="outline">Conheça nossa atuação</Btn>
          </div>
          <p className="mt-12 flex items-start gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            Porto Seguro – Bahia | Atendimento presencial e online para todo o Brasil.
          </p>
        </div>
        <div className="reveal order-1 lg:order-2">
          <div className="relative mx-auto max-w-[18rem] sm:max-w-sm lg:mr-0 lg:ml-auto lg:max-w-[82%]">
            <div className="absolute -right-4 -bottom-4 h-full w-full border border-gold md:-right-6 md:-bottom-6" />
            <img
              src={ramon}
              alt="Advogado Ramon Alves"
              className="relative h-auto w-full"
              width={1265}
              height={1244}
            />
            <div className="absolute -left-4 bottom-8 bg-primary px-6 py-4 md:-left-8">
              <p className="font-serif text-xl text-primary-foreground">Ramon Alves</p>
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">Advogado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="escritorio" className="border-t border-border bg-card py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_1.2fr]">
          <SectionHead eyebrow="O escritório" title="Assessoria jurídica com estratégia, transparência e confiança." />
          <div className="space-y-6 text-lg leading-relaxed text-foreground/80 lg:pt-14">
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
      <section id="atuacao" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHead
            eyebrow="Atuação"
            title="Áreas de atuação"
            text="Atuação jurídica especializada, com soluções personalizadas para diferentes necessidades."
          />
          <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-3">
            {[
              [Building2, "Direito Imobiliário", "Assessoria jurídica em negócios imobiliários, com foco na segurança das transações, proteção patrimonial e prevenção de riscos."],
              [FileSignature, "Direito e Contratos Imobiliários", "Elaboração, análise e revisão de contratos, assessoria na compra e venda de imóveis e suporte jurídico em negociações imobiliárias."],
              [Users, "Direito de Família e Sucessões", "Orientação jurídica em questões familiares e sucessórias, com atuação técnica, responsável e atenção às particularidades de cada situação."],
            ].map(([Icon, t, d], i) => {
              const I = Icon as typeof Building2;
              return (
                <article key={i} className="group bg-background p-10 transition-colors duration-500 hover:bg-primary">
                  <div className="flex items-start justify-between">
                    <I className="h-8 w-8 text-gold" strokeWidth={1.2} />
                    <span className="font-serif text-3xl text-border transition-colors group-hover:text-gold/50">0{i + 1}</span>
                  </div>
                  <h3 className="mt-12 text-2xl text-primary transition-colors group-hover:text-primary-foreground">{t as string}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground transition-colors group-hover:text-primary-foreground/70">{d as string}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-12">
            <Btn href={WA} external variant="outline">Agende uma conversa</Btn>
          </div>
        </div>
      </section>

      {/* Imobiliário */}
      <section id="imobiliario" className="bg-primary py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          <img src={arquitetura} alt="Arquitetura residencial contemporânea" loading="lazy" width={1280} height={1600} className="aspect-[4/5] w-full object-cover" />
          <div>
            <SectionHead
              light
              eyebrow="Direito Imobiliário"
              title="Seu patrimônio merece segurança jurídica em cada etapa."
              text="Decisões imobiliárias exigem atenção, planejamento e segurança. Conte com assessoria jurídica especializada para conduzir seus negócios com mais tranquilidade."
            />
            <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
              {[
                "Consultoria jurídica na aquisição de imóveis.",
                "Assessoria em compra e venda de imóveis.",
                "Elaboração e análise de contratos imobiliários.",
                "Regularização de imóveis.",
                "Consultoria preventiva em negócios imobiliários.",
                "Orientação jurídica para proteção patrimonial.",
              ].map((s) => (
                <li key={s} className="flex gap-3 border-b border-navy-foreground/15 py-4 text-navy-foreground/85">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Btn href={WA} external variant="gold">Converse com nosso escritório</Btn>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section id="diferenciais" className="py-24 md:py-32">
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

      {/* Contato */}
      <section id="contato" className="border-t border-border bg-card py-24 md:py-32">
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
      <section className="bg-primary py-24 md:py-32">
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
      <footer className="bg-foreground py-16 text-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo light />
            <p className="mt-6 text-sm text-background/60">Porto Seguro – Bahia</p>
          </div>
          <div>
            <p className="eyebrow">Navegação</p>
            <ul className="mt-5 space-y-3 text-sm text-background/70">
              {nav.map(([l, h]) => (
                <li key={h}><a href={h} className="hover:text-gold">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Áreas</p>
            <ul className="mt-5 space-y-3 text-sm text-background/70">
              <li>Direito Imobiliário</li>
              <li>Contratos Imobiliários</li>
              <li>Família e Sucessões</li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Contato</p>
            <p className="mt-5 text-sm leading-relaxed text-background/70">
              Telefone / WhatsApp: (73) 98866-2627
              <br />
              Edifício Palazzo Itália – Av. 22 de Abril, Sala 03 – Centro, Porto Seguro – BA.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-4 border-t border-background/10 px-6 pt-8 text-xs text-background/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Ramon Alves Advocacia. Todos os direitos reservados.</p>
          <p className="font-serif italic tracking-widest text-gold">Ramon Alves</p>
        </div>
      </footer>

      {/* WhatsApp flutuante */}
      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar pelo WhatsApp"
        className="fixed right-5 bottom-5 z-50 flex items-center gap-3 rounded-full border border-gold bg-primary py-3.5 pr-5 pl-4 text-primary-foreground shadow-2xl transition-transform hover:-translate-y-1 md:right-8 md:bottom-8"
      >
        <MessageCircle className="h-5 w-5 text-gold" />
        <span className="hidden text-xs uppercase tracking-[0.18em] sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
