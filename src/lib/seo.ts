export const DEFAULT_SITE_ORIGIN = "https://dr-ramon-advogado.lovable.app";

export function resolveSiteOrigin(value: string | undefined): string {
  const url = new URL(value?.trim() || DEFAULT_SITE_ORIGIN);
  if (
    url.protocol !== "https:" || url.username || url.password ||
    url.pathname !== "/" || url.search || url.hash ||
    url.hostname.endsWith(".vercel.app") || url.hostname.startsWith("id-preview--")
  ) {
    throw new Error("Configure VITE_SITE_URL with the official HTTPS origin, not a preview URL.");
  }
  return url.origin;
}

// Public build-time configuration, shared by metadata and the sitemap.
export const SITE_ORIGIN = resolveSiteOrigin(import.meta.env['VITE_SITE_URL']);
export const HOME_URL = `${SITE_ORIGIN}/`;
export const SHARE_IMAGE_URL = `${SITE_ORIGIN}/ramon-alves-compartilhamento.jpg`;
export const SEO_TITLE = "Ramon Alves Advocacia | Advogado Imobiliário em Porto Seguro";
export const SEO_DESCRIPTION = "Conheça a Ramon Alves Advocacia em Porto Seguro, BA. Atuação em Direito Imobiliário, contratos imobiliários, regularização de imóveis, família e sucessões.";

export const legalService = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${HOME_URL}#escritorio`,
  name: "Ramon Alves Advocacia",
  url: HOME_URL,
  image: SHARE_IMAGE_URL,
  logo: `${SITE_ORIGIN}/ramon-alves-logo-oficial.png`,
  sameAs: ["https://www.instagram.com/ramonalvesadvocacia/"],
  telephone: "+5573988662627",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Edifício Palazzo Itália, Av. 22 de Abril, Sala 03, Centro",
    addressLocality: "Porto Seguro",
    addressRegion: "BA",
    postalCode: "45810-000",
    addressCountry: "BR",
  },
  areaServed: [
    { "@type": "City", name: "Porto Seguro" },
    { "@type": "Country", name: "Brasil" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Áreas de atuação jurídica",
    itemListElement: [
      "Direito Imobiliário", "Contratos Imobiliários", "Regularização de imóveis",
      "Direito de Família e Sucessões",
    ].map((name) => ({
      "@type": "Offer", itemOffered: { "@type": "Service", name },
    })),
  },
};