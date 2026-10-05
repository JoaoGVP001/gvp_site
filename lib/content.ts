export type NoteSection = {
  heading: string;
  paragraphs: string[];
  code?: string;
  bullets?: string[];
};

export type Note = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  tags: string[];
  sections: NoteSection[];
};

export const notes: Note[] = [
  {
    slug: "backup-pequena-empresa", title: "Como saber se sua empresa precisa de backup", excerpt: "Um primeiro passo para identificar dados importantes e organizar uma rotina de cópias.", category: "Backup", date: "2026-10-05", readingTime: "3 min", tags: ["suporte de TI", "backup"],
    sections: [
      { heading: "O que não pode parar?", paragraphs: ["Pense nos arquivos que sua empresa usa para trabalhar: documentos, cadastros e registros. Se perder um computador impedir o acesso a esses dados, é hora de organizar cópias e um processo de recuperação."] },
      { heading: "Sincronização não basta", paragraphs: ["Uma pasta sincronizada pode propagar exclusões e alterações indesejadas. Verifique histórico de versões, retenção e possibilidade de recuperar arquivos. Mantenha cópias independentes e restrinja o acesso a elas."] },
      { heading: "Combine uma rotina e teste", paragraphs: ["Defina o que copiar, com que frequência, onde guardar e quem acompanha falhas. Teste a recuperação periodicamente em um ambiente separado, sem sobrescrever os dados originais. Nenhuma rotina elimina todos os riscos."], bullets: ["Liste os dados essenciais", "Escolha cópias locais e externas conforme o cenário", "Acompanhe falhas e espaço disponível", "Teste a recuperação de arquivos"] },
    ],
  },
  {
    slug: "impressora-rede-diagnostico", title: "Impressora parou de funcionar: por onde começar", excerpt: "Verificações simples para separar falhas da impressora, da conexão e do computador.", category: "Suporte de TI", date: "2026-10-05", readingTime: "3 min", tags: ["impressoras", "redes"],
    sections: [
      { heading: "Comece pelo equipamento", paragraphs: ["Confira energia, papel e mensagens no painel. Se houver uma função de teste no próprio equipamento, use-a para verificar se a impressora consegue imprimir sem depender do computador."] },
      { heading: "Identifique a extensão do problema", paragraphs: ["Veja se a falha ocorre em um computador ou em todos. Confira cabo ou Wi-Fi e se o computador está na rede correta. Anote a mensagem de erro antes de alterar configurações."] },
      { heading: "Evite mudanças sem diagnóstico", paragraphs: ["Não restaure a impressora ou o roteador para os padrões de fábrica sem conhecer as configurações usadas pela empresa. Se o problema continuar, informe o modelo, a mensagem de erro e os equipamentos afetados ao solicitar atendimento."] },
    ],
  },
  {
    slug: "git-basico",
    title: "Git: o essencial para começar",
    excerpt: "Um mapa curto dos comandos e conceitos que formam um fluxo de trabalho seguro no Git.",
    category: "Ferramentas",
    date: "2026-08-20",
    readingTime: "5 min",
    tags: ["git", "programação"],
    sections: [
      {
        heading: "O modelo mental",
        paragraphs: ["O Git acompanha versões do projeto. O diretório de trabalho contém as mudanças atuais, a staging area prepara o próximo registro e o repositório guarda o histórico de commits."],
        bullets: ["Trabalho: arquivos que você está editando", "Stage: mudanças escolhidas para o próximo commit", "Histórico: registros que já foram confirmados"],
      },
      {
        heading: "Um fluxo pequeno e seguro",
        paragraphs: ["Antes de registrar qualquer coisa, vale observar o estado do projeto e revisar exatamente o que mudou."],
        code: "git status\ngit diff\ngit add caminho/do/arquivo\ngit commit -m \"feat: descreve a mudança\"",
      },
      {
        heading: "A ideia principal",
        paragraphs: ["Commits pequenos contam uma história melhor. Eles facilitam revisões, ajudam a encontrar problemas e deixam cada decisão mais fácil de entender no futuro."],
      },
    ],
  },
  {
    slug: "poo-heranca-composicao",
    title: "Herança e composição em POO",
    excerpt: "Como escolher entre relações de tipo e relações de colaboração ao modelar objetos.",
    category: "Programação",
    date: "2026-08-18",
    readingTime: "6 min",
    tags: ["poo", "arquitetura"],
    sections: [
      {
        heading: "Duas formas de reaproveitar comportamento",
        paragraphs: ["Herança representa uma relação do tipo “é um”. Composição representa “tem um”. As duas reduzem repetição, mas criam níveis diferentes de acoplamento."],
      },
      {
        heading: "Quando preferir composição",
        paragraphs: ["Composição costuma ser mais flexível quando um comportamento pode mudar em tempo de execução ou quando diferentes classes precisam colaborar sem compartilhar toda a estrutura."],
        bullets: ["Troca de comportamento com menos impacto", "Dependências explícitas", "Testes mais isolados"],
      },
      {
        heading: "Regra prática",
        paragraphs: ["Use herança quando a especialização for realmente estável. Quando a dúvida persistir, começar com composição normalmente preserva mais opções para o futuro."],
      },
    ],
  },
  {
    slug: "postgres-comandos",
    title: "Comandos úteis no PostgreSQL",
    excerpt: "Uma referência de bolso para navegar, consultar e inspecionar um banco PostgreSQL.",
    category: "Banco de dados",
    date: "2026-08-14",
    readingTime: "4 min",
    tags: ["postgresql", "sql"],
    sections: [
      {
        heading: "Explorando pelo psql",
        paragraphs: ["Os meta-comandos do psql começam com uma barra invertida e ajudam a enxergar rapidamente bancos, tabelas e estruturas."],
        code: "\\l              -- lista bancos\n\\c nome_banco   -- conecta em um banco\n\\dt             -- lista tabelas\n\\d nome_tabela  -- descreve a tabela",
      },
      {
        heading: "Consultas que ajudam no dia a dia",
        paragraphs: ["Limitar resultados e ordenar explicitamente torna a exploração de dados mais previsível."],
        code: "SELECT id, titulo\nFROM livros\nWHERE status = 'lendo'\nORDER BY atualizado_em DESC\nLIMIT 20;",
      },
      {
        heading: "Antes de alterar",
        paragraphs: ["Para operações sensíveis, use uma transação: execute, confira o resultado e confirme apenas quando estiver correto."],
      },
    ],
  },
  {
    slug: "redes-modelo-tcp-ip",
    title: "Uma visão prática do modelo TCP/IP",
    excerpt: "Uma leitura por camadas para entender como uma mensagem atravessa a rede.",
    category: "Redes",
    date: "2026-08-09",
    readingTime: "7 min",
    tags: ["redes", "tcp-ip"],
    sections: [
      {
        heading: "Pensar em camadas",
        paragraphs: ["Cada camada resolve uma parte do problema de comunicação. A aplicação lida com o significado da mensagem; transporte, internet e acesso à rede cuidam da entrega."],
      },
      {
        heading: "O caminho de uma requisição",
        paragraphs: ["Ao abrir um site, o navegador cria uma mensagem HTTP. O transporte divide e acompanha os dados, o IP encontra o destino e a camada de acesso envia os quadros pelo meio disponível."],
        bullets: ["Aplicação: HTTP e DNS", "Transporte: TCP ou UDP", "Internet: IP", "Acesso: Ethernet ou Wi‑Fi"],
      },
      {
        heading: "Por que isso ajuda",
        paragraphs: ["Quando uma conexão falha, as camadas oferecem uma ordem de investigação: há link? existe endereço IP? o destino responde? a aplicação entendeu a requisição?"],
      },
    ],
  },
];

export function getNote(slug: string) {
  return notes.find((note) => note.slug === slug);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${date}T00:00:00Z`))
    .replace(" de ", " ")
    .replace(" de ", " ");
}
