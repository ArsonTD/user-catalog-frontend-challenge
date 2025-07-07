"use client"

import { UserCard } from "./user-card"
import type { User } from "@/types/user"

// Props del componente UserList
interface UserListProps {
  users: User[]
}

// Componente que renderiza la lista de usuarios
// Recibe un array de usuarios y los muestra en cards
export function UserList({ users }: UserListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Usuarios ({users.length})</h2>

      {/* Verificamos si hay usuarios para mostrar */}
      {users.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No se encontraron usuarios</p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Mapeamos cada usuario a un UserCard */}
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}
