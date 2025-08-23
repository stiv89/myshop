"use client";

import { useState, useEffect, useCallback } from "react";
import { FilterState } from "@/components/ProductFilters";

export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  imagenUrl?: string;
}

export function useProducts(initialSearch?: string) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filteredProductos, setFilteredProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(initialSearch || "");

  const fetchProductos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const url = searchTerm 
        ? `${process.env.NEXT_PUBLIC_API_URL}/productos?buscar=${encodeURIComponent(searchTerm)}`
        : `${process.env.NEXT_PUBLIC_API_URL}/productos`;
        
      const response = await fetch(url, { cache: "no-store" });
      
      if (!response.ok) {
        throw new Error("Error al cargar productos");
      }
      
      const data = await response.json();
      setProductos(data);
      setFilteredProductos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  const applyFilters = useCallback((filters: FilterState) => {
    let filtered = [...productos];

    // Filtrar por stock
    if (filters.inStock) {
      filtered = filtered.filter(p => p.stock > 0);
    }

    // Filtrar por rango de precios
    filtered = filtered.filter(p => 
      p.precio >= filters.priceRange[0] && p.precio <= filters.priceRange[1]
    );

    // Ordenar
    switch (filters.sortBy) {
      case "nombre-asc":
        filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case "nombre-desc":
        filtered.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      case "precio-asc":
        filtered.sort((a, b) => a.precio - b.precio);
        break;
      case "precio-desc":
        filtered.sort((a, b) => b.precio - a.precio);
        break;
      case "newest":
        // Asumimos que los más nuevos tienen ID más alto
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    setFilteredProductos(filtered);
  }, [productos]);

  const search = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return {
    productos: filteredProductos,
    loading,
    error,
    searchTerm,
    search,
    applyFilters,
    refetch: fetchProductos
  };
}
