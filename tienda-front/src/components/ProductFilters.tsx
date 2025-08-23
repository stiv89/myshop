"use client";

import { useState } from "react";

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  totalProducts: number;
}

export interface FilterState {
  sortBy: "precio-asc" | "precio-desc" | "nombre-asc" | "nombre-desc" | "newest";
  priceRange: [number, number];
  inStock: boolean;
}

export default function ProductFilters({ onFilterChange, totalProducts }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    sortBy: "nombre-asc",
    priceRange: [0, 1000000],
    inStock: false
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {totalProducts} producto(s) encontrado(s)
          </span>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden flex items-center text-blue-600 font-medium"
          >
            Filtros
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Ordenar por:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange({ 
              sortBy: e.target.value as FilterState["sortBy"] 
            })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="nombre-asc">Nombre A-Z</option>
            <option value="nombre-desc">Nombre Z-A</option>
            <option value="precio-asc">Precio: Menor a Mayor</option>
            <option value="precio-desc">Precio: Mayor a Menor</option>
            <option value="newest">Más Recientes</option>
          </select>
        </div>
      </div>

      {/* Filtros expandibles en móvil */}
      <div className={`mt-4 space-y-4 ${showFilters ? "block" : "hidden sm:block"}`}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Rango de precios */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rango de Precios (Gs.)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange[0] || ""}
                onChange={(e) => handleFilterChange({
                  priceRange: [Number(e.target.value) || 0, filters.priceRange[1]]
                })}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange[1] || ""}
                onChange={(e) => handleFilterChange({
                  priceRange: [filters.priceRange[0], Number(e.target.value) || 1000000]
                })}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              />
            </div>
          </div>

          {/* Solo productos en stock */}
          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => handleFilterChange({ inStock: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Solo en stock</span>
            </label>
          </div>

          {/* Botón limpiar filtros */}
          <div className="flex items-end">
            <button
              onClick={() => {
                const defaultFilters: FilterState = {
                  sortBy: "nombre-asc",
                  priceRange: [0, 1000000],
                  inStock: false
                };
                setFilters(defaultFilters);
                onFilterChange(defaultFilters);
              }}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
