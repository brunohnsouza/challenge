import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { statusEnum } from "../types/task-status";

export async function createTask(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/tasks", {
        schema: {
            body: z.object({
                title: z.string().min(3).max(50),
                description: z.string().min(3).max(255),
                status: statusEnum.default("PENDING"),
            }),
        },
    }, async (request, reply) => {
        const { title, description, status } = request.body;

        try {
            const task = await prisma.task.create({
                data: {
                    title,
                    description,
                    status,
                },
            });

            return { taskId: task.id };
        } catch (error) {
            reply.status(500).send({ message: "Erro ao criar a tarefa", error });
        }
    });
};
