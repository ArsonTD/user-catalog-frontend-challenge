"use client"

import { useState, useEffect } from "react"
import type { Post } from "@/types/post"
import { fetchUserPosts } from "@/services/graphql-service"

// Props del componente UserPosts
interface UserPostsProps {
  userId: number
}

// Componente que maneja las publicaciones del usuario usando GraphQL
// Muestra los posts obtenidos desde la API de GraphQL
export function UserPosts({ userId }: UserPostsProps) {
  // Estados para manejar posts, carga y errores
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Efecto para cargar posts cuando cambia el userId
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true)
        setError(null)

        // Llamada a la API GraphQL para obtener posts del usuario
        const userPosts = await fetchUserPosts(userId)
        setPosts(userPosts)
      } catch (err) {
        console.error("Error fetching posts:", err)
        setError("Error al cargar las publicaciones")
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [userId])

  // Estado de carga
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Cargando publicaciones...</span>
      </div>
    )
  }

  // Estado de error
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
      </div>
    )
  }

  // Estado sin posts
  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-gray-500">Este usuario no tiene publicaciones</p>
      </div>
    )
  }

  // Renderizado de posts
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Publicaciones ({posts.length})</h3>

      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* Título del post */}
            <h4 className="text-lg font-semibold text-gray-900 mb-2 capitalize">{post.title}</h4>

            {/* Contenido del post */}
            <p className="text-gray-600 leading-relaxed">{post.body}</p>

            {/* Footer con ID del post */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">Post #{post.id}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
