import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { statusEnum } from "../types/task-status";

const updateTaskSchema = z.object({
    title: z.string().min(3).max(50).optional(),
    description: z.string().min(3).max(255).optional(),
    status: statusEnum.optional(),
});

export async function updateTask(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().put("/tasks/:id", {
        schema: {
            params: z.object({
                id: z.string().uuid(),
            }),
            body: updateTaskSchema,
        },
    }, async (request, reply) => {
        const { id } = request.params;
        const { title, description, status } = request.body;

        try {
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
                data: {
                    title: title ?? task.title, 
                    description: description ?? task.description, 
                    status: status ?? task.status,
                },
            });

            return reply.status(200).send(updatedTask);
        } catch (error) {
            return reply.status(500).send({
                error: "Erro ao atualizar a tarefa",
                details: error instanceof Error ? error.message : "Erro desconhecido",
            });
        }
    });
};
