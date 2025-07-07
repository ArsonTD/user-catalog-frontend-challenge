"use client"

import { UserCatalog } from "@/components/user-catalog"

// Componente principal de la aplicación
// Este es el punto de entrada donde renderizamos nuestro catálogo de usuarios
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Container principal con padding responsivo */}
      <div className="container mx-auto px-4 py-8">
        <UserCatalog />
      </div>
    </main>
  )
}
