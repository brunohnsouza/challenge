# API de Gerenciamento de Tarefas (Back-end)

Esta API permite a gestão de tarefas, com funcionalidades para criar, listar, editar, mover e excluir tarefas. A aplicação utiliza o Fastify para o servidor, Prisma para acesso ao banco de dados e Zod para validação de dados.

## Índice

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Endpoints](#endpoints)
- [Licença](#licença)

## Requisitos

- **Fastify**: ^5.2.1
- **Fastify CORS**: ^10.0.2
- **Prisma Client**: ^6.3.0
- **Zod**: ^3.24.1
- **Fastify Type Provider Zod**: ^4.0.2

## Instalação

## Endpoints

Abaixo estão os principais endpoints da API, com informações sobre os métodos HTTP, descrição, parâmetros, exemplos de solicitações e respostas.

| Endpoint                  | Método | Descrição                             | Parâmetros                   | Exemplo de Solicitação                                            | Exemplo de Resposta             |
| ------------------------- | ------ | ------------------------------------- | ---------------------------- | ----------------------------------------------------------------- | ------------------------------- |
| `/tasks`                  | POST   | Criar uma nova tarefa                 | `title`, `description`, `status` | `POST /tasks {"title": "Tarefa 1", "description": "Descrição", "status": "PENDING"}` | `Status 201 Created, {taskId: "uuid"}` |
| `/tasks`                  | GET    | Listar todas as tarefas               | -                            | `GET /tasks`                                                       | `Status 200 OK, [JSON]`           |
| `/tasks/:id`              | PUT    | Editar título, descrição ou status de uma tarefa | `title`, `description`, `status`      | `PUT /tasks/123e4567-e89b-12d3-a456-426614174000 {"title": "Novo título", "description": "Nova descrição", "status": "Novo status"}` | `Status 200 OK, [JSON]`  |
| `/tasks/:id`              | PATCH  | Mover uma tarefa entre as colunas    | `status`                     | `PATCH /tasks/123e4567-e89b-12d3-a456-426614174000 {"status": "DONE"}` | `Status 200 OK, [JSON]`  |
| `/tasks/:id`              | DELETE | Excluir uma tarefa                   | -                            | `DELETE /tasks/123e4567-e89b-12d3-a456-426614174000`               | `Status 200 OK, {message: "Tarefa excluída com sucesso", taskId: "uuid"}` |

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
