# Implementação do roadmap de suporte de TI

## Implementado nesta etapa
- Identidade provisória: João Guilherme, suporte de TI em Concórdia e região.
- Home comercial com serviços, segmentos, processo, planos, apresentação e prova técnica.
- Serviços e planos; valores sob consulta enquanto condições comerciais não forem definidas.
- Navegação, Sobre, metadados locais e sitemap atualizados.
- Contatos fictícios claramente identificados; integração de links preparada em lib/support.ts.
- Formulário com validação no servidor, limite de payload, campo antispam, limite de frequência persistido e consentimento para contato.
- Endpoint POST /api/contato, protocolo após gravação e erro recuperável com campos preservados.
- Schema leads e migração SQL gerada; tipos do Cloudflare gerados para checagem TypeScript.
- Duas notas para pequenas empresas; projetos e conteúdo acadêmico preservados.

## Próximas etapas dependentes de configuração ou operação real
- Substituir contatos fictícios por WhatsApp Business e e-mail profissional confirmados.
- Definir preços, horários, chamados, deslocamento, visitas e prazo de resposta.
- Provisionar D1 no ambiente publicado e aplicar a migração antes de habilitar o recebimento em produção.
- Escolher serviço de e-mail, configurar credenciais e implementar confirmação e notificação de leads.
- Configurar analytics e eventos após a publicação da versão comercial.
- Criar Perfil da Empresa no Google com dados comerciais reais.
- Acrescentar depoimentos e casos apenas após atendimentos reais e autorização.
- Avaliar novos projetos de suporte e painel administrativo conforme a necessidade.

Não foram criados depoimentos, experiência profissional ou resultados de clientes fictícios. O formulário só confirma recebimento quando a gravação funciona. A confirmação por e-mail e a notificação de João ainda dependem de provedor configurado.
