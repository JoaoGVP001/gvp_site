# Confirmação e notificação de solicitações

A integração usa a API REST do Resend sem dependência adicional. Permanece desativada por padrão. Endereços de demonstração não habilitam envios. Nenhum e-mail real é disparado nos testes.

## Configuração no runtime do Worker

Configure estes valores no ambiente do servidor, nunca em variáveis públicas do navegador:

| Variável | Finalidade |
| --- | --- |
| `CONTACT_EMAIL_ENABLED` | `true` para habilitar; omita ou use `false` para desativar |
| `RESEND_API_KEY` | Chave privada do Resend, guardada como segredo |
| `CONTACT_EMAIL_FROM` | Endereço simples do domínio verificado no Resend, sem nome de exibição |
| `CONTACT_EMAIL_TO` | E-mail real de João que receberá novas solicitações |

Para testar o runtime local, use o mecanismo de variáveis privadas do Wrangler e mantenha o arquivo fora do Git. Para produção, configure as variáveis/segredos na plataforma de hospedagem. Não inclua credenciais em código, capturas de tela, commits ou mensagens de chat. Os contatos exibidos em `lib/support.ts` são independentes; atualize-os quando houver canais comerciais reais.

Aplique também a migração `drizzle/0001_modern_mauler.sql`, preservando a migração anterior e seu histórico. A etapa foi entregue no GitHub; o envio ao repositório não configura segredos, domínio nem banco de produção.

## Comportamento

1. A solicitação é validada e gravada em `leads`.
2. São registradas tentativas independentes para a notificação de João (`notification`) e a confirmação do visitante (`confirmation`).
3. Se a integração estiver desativada ou incompleta, as tentativas ficam `skipped` e não há chamada externa.
4. Com configuração válida, o servidor tenta enviar cada mensagem com prazo máximo de quatro segundos por chamada.
5. Falhas do provedor ou do registro de e-mail nunca transformam um lead já salvo em erro do formulário.

A notificação contém os dados do atendimento e usa o e-mail do visitante em `reply_to`. A confirmação contém apenas texto fixo e o protocolo; não replica nomes, descrições ou links enviados pelo visitante. Confirmação não representa agendamento ou contratação.

## Estados das tentativas

| Estado | Significado |
| --- | --- |
| `pending` | Tentativa registrada, ainda sem resultado persistido |
| `skipped` | Configuração desativada ou incompleta |
| `accepted` | API do provedor aceitou o envio e devolveu um identificador; não prova entrega na caixa de entrada |
| `failed` | Provedor respondeu com erro HTTP |
| `unknown` | Falha de rede, timeout ou resposta de sucesso sem identificador válido; o resultado é incerto |

Cada tentativa tem chave única por lead e finalidade. Repetir o notifier não dispara uma segunda tentativa já registrada. A chamada também usa `Idempotency-Key` do Resend, válida por 24 horas segundo a documentação do provedor. Não há repetição automática, replay de solicitações antigas, fila de recuperação ou acompanhamento por webhook nesta etapa. Esses recursos poderão ser adicionados quando existir operação real; resultados incertos exigem consulta ao provedor antes de qualquer reenvio.

A resposta do formulário confirma a gravação no banco, sem prometer que um e-mail foi entregue. Não há endpoint público para consultar leads ou tentativas. Credenciais, conteúdo das solicitações e respostas detalhadas do provedor não são registrados em logs da aplicação. Defina também retenção de leads e tentativas antes de operar com clientes reais.

Referências oficiais: [envio pela API](https://resend.com/docs/api-reference/emails/send-email) e [chaves de idempotência](https://resend.com/docs/dashboard/emails/idempotency-keys).
