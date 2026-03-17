## Planejamento – MVP Frontend Self-Checkout

Baseado em `planejamento-mvp-frontend.mdc` e no `escopo-cliente.md`.

Foco deste MVP: **somente frontend**, com:
- Área Admin (login + dashboard + gestão de lojas/terminais).  
- Tela de Self Checkout (totem) com fluxo básico de compra (mockado).  
Pronto para evoluir depois com backend/integrações reais.

---

## RESUMO DAS FASES DO FRONTEND

| Fase              | Status   | Observação                                                 |
|-------------------|----------|------------------------------------------------------------|
| FASE 0: Setup     | Concluída | Next.js + TS + Tailwind, estrutura base                  |
| FASE 1: Login     | Concluída | Tela de login admin + validações                         |
| FASE 2: Shell     | Concluída | Layout admin (dashboard + navegação)                      |
| FASE 3: Páginas   | Pendente | Telas admin (lojas/terminais) e self-checkout (mock)      |
| FASE 4: Ready API | Pendente | Front pronto para plugar backend/ERP HSE e demais APIs    |

---

## FASE 0 – Setup do Projeto

**Objetivo:** Criar a base técnica do frontend, pronta para evoluir.

- Criar projeto **Next.js (App Router) + TypeScript**.  
- Configurar **Tailwind CSS**.  
- Configurar aliases de import (ex.: `@/components`, `@/lib`).  
- Definir estrutura mínima de pastas:
  - `app/` – rotas (`/login`, `/app`, `/totem`).  
  - `components/` – layout, inputs, botões, etc.  
  - `lib/` – serviços/API mocks (`auth`, `stores`, `products`, `orders`).  
  - `styles/`.  
- (Opcional) Configurar `next-themes` (tema claro/escuro).  
- (Opcional) Configurar `next-intl` se multi-idioma for requisito.  
- Declarar **interfaces/types** para chamadas futuras (sem implementação real):
  - `loginAdmin`, `getStores`, `getTerminals`, `getProductByBarcode`, `submitOrder`.

---

## FASE 1 – Tela de Login Admin (Mockada)

**Objetivo:** Ter uma tela de login funcional e visualmente profissional para o **Administrador da plataforma**, pronta para plugar autenticação real depois.

Inclui:

- Página `/login` com layout inspirado no projeto `Notas-fiscais`:
  - layout em **dois painéis** (esquerda: branding; direita: card de login);
  - **paleta azul** como cor principal (gradientes, botões, focos de input);
  - campos de e-mail/usuário e senha;  
  - validação de formulário com **react-hook-form + zod**;  
  - mensagens de erro amigáveis;  
  - botão de mostrar/ocultar senha utilizando ícones (`lucide-react`).
- Botão “Entrar” que hoje:
  - chama uma função `fakeLoginAdmin` em `lib/services/auth` que simula resposta de sucesso/erro;  
  - em caso de sucesso, grava usuário mock em contexto/estado (helper em `lib/auth`) e redireciona para `/app/dashboard`.  
- Definição do contrato futuro para login real:

```markdown
POST /api/auth/login
Body: { email: string; password: string }
Sucesso: { token: string; user: { id: string; name: string; role: 'admin' } }
Erro: { message: string }
```

---

## FASE 2 – Shell da Área Admin (Layout + Navegação)

**Objetivo:** Criar o “esqueleto” da aplicação pós-login, para a **Área Admin**, seguindo o padrão de layout do projeto `Notas-fiscais` (sidebar fixa + header).

Inclui:

- Layout autenticado em `/app`:
  - Header fixo com nome do sistema, usuário logado (mock) e ações básicas.  
  - Sidebar fixa na esquerda com links para:
    - `/app/dashboard` (Dashboard)  
    - `/app/stores` (Lojas)  
    - `/app/terminals` (Totens)  
    - `/app/settings` (Configurações – opcional no MVP)  
  - Responsividade: sidebar colapsável em mobile, com overlay ao abrir (padrão similar aos layouts `admin/financeiro/fornecedor` do `Notas-fiscais`).  
  - Paleta azul aplicada a header, sidebar ativa e estados de foco.
- “Guard de rota” simples no `layout.tsx` de `/app`:
  - leitura de usuário admin mockado do `localStorage` via helper em `lib/auth`;  
  - estado intermediário de “Carregando...” enquanto o guard valida;  
  - se não houver usuário admin, redirecionar para `/login`.  
- Dashboard (`/app/dashboard`) com cards mockados:
  - total de lojas, total de totens, resumo de “vendas do dia” fake.

---

## FASE 3 – Telas Principais (Admin + Self Checkout) em Modo Mock

**Objetivo:** Ter as telas chave para demonstração e validação de fluxo, com dados fictícios.

### 3.1 Telas da Área Admin (conforme escopo do cliente)

- **Lojas (`/app/stores`)**
  - Lista mock de lojas: Nome, Código, Status, Estoque vinculado (texto).  
  - Ação “Nova loja” abrindo modal/form simples (atualiza lista mock em memória).  

- **Totens (`/app/terminals`)**
  - Lista de totens por loja (com seletor de loja fake).  
  - Colunas: ID do totem, Loja, Status, Última utilização.  
  - Botão “Novo totem” para simular associação de totem à loja.  

- **Configurações de regras comerciais (`/app/settings`)** – opcional no MVP, mas recomendável
  - Campos mock para:
    - parcelas máximas;  
    - parcela mínima;  
    - habilitar crediário;  
    - período de campanhas.  
  - Salvando em estado local apenas para demonstrar UX (sem persistência real).

### 3.2 Tela de Self Checkout (Totem)

- Rota `/totem` representando o terminal na loja.  
- Fluxo mockado:

1. **Identificação do cliente**
   - Campos para CNPJ e identificador de usuário (texto) + botão “Continuar”.  
   - Função `fakeAuthCustomer` em `lib/services/auth` validando combinações mock.  

2. **Leitura de produtos**
   - Campo para “código de barras” + botão “Adicionar”.  
   - Ao informar um código (ex.: `12345`), buscar produto em `mockProducts` e adicionar ao carrinho.  

3. **Carrinho**
   - Lista de itens com: nome, quantidade (botões +/−), preço unitário e subtotal.  
   - Exibição do total da compra.  

4. **Pagamento (mock)**
   - Seção de formas de pagamento disponíveis:  
     - Pix  
     - Cartão de débito  
     - Cartão de crédito (selector de parcelas)  
     - Crediário/Boleto  
   - Botão “Finalizar compra” que chama `fakeSubmitOrder` em `lib/services/orders`, retornando:  
     - número de pedido mock,  
     - mensagem de sucesso.  
   - Tela de confirmação com resumo da compra (itens, total, forma de pagamento, “pedido nº XXXX”).  

> Tudo ainda mockado, mas com fluxo muito próximo do esperado pelo escopo do cliente.

---

## FASE 4 – Ready for API / Backend

**Objetivo:** Garantir que o frontend esteja pronto para integrar com backend/ERP HSE sem grandes refações.

Checklist:

- Todos os acessos a dados passando por serviços em `lib/`:
  - `authService` – login admin mock, autenticação cliente mock.  
  - `storeService` – listar lojas, listar totens.  
  - `productService` – buscar produto por código de barras, listar produtos mock.  
  - `orderService` – submissão de pedido mock.  
- Definidos os **tipos/contratos TS**: `Store`, `Terminal`, `Product`, `Order`, `Customer`, `AdminUser`.  
- Páginas não acessam mocks diretamente; usam apenas os serviços em `lib/`.  
- Documentados (em comentários ou markdown curto) os contratos esperados para integrações reais:
  - login admin,  
  - autenticação cliente (CNPJ/usuário),  
  - consulta de produto por código de barras,  
  - submissão de pedido para ERP.  

---

## Boas Práticas para este MVP

- Não acoplar dados mockados diretamente às páginas – sempre via camada de serviço.  
- Priorizar clareza de fluxo (login → dashboard → gestão → totem), não perfeição visual.  
- Indicar, em comentários ou em ambiente de demo, que os dados são fictícios.  
- Preparar estados de loading/erro nas telas principais, pensando em React Query no futuro.  

---

Com este planejamento, o MVP frontend entrega:

- Login admin funcional (mock).  
- Área Admin com dashboard, gestão básica de lojas e totens.  
- Tela de self-checkout (totem) com fluxo completo simulado (identificação, leitura, carrinho, pagamento).  

E fica pronto para, na próxima etapa, receber backend real e integrações com ERP HSE, API fiscal e meios de pagamento, seguindo a regra de `planejamento-projetos.mdc`.

