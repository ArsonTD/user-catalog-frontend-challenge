import { z } from "zod"

// Schema de validación para la dirección usando Zod
// Zod nos ayuda a validar y tipar los datos de la API
const AddressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: z.object({
    lat: z.string(),
    lng: z.string(),
  }),
})

// Schema de validación para la empresa
const CompanySchema = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
})

// Schema principal de validación para el usuario
// Define la estructura completa que esperamos de la API
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  address: AddressSchema,
  phone: z.string(),
  website: z.string(),
  company: CompanySchema,
})

// Tipo TypeScript inferido del schema de Zod
// Esto nos da type safety en toda la aplicación
export type User = z.infer<typeof UserSchema>

// Schema para validar arrays de usuarios
export const UsersSchema = z.array(UserSchema)
