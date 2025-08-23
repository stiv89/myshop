"use client";

import { useState, useEffect } from "react";
import { getProductos, eliminarProducto, type Producto } from "@/lib/api";
import ProductoModal from "@/components/ProductoModal";

export default function AdminProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await getProductos();
      setProductos(data);
    } catch (err) {
      setError("Error al cargar productos");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      return;
    }

    try {
      await eliminarProducto(id);
      setProductos(productos.filter(p => p.id !== id));
    } catch (err) {
      alert("Error al eliminar producto");
      console.error("Error:", err);
    }
  };

  const handleEditar = (producto: Producto) => {
    setProductoEditando(producto);
    setModalOpen(true);
  };

  const handleNuevo = () => {
    setProductoEditando(null);
    setModalOpen(true);
  };

  const handleModalClose = (actualizado?: boolean) => {
    setModalOpen(false);
    setProductoEditando(null);
    if (actualizado) {
      cargarProductos();
    }
  };

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    (producto.descripcion && producto.descripcion.toLowerCase().includes(filtro.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Productos</h1>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={cargarProductos}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Productos</h1>
        <button
          onClick={handleNuevo}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Nuevo Producto
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-sm text-gray-500">
            Mostrando {productosFiltrados.length} de {productos.length} productos
          </div>
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productosFiltrados.map((producto) => (
                <tr key={producto.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16">
                        {producto.imagenUrl ? (
                          <img
                            className="h-16 w-16 rounded-md object-cover"
                            src={producto.imagenUrl}
                            alt={producto.nombre}
                          />
                        ) : (
                          <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {producto.nombre}
                        </div>
                        <div className="text-sm text-gray-500">
                          {producto.descripcion && producto.descripcion.length > 50
                            ? `${producto.descripcion.substring(0, 50)}...`
                            : producto.descripcion
                          }
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Gs. {producto.precio.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{producto.stock}</div>
                    {producto.stock <= 5 && (
                      <div className="text-xs text-orange-600">Stock bajo</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      producto.activo !== false
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {producto.activo !== false ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditar(producto)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(producto.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {productosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay productos</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filtro ? "No se encontraron productos con ese filtro." : "Comienza agregando tu primer producto."}
            </p>
            {!filtro && (
              <div className="mt-6">
                <button
                  onClick={handleNuevo}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  + Agregar Producto
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <ProductoModal
          producto={productoEditando}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
