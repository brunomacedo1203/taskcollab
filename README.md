# 🚀 TaskCollab — Full-Stack Collaboration Platform

TaskCollab is a full-stack web application designed to manage tasks, comments, and real-time notifications.  
It was built with a **microservices architecture** using **NestJS**, **RabbitMQ**, **PostgreSQL**, and a **React + Vite** frontend.

This project was developed as a learning experience to master modern full-stack architecture — combining APIs, message-driven communication, and WebSocket integration for real-time collaboration.

---

## 🧩 Architecture Overview

**Backend:**

- NestJS microservices (`auth-service`, `tasks-service`, `notifications-service`)
- PostgreSQL for relational data storage
- RabbitMQ for async event communication
- API Gateway with JWT authentication and rate-limiting

**Frontend:**

- React + Vite + Tailwind CSS + shadcn/ui
- Zustand for state management
- TanStack Router & TanStack Query
- WebSocket client for real-time updates

---

## ⚙️ Running the Project

### Prerequisites

- Docker & Docker Compose
- Node.js v20+

### Installation

```bash
npm install
docker compose up --build
```
