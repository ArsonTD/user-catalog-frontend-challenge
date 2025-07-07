"use client"

import type { User } from "@/types/user"
import { useUserStore } from "@/store/user-store"

// Props del componente UserCard
interface UserCardProps {
  user: User
}

// Componente individual para cada usuario en la lista
// Muestra información básica y permite seleccionar el usuario
export function UserCard({ user }: UserCardProps) {
  // Obtenemos funciones del store para manejar la selección
  const { selectedUser, setSelectedUser } = useUserStore()

  // Verificamos si este usuario está seleccionado actualmente
  const isSelected = selectedUser?.id === user.id

  // Función para manejar el clic en la card
  const handleClick = () => {
    setSelectedUser(user)
  }

  return (
    <div
      onClick={handleClick}
      className={`
        p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
        hover:shadow-md hover:scale-[1.02]
        ${isSelected ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 bg-white hover:border-gray-300"}
      `}
    >
      {/* Header con nombre y username */}
      <div className="flex items-center justify-between mb-2">
        <h3 className={`font-semibold ${isSelected ? "text-blue-900" : "text-gray-900"}`}>{user.name}</h3>
        <span className={`text-sm ${isSelected ? "text-blue-600" : "text-gray-500"}`}>@{user.username}</span>
      </div>

      {/* Email del usuario */}
      <p className={`text-sm mb-2 ${isSelected ? "text-blue-700" : "text-gray-600"}`}>{user.email}</p>

      {/* Información de la empresa */}
      <div className={`text-xs ${isSelected ? "text-blue-600" : "text-gray-500"}`}>
        <span className="font-medium">Empresa:</span> {user.company.name}
      </div>

      {/* Indicador visual de selección */}
      {isSelected && (
        <div className="mt-2 flex items-center text-blue-600">
          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs font-medium">Seleccionado</span>
        </div>
      )}
    </div>
  )
}
