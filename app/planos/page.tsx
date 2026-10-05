import type { Metadata } from "next";
import { PageIntro } from "../_components/PageIntro";
import { SupportCTA } from "../_components/SupportCTA";

export const metadata: Metadata = { title: "Planos de suporte de TI", description: "Atendimento avulso e acompanhamento mensal para pequenas empresas em Concórdia e região. Escopo e orçamento definidos conforme o ambiente." };
const plans = [
  { name: "Atendimento avulso", description: "Para resolver uma necessidade pontual.", items: ["Diagnóstico de um problema", "Suporte remoto ou visita técnica", "Serviço específico com escopo combinado"] },
  { name: "Essencial", description: "Para ambientes com até 2 computadores.", items: ["Suporte remoto", "Orientação sobre ferramentas de trabalho", "Quantidade de solicitações definida na proposta"] },
  { name: "Comércio", description: "Para ambientes com até 5 computadores.", items: ["Suporte remoto, impressoras e rede", "Acompanhamento básico da rotina de backup", "Visitas conforme condições da proposta"] },
  { name: "Empresa", description: "Para ambientes maiores ou necessidades específicas.", items: ["Escopo personalizado por equipamento", "Acompanhamento preventivo", "Possibilidade de visitas programadas"] },
];
export default function PlansPage() {
  return <main className="page-main"><PageIntro eyebrow="Avulso ou mensal" title="Suporte do tamanho da sua rotina." description="Resolva um problema pontual ou combine acompanhamento recorrente. A proposta considera os equipamentos, a localização e as necessidades da empresa." />
    <section className="service-grid shell" aria-label="Modalidades de atendimento">{plans.map(plan => <article className="service-card" key={plan.name}><p className="section-number">SOB CONSULTA</p><h2>{plan.name}</h2><p>{plan.description}</p><ul>{plan.items.map(item => <li key={item}>{item}</li>)}</ul><SupportCTA subject={`plano ${plan.name} de suporte de TI`} /></article>)}</section>
    <section className="home-section shell"><div className="section-heading"><h2>O que combinamos antes de começar.</h2></div><p>A proposta define horário de atendimento, quantidade de solicitações, prazo de resposta, equipamentos cobertos, visitas, deslocamento e serviços cobrados separadamente. Valores e condições são confirmados antes da contratação.</p><p>Peças, equipamentos, licenças e serviços de terceiros não estão incluídos. O atendimento depende de disponibilidade e não oferece suporte 24 horas.</p></section>
  </main>;
}
