import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  images: z.array(z.string()),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().nonnegative(),
  isActive: z.boolean().default(true),
  tags: z.array(z.string()),
  category: z.enum(['watch','cloth','shoe']).default('watch'),
  // optional fields
  brand: z.string().optional(),
  gender: z.enum(['men', 'women', 'unisex']).default('men').optional(),
  material: z.string().optional(),
  features: z.array(z.string()).optional(),
  sizeOptions: z.array(z.string()).optional()
});

export type ProductType = z.infer<typeof productSchema>;
