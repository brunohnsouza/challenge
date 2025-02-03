import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { statusEnum } from "../types/task-status"; 

const taskResponse = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    status: statusEnum,
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
});

const errorResponse = z.object({
    error: z.string(),
    details: z.string(),
});

export async function getTasks(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get("/tasks", {
        schema: {
            response: {
                200: z.array(taskResponse), 
                500: errorResponse, 
            },
        },
    }, async (request, reply) => {
        try {
            const tasks = await prisma.task.findMany();
            return reply.status(200).send(tasks); 
        } catch (error) {
            return reply.status(500).send({
                error: "Erro ao listar as tarefas",
                details: error instanceof Error ? error.message : "Erro desconhecido",
            });
        }
    });
};
