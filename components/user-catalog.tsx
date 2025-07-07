"use client"

import { useState } from "react"
import { UserList } from "./user-list"
import { UserDetails } from "./user-details"
import { SearchBar } from "./search-bar"
import { useUserStore } from "@/store/user-store"
import { useUsers } from "@/hooks/use-users"

// Componente principal que maneja la lógica del catálogo
// Aquí coordinamos la búsqueda, selección de usuarios y vista de detalles
export function UserCatalog() {
  // Estado local para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("")

  // Obtenemos el usuario seleccionado del store global
  const { selectedUser } = useUserStore()

  // Hook personalizado para manejar la lógica de usuarios
  const { users, loading, error, filteredUsers } = useUsers(searchTerm)

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header de la aplicación */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Catálogo de Usuarios</h1>
        <p className="text-gray-600">Explora usuarios y sus publicaciones usando REST API y GraphQL</p>
      </header>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Buscar usuarios por nombre..." />
      </div>

      {/* Manejo de estados de carga y error */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Cargando usuarios...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">Error al cargar usuarios: {error}</p>
        </div>
      )}

      {/* Layout principal: Lista de usuarios y detalles */}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de usuarios - ocupa 1 columna en mobile, 1 de 3 en desktop */}
          <div className="lg:col-span-1">
            <UserList users={filteredUsers} />
          </div>

          {/* Detalles del usuario - ocupa 1 columna en mobile, 2 de 3 en desktop */}
          <div className="lg:col-span-2">
            {selectedUser ? (
              <UserDetails user={selectedUser} />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Selecciona un usuario</h3>
                <p className="text-gray-500">
                  Haz clic en cualquier usuario de la lista para ver sus detalles y publicaciones
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
