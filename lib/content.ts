export type Project = {
  slug: string;
  index: string;
  name: string;
  shortDescription: string;
  description: string;
  tags: string[];
  status: string;
  year: string;
  category: string;
  challenge: string;
  solution: string;
  highlights: string[];
  github: string;
};

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

export const projects: Project[] = [
  {
    slug: "bookreadnet",
    index: "01",
    name: "BookReadNet",
    shortDescription: "Uma plataforma para descobrir, organizar e acompanhar leituras.",
    description: "Um ambiente digital pensado para aproximar leitores, livros e boas recomendações em uma experiência simples.",
    tags: ["Next.js", "PostgreSQL", "Python"],
    status: "Em desenvolvimento",
    year: "2026",
    category: "Aplicação web",
    challenge: "Organizar descoberta, progresso de leitura e interação em uma interface que continue leve mesmo com muitos dados.",
    solution: "Uma arquitetura por módulos, com catálogo pesquisável, estantes pessoais e uma base preparada para recomendações futuras.",
    highlights: ["Catálogo e estante pessoal", "Acompanhamento de progresso", "Arquitetura pronta para crescer"],
    github: "https://github.com/JoaoGVP001",
  },
  {
    slug: "truco",
    index: "02",
    name: "Truco",
    shortDescription: "Uma experiência digital para o clássico jogo de cartas brasileiro.",
    description: "Um projeto mobile que explora regras, estados de partida e uma interface rápida para jogar sem perder o ritmo.",
    tags: ["Flutter", "Dart", "Mobile"],
    status: "Em evolução",
    year: "2026",
    category: "Aplicativo mobile",
    challenge: "Traduzir as regras e a energia do truco para uma experiência clara, responsiva e fácil de aprender.",
    solution: "Estados de jogo bem definidos, feedback visual imediato e componentes reaproveitáveis para cada etapa da partida.",
    highlights: ["Lógica de rodada", "Interface responsiva", "Componentes reutilizáveis"],
    github: "https://github.com/JoaoGVP001",
  },
  {
    slug: "api-filmes",
    index: "03",
    name: "API de Filmes",
    shortDescription: "Uma API organizada para consultar, filtrar e catalogar filmes.",
    description: "Um estudo prático de backend, modelagem de dados e desenho de endpoints previsíveis para aplicações de catálogo.",
    tags: ["Python", "REST", "SQL"],
    status: "Estudo",
    year: "2026",
    category: "Backend",
    challenge: "Criar uma interface de dados consistente, com filtros úteis e responsabilidades bem separadas.",
    solution: "Endpoints REST com validação, filtros combináveis e uma camada de persistência independente da regra de negócio.",
    highlights: ["Endpoints REST", "Filtros combináveis", "Modelagem relacional"],
    github: "https://github.com/JoaoGVP001",
  },
];

export const notes: Note[] = [
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

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNote(slug: string) {
  return notes.find((note) => note.slug === slug);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${date}T00:00:00Z`))
    .replace(" de ", " ")
    .replace(" de ", " ");
}
