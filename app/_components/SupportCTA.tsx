 
import { businessContact, whatsappUrl } from "../../lib/support";

export function SupportCTA({ subject }: { subject?: string }) {
  const whatsapp = whatsappUrl(subject);
  return <div className="hero-actions">
    <a className="button button-primary" href={whatsapp ?? "/contato"} {...(whatsapp ? { target: "_blank", rel: "noreferrer" } : {})}>{whatsapp ? "Solicitar pelo WhatsApp" : "Solicitar atendimento"} <span aria-hidden="true">↗</span></a>
    {businessContact.email && <a className="button button-ghost" href={`mailto:${businessContact.email}`}>Enviar e-mail</a>}
  </div>;
}
