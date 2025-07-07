import { type User, UsersSchema } from "@/types/user"

// URL base de la API REST de JSONPlaceholder
const API_BASE_URL = "https://jsonplaceholder.typicode.com"

// Función para obtener todos los usuarios desde la API REST
// Implementa manejo de errores y validación con Zod
export async function fetchUsers(): Promise<User[]> {
  try {
    // Realizamos la petición HTTP GET
    const response = await fetch(`${API_BASE_URL}/users`)

    // Verificamos que la respuesta sea exitosa
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Parseamos la respuesta JSON
    const data = await response.json()

    // Validamos los datos usando el schema de Zod
    // Esto nos asegura que los datos tienen la estructura correcta
    const validatedUsers = UsersSchema.parse(data)

    return validatedUsers
  } catch (error) {
    // Log del error para debugging
    console.error("Error fetching users:", error)

    // Re-lanzamos el error para que el componente pueda manejarlo
    throw new Error("Failed to fetch users")
  }
}
