# 🚀 TaskCollab — Comandos Essenciais (Cheat Sheet)

Este documento reúne **todos os comandos úteis**, organizados para consulta rápida durante o desenvolvimento, debug, build e execução via Docker ou modo local.

---

# 🐳 DOCKER MODE

## Subir ambiente

```
docker compose up --build     # se houve alterações
docker compose up             # sem alterações
docker compose up -d          # detached mode
```

## Reconstruir apenas um serviço

```
docker compose up --build web
```

## Logs

```
docker compose logs -f web
docker compose logs -f api-gateway
docker compose logs -f notifications-service
```

## Containers

```
docker ps                     # listar containers
docker compose stop           # parar containers
docker compose down           # parar + remover
docker compose down -v        # parar + remover + volumes (limpa dados)
```

## RabbitMQ (debug)

```
# Criar fila temporária
docker compose exec rabbitmq rabbitmqadmin -u admin -p admin   declare queue name=debug-tasks-events durable=false

# Bind
docker compose exec rabbitmq rabbitmqadmin -u admin -p admin   declare binding source=tasks.events destination=debug-tasks-events routing_key='#'

# Consumir mensagens
docker compose exec rabbitmq rabbitmqadmin -u admin -p admin   get queue=debug-tasks-events count=10

# Remover fila
docker compose exec rabbitmq rabbitmqadmin -u admin -p admin   delete queue name=debug-tasks-events
```

---

# 💻 LOCAL MODE (DESENVOLVIMENTO RÁPIDO)

## Frontend (hot reload)

```
pnpm --filter @task-collab/web dev
```

URL: http://localhost:5173

## Backend (cada serviço em um terminal)

```
pnpm --filter @task-collab/api-gateway dev
pnpm --filter @task-collab/tasks-service dev
pnpm --filter @task-collab/notifications-service dev
```

## Build / Preview

```
pnpm build                                   # Build do monorepo
pnpm --filter @task-collab/web build         # Frontend apenas
pnpm --filter @task-collab/web preview       # Servir build
```

---

# 🧱 Migrations (TypeORM)

```
docker compose exec auth-service pnpm run migration:run
docker compose exec tasks-service pnpm run migration:run
docker compose exec notifications-service pnpm run migration:run
```

---

# 🩺 Health Checks

## Gateway

```
curl -sfS http://localhost:4001/api/health
```

## Serviços internos (de dentro do gateway)

```
docker compose exec api-gateway wget -qO- http://tasks-service:3003/health
docker compose exec api-gateway wget -qO- http://notifications-service:3004/health
```

---

# 🐇 RabbitMQ

## Interface web

URL: http://localhost:15673  
Login: admin  
Senha: admin

---

# 🔐 Autenticação / JWT

## Login via curl

```
curl -X POST http://localhost:4001/api/auth/login   -H "Content-Type: application/json"   -d '{"email":"user@example.com","password":"123456"}'
```

## Testar rota protegida

```
curl -H "Authorization: Bearer $ACCESS_TOKEN"   http://localhost:4001/api/tasks
```

---

# 🌐 WebSocket (Notificações em tempo real)

## Instalar cliente WebSocket

```
pnpm add -g wscat
```

## Conectar

```
wscat -c "ws://localhost:4004/ws?token=$ACCESS_TOKEN"
```

---

# 🔍 Diagnóstico rápido

```
docker compose logs --tail=50
docker compose logs --tail=50 web
docker compose logs --tail=50 api-gateway
docker stats
```

---

# 📘 URLs Principais

## Frontend

- Docker: http://localhost:4000
- Dev: http://localhost:5173
- Preview: http://localhost:4173

## Backend

- Gateway Swagger: http://localhost:4001/api/docs

## Infra

- RabbitMQ UI: http://localhost:15673
- PostgreSQL (host): localhost:55432
  - DB: taskcollab_db
  - User: postgres

---

# 🎯 REFERÊNCIA RÁPIDA — Qual comando usar?

## Desenvolvimento rápido (Frontend com hot reload)

```
pnpm --filter @task-collab/web dev
http://localhost:5173
```

## Testar a aplicação completa como produção

```
docker compose up --build
http://localhost:4000
```

## Testar build local antes do Docker

```
pnpm --filter @task-collab/web build
pnpm --filter @task-collab/web preview

```

# CRUD no Banco de Dados --- DBeaver, SQL e Docker

## 1. CRUD via DBeaver

### CREATE

```sql
INSERT INTO users (id, username, email, password)
VALUES ('uuid-aqui', 'alice', 'alice@example.com', '$2b$10$hash');
```

### READ

```sql
SELECT * FROM users;
```

### UPDATE

```sql
UPDATE users
SET email = 'bob@example.com'
WHERE id = 'a584adf7-ce06-4b62-a73c-63f0afd7e8ac';
```

### DELETE

```sql
DELETE FROM users WHERE id = 'uuid-do-usuario';
```

---

## 2. CRUD via SQL Puro (psql)

### CREATE

```sql
INSERT INTO users (id, username, email)
VALUES ('uuid-aqui', 'carol', 'carol@example.com');
```

### READ

```sql
SELECT * FROM users WHERE email = 'carol@example.com';
```

### UPDATE

```sql
UPDATE users
SET username = 'carol_updated'
WHERE email = 'carol@example.com';
```

### DELETE

```sql
DELETE FROM users WHERE username = 'carol_updated';
```

---

## 3. CRUD via Docker + psql

### CREATE

```bash
docker exec -it tc2-db psql -U postgres -d taskcollab_db   -c "INSERT INTO users (id, username, email) VALUES ('uuid', 'eric', 'eric@example.com');"
```

### READ

```bash
docker exec -it tc2-db psql -U postgres -d taskcollab_db   -c "SELECT * FROM users;"
```

### UPDATE

```bash
docker exec -it tc2-db psql -U postgres -d taskcollab_db   -c "UPDATE users SET email='eric_new@example.com' WHERE username='eric';"
```

### DELETE

```bash
docker exec -it tc2-db psql -U postgres -d taskcollab_db   -c "DELETE FROM users WHERE username='eric';"
```
