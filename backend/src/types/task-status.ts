import { z } from "zod";

export const statusEnum = z.enum(["PENDING", "IN_PROGRESS", "DONE"]);

export type TaskStatus = z.infer<typeof statusEnum>;
