import z from "zod";
import { vogSchema } from "./schema/schema";

type vogForm = z.infer<typeof vogSchema>;
