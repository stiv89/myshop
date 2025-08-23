import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <div className="text-6xl">😕</div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Página no encontrada
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver al Inicio
          </Link>
          <Link
            href="/productos"
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Ver Productos
          </Link>
        </div>
      </div>
    </div>
  );
}
