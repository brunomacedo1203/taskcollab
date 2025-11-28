# i18n (Internacionalização) – Web (`@task-collab/web`)

Este diretório contém a configuração de internacionalização do frontend usando **i18next + react-i18next**.

## Arquivos principais

- `config.ts`
  - Define:
    - `supportedLocales` – idiomas suportados (ex.: `['pt', 'en']`).
    - `Locale` – tipo TypeScript derivado de `supportedLocales`.
    - `defaultLocale` – idioma padrão (`'pt'`).
    - `isSupportedLocale(value)` – helper para validar locais.
- `index.ts`
  - Inicializa o i18next com:
    - Recursos (`resources`) carregados estaticamente.
    - Namespaces: `common`, `header`, `auth`, `tasks`.
    - `fallbackLng`, `supportedLngs`, detecção via `i18next-browser-languagedetector`.
  - É importado em `apps/web/src/main.tsx` via `import './i18n';`.

## Estrutura de mensagens

As mensagens estão em `messages/<locale>/<namespace>.json`:

- `messages/pt/common.json` e `messages/en/common.json`
  - Textos genéricos (botões, labels básicos, etc.).
- `messages/pt/header.json` e `messages/en/header.json`
  - Textos do cabeçalho/navegação.
- `messages/pt/auth.json` e `messages/en/auth.json`
  - Login, registro e mensagens relacionadas a autenticação.
- `messages/pt/tasks.json` e `messages/en/tasks.json`
  - Lista de tarefas, detalhes, botões e textos específicos de tarefas.

### Convenção de chaves

- `common.*` – termos globais:
  - Ex.: `common.save`, `common.cancel`, `common.language.portuguese`.
- `header.*` – cabeçalho e navegação:
  - Ex.: `header.nav.tasks`, `header.auth.login`.
- `auth.*` – telas de login/registro:
  - Ex.: `auth.login.title`, `auth.register.subtitle`.
- `tasks.*` – lista e detalhes de tarefas:
  - Ex.: `tasks.list.title`, `tasks.details.discardTitle`.

## Como usar nos componentes

Exemplo para usar um namespace específico:

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation('tasks');

  return <h1>{t('list.title')}</h1>;
};
```

Para textos mais globais:

```tsx
const { t } = useTranslation('common');
```

## Como mudar o idioma

O componente `LanguageSwitcher` (em `apps/web/src/components/LanguageSwitcher.tsx`) usa:

```tsx
const { i18n } = useTranslation('common');
void i18n.changeLanguage('pt' | 'en');
```

O idioma atual é detectado via:

- `querystring` (`?lng=pt`), depois
- `localStorage`, depois
- idioma do navegador (`navigator.language`).

O valor é persistido em `localStorage` pelo `i18next-browser-languagedetector`.

## Como adicionar um novo idioma

1. Adicionar o locale em `config.ts`:
   - Ex.: `export const supportedLocales = ['pt', 'en', 'es'] as const;`
2. Criar pastas e arquivos:
   - `messages/es/common.json`
   - `messages/es/header.json`
   - `messages/es/auth.json`
   - `messages/es/tasks.json`
3. Registrar os recursos em `index.ts` (objeto `resources`).
4. Preencher as traduções seguindo as mesmas chaves usadas nos outros idiomas.
