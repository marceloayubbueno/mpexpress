## Proposta de Desenvolvimento  
### Sistema de Self-Checkout para Loja Autônoma integrado ao ERP HSE

### 1. Objetivo do Projeto

Desenvolver um sistema de **self-checkout (totem)** para loja autônoma de autopeças focada em ar-condicionado automotivo, integrado ao **ERP HSE**, permitindo que **clientes previamente cadastrados (empresas/oficinas B2B)** realizem compras diretamente no totem da loja, com:

- Leitura de produtos por código de barras e montagem do carrinho.
- Seleção de formas de pagamento (Pix, cartão de débito, cartão de crédito com parcelamento e crediário via boleto).
- Envio automático do pedido para o ERP HSE, que será responsável por emissão de nota fiscal, controle de estoque e geração de boletos/crediário.

O objetivo é **automatizar o processo de venda**, reduzir operações manuais e criar uma base estável para expansão do modelo para novas unidades.

Prazo estimado de implantação: **8 a 12 semanas** (aprox. 60 a 90 dias) após aprovação desta proposta e disponibilização das credenciais de integrações externas.

---

### 2. Componentes do Sistema

A solução será composta pelos seguintes módulos principais:

- **Gestão de lojas e terminais self-checkout**  
  - Cadastro e gestão de lojas/unidades (cada loja com estoque próprio no ERP).  
  - Cadastro e associação de totens por loja, com parâmetros de funcionamento (idioma, identidade visual, instruções).

- **Painel administrativo e gestão de loja**  
  - Área Admin: configuração de integrações, regras comerciais (parcelas, mínimos, crediário), visão consolidada de vendas e integrações.  
  - Área de Gestão de Loja: visão da operação da unidade (vendas, estoque via ERP, pedidos e status retornados do HSE).

- **Interface de self-checkout no totem**  
  - Identificação/autenticação do cliente (CNPJ e usuário autorizado, com senha e 2FA).  
  - Leitura de produtos por código de barras e montagem do carrinho.  
  - Aplicação de regras comerciais e apresentação das opções de pagamento disponíveis.  
  - Finalização da compra e envio do pedido ao ERP HSE.

- **Integração com ERP HSE e API Fiscal**  
  - Consulta de clientes, produtos, preços e estoque.  
  - Envio de pedidos com formas de pagamento/parcelas.  
  - Gatilho para emissão de nota fiscal, geração de boletos e atualização de limite de crédito.  
  - Integração com API fiscal (ex.: eNotas ou NFe.io) para consulta/armazenamento de dados de NF-e/NFC-e.

- **Regras comerciais e de pagamento**  
  - Parametrização central de regras por forma de pagamento (parcelamento máximo, valor mínimo de parcela, elegibilidade de crediário).  
  - Campanhas temporárias (ajuste de condições por período).

- **Logs e monitoramento operacional**  
  - Registro de eventos do totem (identificação, leitura, pagamento, finalização).  
  - Monitoramento de integrações com o ERP e APIs externas, com destaque para falhas e divergências (ex.: pedido finalizado no totem e não processado no HSE).

---

### 3. Etapas de Implantação

#### 3.1 Fase de Mapeamento

- Revisão conjunta do documento de levantamento de necessidades do cliente.  
- Mapeamento dos fluxos por área (Admin, Gestão de Loja, Totem, Fiscal).  
- Alinhamento técnico das integrações com ERP HSE, gateway de pagamento e API fiscal.  
- Detalhamento de campos, regras de negócio (parcelamento, limites, bloqueios) e formatos de troca de dados.

#### 3.2 Fase de Desenvolvimento e Integração

- Desenvolvimento da área administrativa e gestão de lojas (Admin + Gestão de Loja).  
- Desenvolvimento da interface de operação do totem (self-checkout).  
- Implementação das integrações com ERP HSE, provedor fiscal e meios de pagamento.  
- Implementação de logs, relatórios e monitoramento operacional.

#### 3.3 Fase de Testes, Implantação e Treinamento

- Testes integrados (totem ↔ plataforma ↔ ERP HSE ↔ pagamentos/fiscal).  
- Ajustes operacionais conforme cenários reais de uso.  
- Implantação e acompanhamento da **primeira unidade**.  
- Treinamento remoto para a equipe do cliente (administração e operação da loja autônoma).

---

### 4. Observações Técnicas

- O sistema será desenvolvido contemplando os módulos descritos nesta proposta, garantindo uma solução completa para operação do self-checkout integrado ao ERP HSE.  
- O desenvolvimento seguirá boas práticas de engenharia de software, segurança da informação e arquitetura de sistemas.  
- O tratamento de dados seguirá princípios alinhados à **Lei Geral de Proteção de Dados (LGPD)**.  
- Ao final da implantação, será realizada a **entrega do código-fonte** do sistema ao cliente, que será o **proprietário da solução**.  
- Evoluções, integrações adicionais ou novas funcionalidades poderão ser desenvolvidas posteriormente mediante orçamento específico.

---

### 5. Investimento

#### 5.1 Implantação do Sistema

**Valor total de implantação (mapeamento + desenvolvimento + implantação do sistema multiunidades com configuração da primeira loja): R$ 12.000,00**

Inclui:
- Fase de mapeamento e detalhamento.  
- Desenvolvimento dos módulos descritos (Admin, Gestão de Loja, Totem, integrações).  
- Integração com ERP HSE, API fiscal e gateway de pagamento (um gateway a definir em conjunto).  
- Implantação do sistema já preparado para múltiplas unidades e configuração da primeira loja.  
- Primeiro treinamento operacional remoto.

#### 5.2 Manutenção e Hospedagem

**R$ 450,00 / mês por loja (plano inicial)**

Inclui:
- Hospedagem da aplicação em infraestrutura gerenciada (servidor, backups, atualizações de segurança).  
- Suporte técnico remoto em horário comercial.  
- Correções e estabilidade do sistema.  
- Até **4 horas/mês** de pequenas melhorias operacionais e ajustes evolutivos.

Este é o **plano inicial** de manutenção e pode ser revisto futuramente caso haja aumento relevante de demanda, número de lojas ou volume de desenvolvimento recorrente.

Horas adicionais de desenvolvimento (além das 4 horas mensais incluídas) poderão ser orçadas e contratadas conforme necessidade.

---

### 6. Condições Comerciais

- **Validade da proposta**: 15 dias a partir da data de envio.  
- **Início do projeto**: o desenvolvimento será iniciado após aprovação desta proposta e confirmação do pagamento inicial.  
- **Forma de pagamento da implantação**:
  - Até **3x no Pix** (parcelas mensais iguais, sem juros).  
  - Em **mais vezes no cartão de crédito**, **com juros**, conforme condições do gateway (p.ex. 4x, 6x ou 12x, a definir com o cliente).  
- **Formas de pagamento aceitas**:
  - Pix  
  - Cartão de crédito  
  - Boleto bancário (à vista)  
- Com a aprovação desta proposta, será elaborado um **contrato detalhado** formalizando escopo, prazos, responsabilidades, propriedade do código e condições de manutenção/hospedagem, para assinatura entre as partes.  
- Junto com o contrato, será criado um **plano de ação detalhado em ferramenta de gestão de tarefas (ex.: Trello)** para acompanhar as entregas e etapas de desenvolvimento/implantação de forma transparente.  

