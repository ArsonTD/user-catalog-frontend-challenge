import { create } from "zustand"
import type { User } from "@/types/user"

// Interface que define el estado y acciones del store
interface UserStore {
  selectedUser: User | null
  setSelectedUser: (user: User | null) => void
}

// Store global usando Zustand para manejar el estado de usuario seleccionado
// Zustand es más simple que Redux y perfecto para estados pequeños a medianos
export const useUserStore = create<UserStore>((set) => ({
  // Estado inicial: ningún usuario seleccionado
  selectedUser: null,

  // Acción para establecer el usuario seleccionado
  // Recibe un usuario o null para deseleccionar
  setSelectedUser: (user) => set({ selectedUser: user }),
}))
