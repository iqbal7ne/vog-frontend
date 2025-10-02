import { z } from "zod";

export const vogSchema = z.object({
  area: z.string(),
  NIK: z.string().min(7).max(7),
  problem: z.string(),
});
