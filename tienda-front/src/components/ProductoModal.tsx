"use client";

import { useState, useEffect } from "react";
import { crearProducto, actualizarProducto, type Producto, type CrearProducto } from "@/lib/api";

interface ProductoModalProps {
  producto?: Producto | null;
  onClose: (actualizado?: boolean) => void;
}

export default function ProductoModal({ producto, onClose }: ProductoModalProps) {
  const [formData, setFormData] = useState<CrearProducto>({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    imagenUrl: "",
    categoria: "",
    activo: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre,
        descripcion: producto.descripcion || "",
        precio: producto.precio,
        stock: producto.stock,
        imagenUrl: producto.imagenUrl || "",
        categoria: producto.categoria || "",
        activo: producto.activo !== false,
      });
    }
  }, [producto]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (producto) {
        await actualizarProducto(producto.id, formData);
      } else {
        await crearProducto(formData);
      }
      onClose(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar producto");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" 
        ? (e.target as HTMLInputElement).checked
        : type === "number" 
          ? Number(value) 
          : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {producto ? "Editar Producto" : "Nuevo Producto"}
          </h2>
          <button
            onClick={() => onClose()}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-red-700">{error}</div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Producto *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Descripción */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe el producto..."
              />
            </div>

            {/* Precio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio (Gs.) *
              </label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                min="0"
                step="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* URL de Imagen */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de la Imagen
              </label>
              <input
                type="url"
                name="imagenUrl"
                value={formData.imagenUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <input
                type="text"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ej: Electrónicos"
              />
            </div>

            {/* Estado */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="activo"
                checked={formData.activo}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Producto activo
              </label>
            </div>
          </div>

          {/* Vista previa de imagen */}
          {formData.imagenUrl && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vista Previa
              </label>
              <div className="relative">
                <img
                  src={formData.imagenUrl}
                  alt="Vista previa"
                  className="w-32 h-32 object-cover rounded-md border"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={() => onClose()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Guardando..." : (producto ? "Actualizar" : "Crear")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
