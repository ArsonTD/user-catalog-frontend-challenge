import { z } from "zod"

// Schema de validación para los posts usando Zod
// Define la estructura que esperamos de la API GraphQL
export const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
})

// Tipo TypeScript inferido del schema
export type Post = z.infer<typeof PostSchema>

// Schema para validar arrays de posts
export const PostsSchema = z.array(PostSchema)
