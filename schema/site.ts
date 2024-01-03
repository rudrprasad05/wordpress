import { z } from "zod";

export const CreateSiteSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
  authorId: z.string().optional(),
});

export type CreateSiteSchemaType = z.infer<typeof CreateSiteSchema>;
