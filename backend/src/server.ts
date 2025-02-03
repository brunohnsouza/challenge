import cors from '@fastify/cors';
import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { createTask } from './routes/create-task';
import { deleteTask } from './routes/delete-task';
import { getTasks } from './routes/get-tasks';
import { moveTask } from './routes/move-task';
import { updateTask } from './routes/update-task';
import { env } from './types/env';

const app = fastify();

app.register(cors, {
    origin: '*',
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTask);
app.register(getTasks);
app.register(updateTask);
app.register(moveTask);
app.register(deleteTask);

app.listen({ port: env.PORT }).then(() => {
    console.log('Server is running on port 3333');
})