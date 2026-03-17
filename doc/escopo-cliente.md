# Documento de levantamento de necessidades  
## Projeto Self-checkout para loja autônoma de autopeças

### 1. Descrição do projeto

O projeto consiste no desenvolvimento de um sistema de self-checkout (totem) para uma loja autônoma de autopeças focada no nicho de ar-condicionado automotivo, com atendimento predominante a empresas e oficinas (B2B), podendo também atender consumidores finais.  

A solução deve permitir que o cliente realize a compra de forma independente no ambiente da loja, utilizando leitura de código de barras para montar o carrinho e finalizando o pagamento com múltiplas formas (Pix, cartão de crédito parcelado, cartão de débito e crediário via boleto), reduzindo operações manuais e viabilizando a escalabilidade do modelo para novas unidades.

A solução deverá se integrar ao ERP já utilizado pela operação (**HSE**), que é a base principal de dados e responsável por rotinas fiscais e financeiras, como emissão de nota fiscal e geração de boletos.  

O diferencial esperado é a automatização do fluxo ponta a ponta (identificação do cliente, montagem do pedido, pagamento, baixa de estoque e envio para o ERP), com governança por painel administrativo para parametrização de regras comerciais (ex.: parcelamento, parcela mínima, campanhas) e mecanismos de autenticação do cliente para evitar uso indevido de crediário.

---

### 2. Agentes envolvidos e suas funções

- **Administrador da plataforma**  
  Gerencia lojas/unidades, configura regras de pagamento e campanhas, administra usuários e acompanha relatórios de operação e integrações.

- **Cliente (empresa/oficina ou consumidor final)**  
  Acessa a loja, identifica-se no totem, realiza a leitura dos produtos, escolhe a forma de pagamento e conclui a compra.

- **Vendedor/analista comercial (interno/externo)**  
  Capta novos clientes, conduz o cadastro prévio e formaliza o contrato de uso da loja autônoma, garantindo que o cliente esteja apto a comprar.

- **Operador de atendimento remoto/assistido**  
  Presta suporte quando necessário (ex.: primeiro acesso, dúvidas na compra), acompanhando telas e apoiando o cliente sem executar tarefas manuais recorrentes.

- **Equipe fiscal/financeira**  
  Opera rotinas no ERP quando aplicável (ex.: conferência de emissão fiscal e processamento de crediário/boleto conforme regras internas).

- **ERP HSE (sistema externo)**  
  Mantém cadastros e regras fiscais, processa pedidos recebidos, realiza emissão de nota fiscal, controla estoque e executa emissão/gestão de boletos e crediário conforme integração.

---

### 3. Módulos necessários no sistema

#### 3.1 Gestão de lojas e terminais

3.1.1 Cadastro, edição e visualização de lojas/unidades (cada loja com estoque próprio)  
3.1.2 Cadastro, edição e visualização de terminais/totens por loja  
3.1.3 Parametrização de funcionamento do totem por loja (ex.: idioma, identidade visual, instruções)  
3.1.4 Associação do totem à loja e ao estoque correspondente  

#### 3.2 Identificação e autenticação do cliente no totem

3.2.1 Identificação do cliente (empresa) via CPF/CNPJ na interface do totem  
3.2.2 Validação do cliente na base integrada do ERP (existência, status e dados fiscais relevantes)  
3.2.3 Suporte a múltiplos usuários vinculados ao mesmo CNPJ (ex.: funcionários autorizados da empresa)  
3.2.4 Identificação do usuário vinculado ao CNPJ (ex.: seleção/entrada de identificador do usuário)  
3.2.5 Autenticação do usuário com credencial própria (senha individual)  
3.2.6 Autenticação em dois fatores por usuário para liberar a compra (ex.: envio de código por WhatsApp ou SMS)  
3.2.7 Regras de bloqueio e mensagens ao usuário para credenciais inválidas, autenticação expirada, usuário inativo ou acesso recusado  
3.2.8 Registro do vínculo entre sessão de compra, CNPJ e usuário autenticado  

#### 3.3 Catálogo e consulta de produtos

3.3.1 Sincronização e consulta de produtos a partir do ERP (descrição, SKU, código de barras, preço)  
3.3.2 Consulta de disponibilidade por loja (estoque próprio da unidade)  
3.3.3 Exibição de informações de produto no totem (nome, quantidade, preço, subtotal)  
3.3.4 Regras de indisponibilidade (produto sem estoque, produto inativo, divergência de cadastro)  

#### 3.4 Leitura de código de barras e carrinho de compras

3.4.1 Captura de leitura por leitor de código de barras conectado ao totem  
3.4.2 Inclusão automática do item no carrinho ao ler o código  
3.4.3 Ajuste de quantidades (incrementar, decrementar e remover item)  
3.4.4 Exibição do resumo de compra (itens, quantidades, valores, total)  
3.4.5 Tratamento de código inválido ou não cadastrado (feedback claro na tela)  

#### 3.5 Regras comerciais e condições de pagamento

3.5.1 Cadastro e manutenção de regras por forma de pagamento (ex.: parcela máxima, parcela mínima)  
3.5.2 Definição de limites e elegibilidade por cliente (ex.: crediário disponível apenas para clientes habilitados)  
3.5.3 Configuração de campanhas temporárias (ex.: alterar parcelamento por período)  
3.5.4 Cálculo de opções de parcelamento respeitando regras (total, número de parcelas e valor mínimo)  
3.5.5 Exibição de opções disponíveis no checkout conforme regras aplicáveis  

#### 3.6 Checkout e pagamentos

3.6.1 Tela de seleção e composição de pagamento, permitindo combinar múltiplas formas na mesma compra  
3.6.2 Composição de pagamento parcial por Pix (definição do valor a pagar e geração de QR Code correspondente)  
3.6.3 Composição de pagamento parcial por cartão de débito  
3.6.4 Composição de pagamento parcial por cartão de crédito com parcelamento conforme regras vigentes  
3.6.5 Permitir pagamento com dois cartões distintos na mesma compra (ex.: 2 cartões de crédito, ou crédito + débito)  
3.6.6 Validação automática de fechamento do pagamento (somatório das parcelas/valores deve totalizar o valor final da compra)  
3.6.7 Integração com PIN pad/terminal para pagamentos com cartão (débito e crédito)  
3.6.8 Apresentação automática no PIN pad dos valores e parcelas selecionadas (sem digitação manual pelo cliente)  
3.6.9 Geração de QR Code Pix e instruções de pagamento na tela do totem  
3.6.10 Fluxo de pagamento por crediário/boleto, com envio do pedido ao ERP para geração dos boletos  
3.6.11 Confirmação de pagamento por etapa (por forma) e finalização do pedido no totem somente após quitação integral  
3.6.12 Tratamento de falhas de pagamento parcial (ex.: estorno/retentativa, troca de forma e recomposição do saldo a pagar)  

#### 3.7 Gestão de crediário e limites de crédito

3.7.1 Consulta do limite de crédito do cliente (disponível e utilizado) para exibição no totem  
3.7.2 Validação do limite antes da finalização do pedido em crediário  
3.7.3 Registro do uso do limite após confirmação do pedido  
3.7.4 Atualização do limite conforme retorno do ERP (baixas por pagamentos de boletos e recomposição do limite)  
3.7.5 Bloqueio de venda no crediário para clientes com pagamento em atraso, configurável  

#### 3.8 Integração com ERP HSE

3.8.1 Integração para consulta de clientes (CPF/CNPJ, dados fiscais, elegibilidade e status)  
3.8.2 Integração para consulta/sincronização de produtos, preços e códigos de barras  
3.8.3 Integração para consulta e baixa de estoque por loja  
3.8.4 Integração para envio de pedidos ao ERP com forma de pagamento e condições (ex.: parcelas escolhidas)  
3.8.5 Integração para emissão de nota fiscal via rotinas do ERP após recebimento do pedido  
3.8.6 Integração para geração de boletos e processamento de crediário via rotinas do ERP  
3.8.7 Integração de status do pedido (criado, processado, nota emitida, boleto gerado, concluído)  

#### 3.9 Monitoramento operacional e rastreabilidade de integrações

3.9.1 Registro de logs de eventos do totem (identificação, leitura de itens, pagamento, finalização)  
3.9.2 Registro de logs de integração (requisições, respostas e erros do ERP)  
3.9.3 Painel de acompanhamento de filas e falhas de integração (reprocessamento quando aplicável)  
3.9.4 Relatório de pedidos com divergências (ex.: pedido finalizado no totem e não recebido no ERP)  
3.9.5 Alertas operacionais para ocorrências críticas (ex.: integração indisponível, falha de pagamento)  

#### 3.10 Painel administrativo

3.10.1 Autenticação de usuários administrativos (login e senha)  
3.10.2 Gestão de permissões por perfil (ex.: administrador, financeiro, operador)  
3.10.3 Gestão de lojas, totens e configurações de operação  
3.10.4 Gestão de regras comerciais e condições de pagamento (parcelas, mínimos, campanhas)  
3.10.5 Consulta e exportação de relatórios de vendas por período, loja e forma de pagamento  
3.10.6 Consulta de auditoria de ações administrativas (quem alterou regras e quando)  

#### 3.11 Experiência e interface do totem

3.11.1 Tela inicial com instruções claras para o cliente (fluxo de compra)  
3.11.2 Aplicação de identidade visual (logo, cores e layout) na interface  
3.11.3 Mensagens de validação e orientação durante a compra (ex.: autenticação, produto inválido, pagamento)  
3.11.4 Tela de comprovante/resumo ao final da compra (status do pedido e forma de recebimento)  
3.11.5 Fluxo de cancelamento seguro da compra e limpeza de sessão  

---

### 4. Considerações finais

Este documento consolida as necessidades funcionais para a implementação de um self-checkout integrado ao ERP HSE, com foco em automatizar a operação de loja autônoma, reduzir atividades manuais e permitir a expansão para novas unidades.  

A estrutura apresentada contempla o fluxo completo de identificação do cliente, leitura de produtos, aplicação de regras comerciais, pagamento e integração fiscal/financeira via ERP, servindo como base consistente para elaboração de escopo técnico e orçamento do desenvolvimento.

