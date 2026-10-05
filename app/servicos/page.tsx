 
import type { Metadata } from "next";
import { PageIntro } from "../_components/PageIntro";
import { SupportCTA } from "../_components/SupportCTA";
import { services } from "../../lib/support";

export const metadata: Metadata = { title: "Serviços de TI em Concórdia", description: "Suporte a computadores, impressoras, redes, Wi-Fi e backup para pequenas empresas em Concórdia e região. Atendimento remoto e presencial sob avaliação." };

export default function ServicesPage() {
  return <main className="page-main">
    <PageIntro eyebrow="Serviços · Concórdia e região" title="Tecnologia funcionando. Sua empresa seguindo." description="Um ponto de contato para organizar computadores, impressoras e ferramentas de trabalho. Cada atendimento começa pela análise do problema e pela definição do escopo." />
    <section className="service-grid shell" aria-label="Serviços disponíveis">{services.map(service => <article className="service-card" id={service.slug} key={service.slug}><span className="service-icon" aria-hidden="true">{service.icon}</span><h2>{service.name}</h2><p>{service.description}</p><a className="text-link" href={`/contato?assunto=${service.slug}`}>Solicitar atendimento →</a></article>)}</section>
    <section className="home-section shell"><div className="section-heading"><h2>Atendimento com escopo claro.</h2></div><p>Atendimento remoto quando o problema permite; visita em Concórdia e região conforme avaliação e disponibilidade. O acesso remoto depende da sua autorização.</p><p>Equipamentos, peças, licenças de software e serviços de terceiros são orçados separadamente. Rotinas de backup ajudam a reduzir riscos, mas não garantem proteção absoluta ou recuperação de todos os dados.</p><SupportCTA /></section>
  </main>;
}
