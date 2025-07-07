import { type Post, PostsSchema } from "@/types/post"

// URL de la API GraphQL
const GRAPHQL_URL = "https://graphqlzero.almansi.me/api"

// Query GraphQL para obtener posts de un usuario específico
// Utilizamos variables para hacer la query reutilizable
const GET_USER_POSTS_QUERY = `
  query GetUserPosts($userId: ID!) {
    user(id: $userId) {
      posts {
        data {
          id
          title
          body
          user {
            id
          }
        }
      }
    }
  }
`

// Función para obtener posts de un usuario usando GraphQL
// Implementa manejo de errores y validación con Zod
export async function fetchUserPosts(userId: number): Promise<Post[]> {
  try {
    // Configuramos la petición GraphQL
    const response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_USER_POSTS_QUERY,
        variables: {
          userId: userId.toString(),
        },
      }),
    })

    // Verificamos que la respuesta sea exitosa
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Parseamos la respuesta JSON
    const result = await response.json()

    // Verificamos si hay errores en la respuesta GraphQL
    if (result.errors) {
      throw new Error(`GraphQL error: ${result.errors[0].message}`)
    }

    // Extraemos los posts de la respuesta anidada
    const posts = result.data?.user?.posts?.data || []

    // Transformamos los datos para que coincidan con nuestro tipo Post
    const transformedPosts = posts.map((post: any) => ({
      id: Number.parseInt(post.id),
      title: post.title,
      body: post.body,
      userId: Number.parseInt(post.user.id),
    }))

    // Validamos los datos usando el schema de Zod
    const validatedPosts = PostsSchema.parse(transformedPosts)

    return validatedPosts
  } catch (error) {
    // Log del error para debugging
    console.error("Error fetching user posts:", error)

    // Re-lanzamos el error para que el componente pueda manejarlo
    throw new Error("Failed to fetch user posts")
  }
}
