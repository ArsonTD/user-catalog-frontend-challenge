"use client"

import { useState, useEffect, useMemo } from "react"
import type { User } from "@/types/user"
import { fetchUsers } from "@/services/api-service"

// Hook personalizado para manejar la lógica de usuarios
// Encapsula la lógica de fetch, filtrado y estados de carga
export function useUsers(searchTerm: string) {
  // Estados para manejar usuarios, carga y errores
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Efecto para cargar usuarios al montar el componente
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true)
        setError(null)

        // Llamada a la API REST para obtener usuarios
        const fetchedUsers = await fetchUsers()
        setUsers(fetchedUsers)
      } catch (err) {
        console.error("Error fetching users:", err)
        setError("Error al cargar los usuarios")
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  // Memoización del filtrado de usuarios para optimizar rendimiento
  // Solo se recalcula cuando cambian users o searchTerm
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) {
      return users
    }

    // Filtrado case-insensitive por nombre
    return users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [users, searchTerm])

  // Retornamos todos los valores necesarios para el componente
  return {
    users,
    loading,
    error,
    filteredUsers,
  }
}
