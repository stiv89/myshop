import { Suspense } from "react";
import ProductGrid from "../../components/ProductGrid";
import { ProductCardSkeleton } from "../../components/LoadingSpinner";

interface ProductosPageProps {
  searchParams: { buscar?: string };
}

export default async function ProductosPage({ searchParams }: ProductosPageProps) {
  const busqueda = searchParams.buscar || "";
  
  // Traer productos desde la API de Nest
  const url = busqueda 
    ? `${process.env.NEXT_PUBLIC_API_URL}/productos?buscar=${encodeURIComponent(busqueda)}`
    : `${process.env.NEXT_PUBLIC_API_URL}/productos`;
    
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">
          {busqueda ? `Resultados para "${busqueda}"` : "Todos los Productos"}
        </h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-700">
            No se pudieron cargar los productos en este momento.
          </p>
          <p className="text-red-600 text-sm mt-2">
            Por favor intenta nuevamente más tarde.
          </p>
        </div>
      </div>
    );
  }

  const productos = await res.json();

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {busqueda ? `Resultados para "${busqueda}"` : "Todos los Productos"}
        </h1>
        <p className="text-gray-600">
          {busqueda 
            ? `${productos.length} producto(s) encontrado(s)`
            : "Descubre nuestra amplia selección de productos"
          }
        </p>
      </div>

      {productos.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-16 w-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            {busqueda ? "No se encontraron productos" : "No hay productos disponibles"}
          </h2>
          <p className="text-gray-500">
            {busqueda 
              ? "Intenta con otros términos de búsqueda"
              : "Estamos trabajando para traerte los mejores productos."
            }
          </p>
        </div>
      ) : (
        <Suspense fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        }>
          <ProductGrid productos={productos} />
        </Suspense>
      )}
    </div>
  );
}
