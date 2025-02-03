import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function deleteTask(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().delete("/tasks/:id", {
        schema: {
            params: z.object({
                id: z.string().uuid(),
            }),
        },
    }, async (request, reply) => {
        const { id } = request.params;

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

            await prisma.task.delete({
                where: { id },
            });

            return reply.status(200).send({
                message: "Tarefa excluída com sucesso",
                taskId: id,
            });
        } catch (error) {
            return reply.status(500).send({
                error: "Erro ao excluir a tarefa",
                details: error instanceof Error ? error.message : "Erro desconhecido",
            });
        }
    });
};
