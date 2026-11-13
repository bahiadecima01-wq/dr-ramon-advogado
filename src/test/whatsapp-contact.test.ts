import { describe, expect, it } from "vitest";
import { contactSchema, createContactWhatsAppUrl, formatBrazilianPhone, interestAreas, selectedReels } from "@/lib/whatsapp-contact";

const valid = { name: "Maria Silva", phone: "(73) 98866-2627", area: "Direito Imobiliário" };
describe("Requested contact rules", () => {
  it("requires all three fields", () => {
    for (const field of ["name", "phone", "area"]) expect(contactSchema.safeParse({ ...valid, [field]: "" }).success).toBe(false);
  });
  it("offers exactly the five requested areas", () => {
    expect(interestAreas).toEqual(["Direito Imobiliário", "Direito Civil", "Contratos", "Família & Sucessões", "Mineração"]);
    expect(contactSchema.safeParse({ ...valid, area: "Outra" }).success).toBe(false);
  });
  it("validates Brazilian phone numbers with DDD", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, phone: "(73) 3268-1234" }).success).toBe(true);
    for (const phone of ["123", "988662627", "(00) 98866-2627", "(73) 88866-2627"]) expect(contactSchema.safeParse({ ...valid, phone }).success).toBe(false);
    expect(formatBrazilianPhone("73988662627")).toBe("(73) 98866-2627");
  });
  it("opens the official number with encoded personal details", () => {
    const url = new URL(createContactWhatsAppUrl({ ...valid, name: " João & Ana ", area: "Família & Sucessões" }));
    expect(url.origin + url.pathname).toBe("https://wa.me/5573988662627");
    expect(url.searchParams.get("text")).toBe("Olá! Vim pelo site do Ramon Alves Advocacia e gostaria de solicitar atendimento.\n\nNome: João & Ana\n\nTelefone: (73) 98866-2627\n\nÁrea de interesse: Família & Sucessões\n\nAguardo o retorno. Obrigado!");
    expect(() => createContactWhatsAppUrl({ ...valid, phone: "bad" })).toThrow();
  });
  it("selects only the four supplied Reels", () => {
    expect(selectedReels).toEqual(["DekiCJqhSB_", "DeNRZY1hsOj", "DdkS2kROr77", "DdumEBKutil"]);
  });
});