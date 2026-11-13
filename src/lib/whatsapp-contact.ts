import { z } from "zod";

export const interestAreas = ["Direito Imobiliário", "Direito Civil", "Contratos", "Família & Sucessões", "Mineração"] as const;
export const whatsappNumber = "5573988662627";

export function formatBrazilianPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : "";
  const local = digits.slice(2);
  const split = local.length > 8 ? 5 : 4;
  return `(${digits.slice(0, 2)}) ${local.slice(0, split)}${local.length > split ? `-${local.slice(split)}` : ""}`;
}

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Informe seu nome completo.").max(100, "Use até 100 caracteres."),
  phone: z.string().max(16).refine(value => /^[1-9]\d(?:[2-5]\d{7}|9\d{8})$/.test(value.replace(/\D/g, "")), "Informe um telefone válido com DDD."),
  area: z.enum(interestAreas, { errorMap: () => ({ message: "Selecione a área de atendimento." }) }),
});

export function createContactWhatsAppUrl(input: unknown) {
  const data = contactSchema.parse(input);
  const message = `Olá! Vim pelo site do Ramon Alves Advocacia e gostaria de solicitar atendimento.\n\nNome: ${data.name}\n\nTelefone: ${formatBrazilianPhone(data.phone)}\n\nÁrea de interesse: ${data.area}\n\nAguardo o retorno. Obrigado!`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const selectedReels = ["DekiCJqhSB_", "DeNRZY1hsOj", "DdkS2kROr77", "DdumEBKutil"] as const;