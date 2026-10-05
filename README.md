# João Guilherme — Suporte de TI para empresas

Site de suporte de TI para pequenas empresas em Concórdia/SC e região. A apresentação prioriza os problemas atendidos, as modalidades de suporte e a solicitação de atendimento.

[Site publicado](https://joao-guilherme-portfolio.joaogvp.chatgpt.site)

## Páginas

- `/`: serviços, segmentos atendidos, processo de atendimento, planos e orientações.
- `/servicos`: computadores, impressoras, rede e Wi-Fi, backup, programas, suporte remoto, e-mail e manutenção preventiva.
- `/planos`: atendimento avulso, Essencial, Comércio e Empresa, sob consulta.
- `/sobre`: apresentação, formação em Ciência da Computação e áreas de atendimento.
- `/contato`: formulário de solicitação e canais de contato.
- `/notas` e `/notas/[slug]`: orientações e anotações com pesquisa e categorias.
- `/laboratorio`: experimento interativo, disponível na navegação secundária.

As antigas páginas de projetos redirecionam permanentemente para `/servicos`. Projetos pessoais e perfil de código não são apresentados no site comercial.

## Recursos

- Tema claro/escuro e layout responsivo.
- Metadados por página, sitemap e robots.
- Formulário com validação no servidor, consentimento, antispam e limite de frequência.
- Leads persistidos no D1, com protocolo após gravação e campos preservados em caso de erro.
- Integração opcional Resend para confirmação e notificação, com auditoria de tentativas.

## Execução e verificação

A base usa React 19, TypeScript, vinext/App Router, Vite, Tailwind e Cloudflare Workers.

```sh
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
npm test
```

As migrações são geradas por `npm run db:generate`. Os tipos do Cloudflare podem ser atualizados por `npm run cf:types`. Os testes de persistência usam SQLite local e as migrações reais, sem acessar dados de produção ou enviar e-mails.

## Estado comercial e hospedagem

A versão comercial foi publicada em 05/10/2026 com acesso público. O D1 de produção usa o binding `DB`; as migrações 0000 e 0001 estão aplicadas, com as tabelas `leads`, `contact_rate_limits` e `lead_email_attempts`. O UUID placeholder em `vite.config.ts` é apenas para desenvolvimento local.

Os canais de demonstração continuam fictícios. Configure os contatos reais em `lib/support.ts`: WhatsApp com código do país e DDD, e e-mail profissional. O envio de e-mails está desativado no runtime até configurar credenciais e endereços reais, conforme [CONFIGURACAO_EMAIL.md](docs/CONFIGURACAO_EMAIL.md).

Planos estão sob consulta até definir preços, horários, visitas, deslocamento e limites de atendimento. Também permanecem pendentes analytics, retenção de dados e Perfil da Empresa no Google. Consulte [IMPLEMENTACAO_SUPORTE_TI.md](IMPLEMENTACAO_SUPORTE_TI.md).

Os leads não possuem endpoint público de leitura. O limite de solicitações usa um hash do IP, sem gravar o endereço original; não substitui proteção de borda contra ataques distribuídos. O acompanhamento inicial pode ser feito pelo console D1 autorizado.

Cada etapa validada é enviada ao repositório. Novos pushes exigem publicação pelo fluxo Sites para atualizar o site hospedado.
