# ✅ TaskCollab UI Adaptation Checklist

> **Objetivo:** Reaproveitar a base existente (monorepo + microsserviços) e preparar o frontend para a nova proposta de colaboração em tarefas e mensagens.

---

## 1. Validar a base técnica existente

- [x] Executar `pnpm install` na raiz e garantir que os workspaces são instalados sem erros.
- [x] Rodar `docker compose up --build` para verificar containers de Postgres, RabbitMQ, API Gateway e serviços Nest.
- [x] Testar fluxos básicos no Swagger do gateway (`/api/docs`): autenticação, CRUD de tarefas e comentários.
- [x] Confirmar que RabbitMQ e Postgres estão acessíveis (UI ou cli) e que eventos são publicados.

## 2. Definir estratégia de versionamento/projeto

- [ ] Escolher se o novo produto será um fork, um novo repositório remoto ou apenas um branch longo.
- [ ] Configurar remotos/branches e automatizar CI/CD mínimo se necessário.
- [ ] Documentar convenções de commit, versionamento e ferramentas (Turbo, Docker, etc.).

## 3. Direção de UX e branding para colaboração + mensagens

- [ ] Documentar objetivos da nova experiência (personas, principais dores, tom da aplicação).
- [ ] Criar guidlines visuais: cores, tipografia, iconografia, componentes de layout.
- [ ] Montar wireframes ou mockups para dashboards, detalhe de tarefa, área de mensagens/conversas.
- [ ] Mapear estados vazios, mensagens de erro e microcopys alinhados ao novo posicionamento.

## 4. Auditoria do frontend atual (`apps/web`)

- [ ] Listar rotas/páginas existentes (TanStack Router) e como elas consomem os serviços.
- [ ] Levantar componentes compartilhados (layout, cards, formulários) e onde Tailwind/Shadcn são aplicados.
- [ ] Identificar pontos que já exibem comentários/notificações para entender o esforço de reaproveitamento.
- [ ] Revisar stores do Zustand e TanStack Query para saber quais dados já estão disponíveis para as novas telas.

## 5. Plano de conteúdo e linguagem

- [ ] Extrair todas as labels/strings relevantes (menus, botões, tooltips) para atualização.
- [ ] Definir a nova taxonomia: como tarefas, conversas, menções e notificações serão nomeadas.
- [ ] Organizar um checklist de revisão de cópia por tela antes do desenvolvimento.

## 6. Implementação do novo frontend

1. **Fundação visual**
   - [ ] Introduzir tokens/temas (Tailwind config, CSS vars) para refletir o novo branding.
   - [ ] Atualizar componentes globais (Navbar, Sidebar, Cards) para o layout de colaboração + messaging.
2. **Fluxos principais**
   - [ ] Adaptar dashboard de tarefas para destacar colaboração em tempo real (status, responsáveis, menções).
   - [ ] Criar/ajustar painel de conversas ou mensagens ligadas a cada tarefa usando APIs já existentes.
   - [ ] Integrar notificações em tempo real (WebSocket do notifications-service) no novo design.
3. **Ajustes finais**
   - [ ] Revisar acessibilidade (cores, navegação por teclado) após as mudanças.
   - [ ] Atualizar testes e2e/unit se existirem; adicionar cenários críticos.
   - [ ] Atualizar README e checklist com instruções para o novo frontend.

## 7. Validação e próximos passos

- [ ] Executar novamente o stack completo e navegar por todos os fluxos adaptados.
- [ ] Recolher feedback (time, stakeholders, usuários piloto) e priorizar melhorias.
- [ ] Planejar backlog futuro (features de mensagens avançadas, threads, menções, integrações externas).

---

## 8. Execução padrão sem conflitar com o original

> Este repositório agora já está configurado no `docker-compose.yml` para usar nomes/portas/volumes exclusivos.

- [x] Atualizar `docker-compose.yml` com containers e portas exclusivas:
  - Containers: `tc2-web`, `tc2-api-gateway`, `tc2-notifications-service`, `tc2-auth-service`, `tc2-tasks-service`, `tc2-db`, `tc2-rabbitmq`.
  - Portas host: Web `4000`, Gateway `4001`, Notifs `4004`, Postgres `55432`, RabbitMQ `5673/15673`.
  - Volumes: `tc2_postgres_data`, `tc2_rabbitmq_data`.
- [x] Remover `docker-compose.override.yml` (não é mais necessário).
- [ ] Ajustar o frontend para apontar para o novo gateway:
  - Em `apps/web/.env`, definir `VITE_API_BASE_URL=http://localhost:4001/api` e `VITE_WS_URL=ws://localhost:4004`.
- [ ] Subir o stack: `docker compose up --build`
  - RabbitMQ UI: `http://localhost:15673`.
  - Postgres (host): `localhost:55432` (user `postgres`, pass `password`).
- [ ] Se o projeto original estiver rodando, pare-o ou garanta portas diferentes. Caso esteja parado, não haverá conflito.
- [ ] Documentar portas e URLs no README para o time.

## 9. Conversas e notificações

- [x] Criar rota `/conversations` protegida que lê do store de notificações.
- [x] Implementar `apps/web/src/routes/Conversations.tsx` com cards que destacam título, corpo e timestamp das notificações.
- [x] Adicionar link ativo “Conversations” no header para alternar entre tarefas e mensagens.
