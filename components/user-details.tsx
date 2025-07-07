"use client"

import { useState, useEffect } from "react"
import type { User } from "@/types/user"
import { UserPosts } from "./user-posts"

// Props del componente UserDetails
interface UserDetailsProps {
  user: User
}

// Componente que muestra los detalles completos de un usuario
// Incluye información personal, dirección, empresa y posts
export function UserDetails({ user }: UserDetailsProps) {
  // Estado para controlar qué sección está expandida
  const [expandedSection, setExpandedSection] = useState<string>("info")

  // Efecto para resetear la sección expandida cuando cambia el usuario
  useEffect(() => {
    setExpandedSection("info")
  }, [user.id])

  // Función para alternar secciones expandidas
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? "" : section)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header con información básica del usuario */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
        <div className="flex items-center space-x-4">
          {/* Avatar placeholder */}
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
          </div>

          {/* Información básica */}
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-blue-100">@{user.username}</p>
            <p className="text-blue-100">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Navegación por pestañas */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { id: "info", label: "Información", icon: "👤" },
            { id: "posts", label: "Publicaciones", icon: "📝" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => toggleSection(tab.id)}
              className={`
                py-4 px-2 border-b-2 font-medium text-sm transition-colors
                ${
                  expandedSection === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenido de las pestañas */}
      <div className="p-6">
        {/* Pestaña de información personal */}
        {expandedSection === "info" && (
          <div className="space-y-6">
            {/* Información de contacto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Contacto</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 w-20">Email:</span>
                    <span className="text-gray-600">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 w-20">Teléfono:</span>
                    <span className="text-gray-600">{user.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 w-20">Website:</span>
                    <a
                      href={`http://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
              </div>

              {/* Información de dirección */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Dirección</h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    {user.address.street} {user.address.suite}
                  </p>
                  <p>
                    {user.address.city}, {user.address.zipcode}
                  </p>
                  <p className="text-sm text-gray-500">
                    Coordenadas: {user.address.geo.lat}, {user.address.geo.lng}
                  </p>
                </div>
              </div>
            </div>

            {/* Información de la empresa */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Empresa</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-24">Nombre:</span>
                  <span className="text-gray-600">{user.company.name}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-gray-700 w-24">Slogan:</span>
                  <span className="text-gray-600 italic">"{user.company.catchPhrase}"</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-gray-700 w-24">Negocio:</span>
                  <span className="text-gray-600">{user.company.bs}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pestaña de publicaciones */}
        {expandedSection === "posts" && <UserPosts userId={user.id} />}
      </div>
    </div>
  )
}
