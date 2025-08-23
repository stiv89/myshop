import ProductGrid from "../components/ProductGrid";
import Link from "next/link";

export default async function Home() {
  // Traer productos desde la API de Nest
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productos`, {
    cache: "no-store", // asegura que siempre use datos frescos
  });

  // Si hay error en la API, podrías manejarlo acá
  if (!res.ok) {
    return (
      <div className="min-h-screen">
        {/* Hero Section con Error */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenido a Mi Tienda
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Los mejores productos al mejor precio
            </p>
            <div className="bg-red-500/20 backdrop-blur-sm border border-red-300 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-100">No se pudieron cargar los productos.</p>
              <p className="text-red-200 text-sm mt-2">Por favor intenta más tarde.</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const productos = await res.json();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bienvenido a Mi Tienda
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Descubre los mejores productos con la mejor calidad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/productos"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Ver Todos los Productos
            </Link>
            <Link
              href="/contacto"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Productos Destacados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explora nuestra selección de productos más populares y encuentra exactamente lo que necesitas
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
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Próximamente nuevos productos
              </h3>
              <p className="text-gray-500">
                Estamos preparando una increíble selección de productos para ti.
              </p>
            </div>
          ) : (
            <ProductGrid productos={productos.slice(0, 6)} />
          )}

          {productos.length > 6 && (
            <div className="text-center mt-12">
              <Link
                href="/productos"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ver Todos los Productos
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Características */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">¿Por qué elegir Mi Tienda?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">
                Recibe tus productos en 24-48 horas en toda la ciudad
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Calidad Garantizada</h3>
              <p className="text-gray-600">
                Productos de la mejor calidad con garantía incluida
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Atención 24/7</h3>
              <p className="text-gray-600">
                Soporte al cliente disponible cuando lo necesites
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
