import z from "zod";
import { vogSchema } from "@/schema/schema";

export type vogForm = z.infer<typeof vogSchema>;
