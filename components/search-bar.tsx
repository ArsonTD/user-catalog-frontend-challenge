"use client"

// Props del componente SearchBar
interface SearchBarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  placeholder?: string
}

// Componente de barra de búsqueda reutilizable
// Permite filtrar usuarios por nombre con debounce implícito
export function SearchBar({ searchTerm, onSearchChange, placeholder = "Buscar..." }: SearchBarProps) {
  return (
    <div className="relative max-w-md mx-auto">
      {/* Icono de búsqueda */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Input de búsqueda */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="
          block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          placeholder-gray-400 text-gray-900
          transition-colors duration-200
        "
      />

      {/* Botón para limpiar búsqueda */}
      {searchTerm && (
        <button onClick={() => onSearchChange("")} className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <svg
            className="h-4 w-4 text-gray-400 hover:text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
