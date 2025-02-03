import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { statusEnum } from "../types/task-status"; 

export async function moveTask(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().patch("/tasks/:id/status", {
        schema: {
            params: z.object({
                id: z.string().uuid(), 
            }),
            body: z.object({
                status: statusEnum, 
            }),
        },
    }, async (request, reply) => {
        const { id } = request.params;
        const { status } = request.body; 

        try {
            if (!["PENDING", "IN_PROGRESS", "DONE"].includes(status)) {
                return reply.status(400).send({
                    error: "Status inválido",
                    details: "O status deve ser 'PENDING', 'IN_PROGRESS' ou 'DONE'.",
                });
            }

            const task = await prisma.task.findUnique({
                where: { id },
            });

            if (!task) {
                return reply.status(404).send({
                    error: "Tarefa não encontrada",
                    details: `Não foi possível encontrar uma tarefa com o id ${id}`,
                });
            }

            const updatedTask = await prisma.task.update({
                where: { id },
                data: { status },
            });

            return reply.status(200).send(updatedTask);
        } catch (error) {
            return reply.status(500).send({
                error: "Erro ao mover a tarefa",
                details: error instanceof Error ? error.message : "Erro desconhecido",
            });
        }
    });
};
