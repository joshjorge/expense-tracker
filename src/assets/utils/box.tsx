import { z } from 'zod';

function fSchema(description: string, amount: string, category: string) {
  const schema = z.object({
    description: z.string().min(3).max(25),
    amount: z.number().min(1),
    category: z.string().min(1, { message: 'A category must be selected' }),
  });
  return schema;
}

export { fSchema };
