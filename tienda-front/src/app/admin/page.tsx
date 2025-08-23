"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getEstadisticas, type Producto } from "@/lib/api";

interface Estadisticas {
  totalProductos: number;
  totalPedidos: number;
  ventasHoy: number;
  ventasMes: number;
  productosPopulares: Array<{ producto: Producto; ventas: number }>;
}

export default function AdminDashboard() {
  const [estadisticas, setEstadisticas] = useState<Estadisticas | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      setLoading(true);
      // Como la API aún no está implementada, usamos datos simulados
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const estadisticasSimuladas: Estadisticas = {
        totalProductos: 25,
        totalPedidos: 142,
        ventasHoy: 15750000,
        ventasMes: 89650000,
        productosPopulares: [
          {
            producto: { id: 1, nombre: "Producto A", precio: 50000, stock: 10 },
            ventas: 45
          },
          {
            producto: { id: 2, nombre: "Producto B", precio: 75000, stock: 5 },
            ventas: 32
          },
          {
            producto: { id: 3, nombre: "Producto C", precio: 120000, stock: 8 },
            ventas: 28
          }
        ]
      };
      
      setEstadisticas(estadisticasSimuladas);
    } catch (err) {
      setError("Error al cargar estadísticas");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={cargarEstadisticas}
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Última actualización: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Productos</p>
              <p className="text-2xl font-semibold text-gray-900">
                {estadisticas?.totalProductos || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Pedidos</p>
              <p className="text-2xl font-semibold text-gray-900">
                {estadisticas?.totalPedidos || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ventas Hoy</p>
              <p className="text-2xl font-semibold text-gray-900">
                Gs. {(estadisticas?.ventasHoy || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ventas del Mes</p>
              <p className="text-2xl font-semibold text-gray-900">
                Gs. {(estadisticas?.ventasMes || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/productos"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Gestionar Productos</h3>
              <p className="text-sm text-gray-500 mt-1">
                Agregar, editar o eliminar productos
              </p>
            </div>
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <Link
          href="/admin/pedidos"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Ver Pedidos</h3>
              <p className="text-sm text-gray-500 mt-1">
                Revisar y gestionar pedidos
              </p>
            </div>
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <Link
          href="/admin/configuracion"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Configuración</h3>
              <p className="text-sm text-gray-500 mt-1">
                Ajustes de la tienda
              </p>
            </div>
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Productos Populares */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Productos Más Vendidos</h2>
          <div className="space-y-4">
            {estadisticas?.productosPopulares.map((item, index) => (
              <div key={item.producto.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.producto.nombre}
                    </p>
                    <p className="text-sm text-gray-500">
                      Gs. {item.producto.precio.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {item.ventas} ventas
                  </p>
                  <p className="text-sm text-gray-500">
                    Stock: {item.producto.stock}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
