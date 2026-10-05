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
- Integração opcional Resend para confirmação e notificação, com registro das tentativas no D1 e proteção contra duplicação por lead.
- Versão comercial publicada em 05/10/2026, preservando acesso público: https://joao-guilherme-portfolio.joaogvp.chatgpt.site
- D1 de produção provisionado com binding DB; as migrações 0000 e 0001 foram aplicadas. As três tabelas da aplicação foram confirmadas pela hospedagem.
- CONTACT_EMAIL_ENABLED=false configurado no runtime publicado; nenhum envio real de e-mail foi realizado nesta etapa.

## Próximas etapas dependentes de configuração ou operação real
- Substituir contatos fictícios por WhatsApp Business e e-mail profissional confirmados.
- Definir preços, horários, chamados, deslocamento, visitas e prazo de resposta.
- Configurar credenciais e domínio verificado do Resend, habilitar os e-mails após definir os canais reais.
- Configurar analytics e eventos de conversão.
- Definir rotina de retenção para leads e registros técnicos antes de iniciar operação com clientes reais.
- Criar Perfil da Empresa no Google com dados comerciais reais.
- Acrescentar depoimentos e casos apenas após atendimentos reais e autorização.
- Avaliar novos projetos de suporte e painel administrativo conforme a necessidade.

Não foram criados depoimentos, experiência profissional ou resultados de clientes fictícios. O formulário só confirma recebimento quando a gravação funciona. A integração de e-mails está implementada, mas permanece desativada até a configuração de remetente, destinatário e chave de API reais.
