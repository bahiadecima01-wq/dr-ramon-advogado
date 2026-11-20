import { describe, expect, it } from "vitest";
import { practiceAreas, searchSite, socialLinks } from "../lib/site-search";

describe("institutional search and navigation", () => {
  it("finds the real estate section for purchase, sale and regularization", () => {
    for (const term of ["Direito imobiliário", "Compra e venda de imóveis", "Regularizacao de imoveis", "Proteção patrimonial"]) {
      expect(searchSite(term).map(result => result.id)).toContain("imobiliario");
    }
  });
  it("finds the dedicated contracts section", () => {
    expect(searchSite("Contratos").map(result => result.id)).toContain("contratos");
  });
  it("finds family and succession subjects without accents", () => {
    for (const term of ["Herança", "Divorcio", "Família", "Sucessões"]) {
      expect(searchSite(term).map(result => result.id)).toContain("familia-sucessoes");
    }
  });
  it("returns no unrelated result or empty-query suggestions", () => {
    expect(searchSite("direito aeronáutico")).toEqual([]);
    expect(searchSite("   ")).toEqual([]);
  });
  it("assigns all four areas a unique dedicated anchor", () => {
    expect(practiceAreas.map(area => area.id)).toEqual(["imobiliario", "contratos", "familia-sucessoes", "direito-mineracao"]);
  });
  it("finds the new mining services at their dedicated destination", () => {
    for (const term of ["Direito da Mineração", "direitos minerarios", "setor mineral"]) {
      expect(searchSite(term).map(result => result.id)).toContain("direito-mineracao");
    }
  });
  it("links the confirmed professional LinkedIn profile", () => {
    expect(socialLinks.linkedin).toBe("https://br.linkedin.com/in/dr-ramon-alves-6b8642175");
  });
});