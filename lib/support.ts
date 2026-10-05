// Preencha somente com canais comerciais confirmados antes de publicar.
export const businessContact = { whatsapp: "", email: "" };

export function whatsappUrl(subject = "suporte de TI para minha empresa") {
  const number = businessContact.whatsapp.replace(/\D/g, "");
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(`Olá, João. Encontrei seu site e gostaria de informações sobre ${subject}.`)}` : null;
}

export const services = [
  { slug: "computadores", icon: "▣", name: "Computadores e notebooks", description: "Diagnóstico de lentidão, instalação, atualização e configuração de software." },
  { slug: "impressoras", icon: "▤", name: "Impressoras", description: "Instalação, compartilhamento em rede e diagnóstico de comunicação com os computadores." },
  { slug: "redes", icon: "◎", name: "Redes e Wi-Fi", description: "Configuração de roteadores, conexão entre equipamentos e análise de instabilidade." },
  { slug: "backup", icon: "↻", name: "Backup", description: "Organização de cópias locais ou em nuvem, rotina de backup e orientação para recuperação." },
  { slug: "programas", icon: "⌘", name: "Instalação de programas", description: "Instalação e configuração de programas adequados à rotina da empresa." },
  { slug: "remoto", icon: "↗", name: "Suporte remoto", description: "Resolução de problemas e orientação com acesso remoto autorizado por você." },
  { slug: "ferramentas", icon: "✉", name: "E-mail e ferramentas de trabalho", description: "Configuração de contas, navegadores, pacote de escritório e armazenamento em nuvem." },
  { slug: "preventiva", icon: "◇", name: "Manutenção preventiva", description: "Revisão de configurações, atualizações e organização para reduzir interrupções." },
];
