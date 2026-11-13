import { useState, type FormEvent } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { contactSchema, createContactWhatsAppUrl, formatBrazilianPhone, interestAreas } from "@/lib/whatsapp-contact";

export function WhatsAppContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [errors, setErrors] = useState<{ name?: string | undefined; phone?: string | undefined; area?: string | undefined }>({});
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = contactSchema.safeParse({ name, phone, area });
    if (!result.success) {
      const fields = result.error.flatten().fieldErrors;
      setErrors({ name: fields.name?.[0], phone: fields.phone?.[0], area: fields.area?.[0] });
      return;
    }
    setErrors({});
    window.open(createContactWhatsAppUrl(result.data), "_blank", "noopener,noreferrer");
  }
  return (
    <div className="mt-16 grid gap-10 border-t border-border pt-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <MessageCircle className="h-7 w-7 text-primary" strokeWidth={1.5} />
        <h2 className="mt-5 text-4xl text-foreground">Solicite um atendimento</h2>
        <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">Preencha as informações abaixo e entre em contato com nossa equipe pelo WhatsApp.</p>
      </div>
      <form onSubmit={submit} noValidate className="space-y-6" aria-label="Solicite um atendimento">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">Nome completo</label>
          <Input id="contact-name" autoComplete="name" placeholder="Digite seu nome completo" required maxLength={100} value={name} onChange={e => setName(e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} className="h-12 bg-background" />
          {errors.name && <p id="name-error" role="alert" className="mt-2 text-sm text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium">Telefone / WhatsApp</label>
          <Input id="contact-phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(00) 00000-0000" required maxLength={16} value={phone} onChange={e => setPhone(formatBrazilianPhone(e.target.value))} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} className="h-12 bg-background" />
          {errors.phone && <p id="phone-error" role="alert" className="mt-2 text-sm text-destructive">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="contact-area" className="mb-2 block text-sm font-medium">Área de interesse</label>
          <Select value={area} onValueChange={setArea} required>
            <SelectTrigger id="contact-area" aria-invalid={Boolean(errors.area)} aria-describedby={errors.area ? "area-error" : undefined} className="h-12 bg-background"><SelectValue placeholder="Selecione a área de atendimento" /></SelectTrigger>
            <SelectContent>{interestAreas.map(value => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent>
          </Select>
          {errors.area && <p id="area-error" role="alert" className="mt-2 text-sm text-destructive">{errors.area}</p>}
        </div>
        <Button type="submit" className="h-12 w-full justify-between px-5"><span className="flex items-center gap-3"><MessageCircle />Solicitar atendimento</span><ArrowUpRight /></Button>
        <p className="text-xs leading-relaxed text-muted-foreground">Ao continuar, você será direcionado ao WhatsApp para iniciar seu atendimento.</p>
      </form>
    </div>
  );
}