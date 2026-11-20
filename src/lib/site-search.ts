export const practiceAreas = [
  {
    id: "imobiliario", label: "Direito Imobiliário",
    summary: "Assessoria jurídica em negócios imobiliários, com foco na segurança das transações, proteção patrimonial e prevenção de riscos.",
    title: "Seu patrimônio merece segurança jurídica em cada etapa.",
    description: "Decisões imobiliárias exigem atenção, planejamento e segurança. Conte com assessoria jurídica especializada para conduzir seus negócios com mais tranquilidade.",
    services: ["Consultoria jurídica na aquisição de imóveis.", "Assessoria em compra e venda de imóveis.", "Elaboração e análise de contratos imobiliários.", "Regularização de imóveis.", "Consultoria preventiva em negócios imobiliários.", "Orientação jurídica para proteção patrimonial."],
  },
  {
    id: "contratos", label: "Direito e Contratos Imobiliários",
    summary: "Elaboração, análise e revisão de contratos, assessoria na compra e venda de imóveis e suporte jurídico em negociações imobiliárias.",
    title: "Clareza e segurança jurídica em cada negociação.",
    description: "Contratos bem estruturados contribuem para relações mais transparentes, prevenção de conflitos e maior segurança nas operações imobiliárias.",
    services: ["Elaboração e revisão de contratos imobiliários.", "Análise de cláusulas e obrigações contratuais.", "Orientação em negociações imobiliárias.", "Assessoria em contratos de compra e venda.", "Análise de riscos contratuais.", "Apoio jurídico na formalização de negócios."],
  },
  {
    id: "familia-sucessoes", label: "Direito de Família e Sucessões",
    summary: "Orientação jurídica em questões familiares e sucessórias, com atuação técnica, responsável e atenção às particularidades de cada situação.",
    title: "Orientação jurídica para decisões que envolvem família e patrimônio.",
    description: "Questões familiares e sucessórias exigem atenção, responsabilidade e uma análise cuidadosa das particularidades de cada situação.",
    services: ["Divórcio e dissolução de união estável.", "Inventários e partilha de bens.", "Planejamento sucessório.", "Orientação sobre heranças.", "Questões patrimoniais familiares.", "Acompanhamento jurídico em demandas familiares."],
  },
  {
    id: "direito-mineracao", label: "Direito da Mineração",
    summary: "Assessoria jurídica em questões relacionadas à atividade mineral, com atenção à regulamentação, aos contratos e à segurança jurídica das operações.",
    title: "Segurança jurídica para atividades e negócios do setor mineral.",
    description: "A atividade mineral envolve questões regulatórias, contratuais e patrimoniais que exigem análise jurídica cuidadosa. O escritório oferece orientação jurídica voltada às particularidades do setor, contribuindo para decisões mais seguras e responsáveis.",
    services: ["Orientação jurídica sobre direitos minerários.", "Análise e elaboração de contratos relacionados à atividade mineral.", "Assessoria em negociações envolvendo recursos minerais.", "Orientação sobre questões regulatórias do setor mineral.", "Análise jurídica de direitos e obrigações relacionados à exploração mineral.", "Consultoria preventiva em negócios ligados à mineração."],
  },
] as const;

export const socialLinks = {
  instagram: "https://www.instagram.com/ramonalvesadvocacia/",
  linkedin: "https://br.linkedin.com/in/dr-ramon-alves-6b8642175",
} as const;

const sections = [
  ...practiceAreas.map(area => ({ id: area.id, title: area.label, text: [area.summary, area.title, area.description, ...area.services].join(" ") })),
  { id: "escritorio", title: "O escritório", text: "Ramon Alves Advocacia Porto Seguro Bahia assessoria jurídica estratégia transparência confiança proteção patrimonial negócios" },
  { id: "diferenciais", title: "Nossos diferenciais", text: "Atuação preventiva excelência técnica transparência atendimento personalizado segurança patrimonial" },
  { id: "conteudos", title: "Conteúdos do escritório", text: "Instagram Reels Imob Hilário recurso mineral mineração locação por temporada como proteger seus bens" },
  { id: "contato", title: "Contato e localização", text: "Atendimento presencial online telefone WhatsApp Porto Seguro Bahia endereço Palazzo Itália" },
  { id: "solicitar-atendimento", title: "Solicite um atendimento", text: "Formulário nome telefone WhatsApp área de interesse Direito Civil Contratos Família Sucessões Mineração" },
];

export function normalizeSearch(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR").trim();
}

export function searchSite(query: string) {
  const words = normalizeSearch(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return sections.filter(section => {
    const haystack = normalizeSearch(`${section.title} ${section.text}`);
    return words.every(word => haystack.includes(word));
  }).sort((a, b) => Number(normalizeSearch(b.title).includes(normalizeSearch(query))) - Number(normalizeSearch(a.title).includes(normalizeSearch(query))));
}