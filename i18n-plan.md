# Plano de Implementação de i18n (TaskCollab Web)

Este arquivo descreve, em formato de checklist, os passos para implementar internacionalização no frontend (`apps/web`) usando **i18next + react-i18next**.

## Checkpoint 1 – Decisões Iniciais

- [x] Definir idiomas suportados (ex.: `pt`, `en`).
- [x] Definir `defaultLocale` (ex.: `pt`).
- [x] Listar domínios/namespaces de texto:
  - [x] `common` (rótulos genéricos, botões, mensagens padrão).
  - [x] `header` (menus, links de navegação, login/logout).
  - [x] `auth` (login, registro, textos de formulários).
  - [x] `tasks` (lista de tarefas, detalhes, estados).
  - [x] Outros que fizerem sentido (`notifications`, etc.).
- [x] Confirmar estratégia de URL **sem** prefixo de idioma:
  - [x] Rotas continuam como `/tasks`, `/conversations`, etc.
  - [x] Locale definido por detecção + preferência persistida.

## Checkpoint 2 – Instalação e Estrutura de Pastas

- [x] Instalar dependências na app web:
  - [x] `pnpm --filter @task-collab/web add i18next react-i18next i18next-browser-languagedetector`
- [x] Criar estrutura base em `apps/web/src/i18n`:
  - [x] Arquivo `apps/web/src/i18n/config.ts` com:
    - [x] Lista de locales suportados (`supportedLocales`).
    - [x] Tipo `Locale`.
    - [x] `defaultLocale`.
  - [x] Pastas de mensagens:
    - [x] `apps/web/src/i18n/messages/en/`
    - [x] `apps/web/src/i18n/messages/pt/`
  - [x] Arquivos iniciais de mensagens (podem começar mínimos):
    - [x] `messages/en/common.json`
    - [x] `messages/en/header.json`
    - [x] `messages/en/auth.json`
    - [x] `messages/en/tasks.json`
    - [x] `messages/pt/common.json`
    - [x] `messages/pt/header.json`
    - [x] `messages/pt/auth.json`
    - [x] `messages/pt/tasks.json`
- [x] (Opcional) Criar `apps/web/src/i18n/README.md` explicando:
  - [x] Convenções de nomes de chaves.
  - [x] Como adicionar novas línguas.

## Checkpoint 3 – Configuração do i18next

- [x] Criar `apps/web/src/i18n/index.ts`:
  - [x] Importar `i18next`, `initReactI18next` e `i18next-browser-languagedetector`.
  - [x] Importar os JSONs de `pt` e `en` para cada namespace definido.
  - [x] Chamar:
    - [x] `.use(LanguageDetector)`.
    - [x] `.use(initReactI18next)`.
    - [x] `.init({ ... })` com:
      - [x] `resources` contendo `pt` e `en` com `common`, `header`, `auth`, `tasks`.
      - [x] `fallbackLng: 'pt'`.
      - [x] `supportedLngs: ['pt', 'en']`.
      - [x] `ns: ['common', 'header', 'auth', 'tasks']`.
      - [x] `defaultNS: 'common'`.
      - [x] `detection` (ordem: `querystring`, `localStorage`, `navigator`; caches: `localStorage`).
      - [x] `interpolation: { escapeValue: false }`.
      - [x] `debug: import.meta.env.DEV`.
      - [x] `returnNull: false`.
- [ ] (Opcional para o futuro) Planejar lazy loading:
  - [ ] Avaliar uso de imports dinâmicos para namespaces maiores.

## Checkpoint 4 – Integração com o App React

- [x] Atualizar `apps/web/src/main.tsx`:
  - [x] Importar `./i18n` no topo do arquivo, antes de qualquer uso de hooks/React:
    - [x] `import './i18n';`
  - [x] Manter configuração atual de `QueryClientProvider`, `ToastProvider` e `RouterProvider`.
- [ ] (Opcional) Criar um `I18nProvider` dedicado se for necessário tratar `Suspense` ou comportamento específico.

## Checkpoint 5 – Estado de Idioma e Persistência

- [x] Decidir estratégia de estado:
  - [x] Opção A (Simples): usar apenas `i18n.language` e `i18n.changeLanguage()`.
  - [ ] Opção B (Com Zustand): criar store dedicado.
- [ ] (Se escolher Zustand) Criar `apps/web/src/features/i18n/store.ts`:
  - [ ] Estado `language: Locale`.
  - [ ] Ação `setLanguage(locale)` que:
    - [ ] Chama `i18n.changeLanguage(locale)`.
    - [ ] Persiste em `localStorage` (se necessário, além do próprio i18next).
  - [ ] Inicializar estado a partir de `i18n.language`.
  - [ ] (Opcional) Assinar evento `i18n.on('languageChanged', ...)` para manter o store sincronizado.

## Checkpoint 6 – Language Switcher e UX

- [x] Criar `apps/web/src/components/LanguageSwitcher.tsx`:
  - [x] Usar `useTranslation()` para acessar `i18n` e `t`.
  - [x] Renderizar controles para troca de idioma:
    - [x] Botões (`PT`, `EN`) ou dropdown.
    - [x] Chamar `i18n.changeLanguage('pt')`, `i18n.changeLanguage('en')` conforme seleção.
  - [x] Estilizar com componentes de UI já usados (ex.: `Button`).
- [x] Integrar o switcher no `Header`:
  - [x] Versão desktop: ao lado de login/notificações.
  - [x] Versão mobile: dentro do menu colapsado.
- [x] Adicionar textos do próprio switcher aos JSONs (ex.: `language.portuguese`, `language.english` em `common.json`).

## Checkpoint 7 – Migração Gradual dos Textos

- [x] Definir chaves iniciais nos JSONs:
  - [x] `common.json`: botões genéricos (`save`, `cancel`, `loading`, etc.).
  - [x] `header.json`: título da app e navegação (`title`, `nav.tasks`, `nav.conversations`, `nav.login`, `nav.register`).
  - [x] `auth.json`: textos de login/registro (rótulos de campos, títulos, botões, mensagens de erro).
  - [x] `tasks.json`: cabeçalhos de tabela, estados de tarefa, mensagens de vazio.
- [x] Migrar componentes principais:
  - [x] `apps/web/src/components/Header.tsx`:
    - [x] Importar `useTranslation('header')`.
    - [x] Substituir textos hard-coded (`Tarefas`, `Conversations`, `Login`, `Registrar`, etc.) por `t('...')`.
  - [x] Rotas de autenticação:
    - [x] `apps/web/src/routes/Login.tsx` usando `useTranslation('auth')`.
    - [x] `apps/web/src/routes/Register.tsx` usando `useTranslation('auth')`.
  - [x] Rotas de tarefas:
    - [x] `apps/web/src/routes/TasksList.tsx` usando `useTranslation('tasks')`.
    - [x] `apps/web/src/routes/TaskDetails.tsx` usando `useTranslation('tasks')`.
  - [x] Outros componentes com textos visíveis:
    - [x] `NotificationsDropdown`, `ConfirmDialog`, `CommentsSection`, etc.
- [ ] Migrar toasts, mensagens de erro e labels:
  - [ ] Mensagens de validação de formulário exibidas no UI.
  - [x] Placeholders de inputs e tooltips.
  - [x] Mensagens de “estado vazio” e “carregando”.

## Checkpoint 8 – Integração com TanStack Router e Títulos

- [ ] (Opcional) Criar hook `usePageTitle(key: string)`:
  - [ ] Internamente usar `useTranslation()` para pegar `t`.
  - [ ] Atualizar `document.title` com base em `t(key)`.
- [ ] Utilizar o hook nas rotas principais:
  - [ ] `HomePage`.
  - [ ] `TasksListPage`.
  - [ ] `TaskDetailsPage`.
  - [ ] Outras rotas relevantes.
- [ ] Se houver breadcrumbs ou textos da navegação baseados em rota:
  - [ ] Garantir chaves em `pages.*` (`pages.home.title`, `pages.tasksList.title`, etc.).

## Checkpoint 9 – Configurações Finais e Boas Práticas

- [x] Confirmar opções em `i18n.init`:
  - [x] `debug: import.meta.env.DEV`.
  - [x] `returnNull: false`.
- [x] Em `apps/web/src/i18n/config.ts`:
  - [x] Exportar `supportedLocales`.
  - [x] Exportar `isSupportedLocale(value: string): value is Locale`.
- [ ] Documentar no README do frontend (`apps/web/README.md` ou seção no root):
  - [ ] Como adicionar novo idioma (pasta, JSONs, registro em `config.ts`).
  - [ ] Como adicionar novas chaves.
  - [ ] Padrão de nomenclatura de chaves por domínio.

## Checkpoint 10 – Testes Manuais e Ajustes

- [ ] Rodar o app (`pnpm dev` na web ou `docker compose up`).
- [ ] Testar troca de idioma:
  - [ ] Alternar idioma via `LanguageSwitcher`.
  - [ ] Confirmar atualização imediata de textos na UI.
- [ ] Testar persistência:
  - [ ] Recarregar página e verificar se idioma permanece.
- [ ] Verificar rotas:
  - [ ] Páginas públicas (`/login`, `/register`).
  - [ ] Páginas autenticadas (`/`, `/tasks`, `/tasks/:id`, `/conversations`).
- [ ] Garantir que:
  - [ ] Toasts, modais e mensagens de erro estão traduzidos.
  - [ ] Não há textos hard-coded restantes em PT/EN que deveriam estar nos JSONs.
