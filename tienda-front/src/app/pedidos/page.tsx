"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Tipo de pedido simulado
type Pedido = {
  id: number;
  fecha: string;
  estado: "pendiente" | "procesando" | "enviado" | "entregado" | "cancelado";
  total: number;
  items: {
    id: number;
    nombre: string;
    cantidad: number;
    precio: number;
  }[];
};

const estadoColors = {
  pendiente: "bg-yellow-100 text-yellow-800",
  procesando: "bg-blue-100 text-blue-800",
  enviado: "bg-purple-100 text-purple-800",
  entregado: "bg-green-100 text-green-800",
  cancelado: "bg-red-100 text-red-800"
};

const estadoLabels = {
  pendiente: "Pendiente",
  procesando: "Procesando",
  enviado: "Enviado",
  entregado: "Entregado",
  cancelado: "Cancelado"
};

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de pedidos desde la API
    const cargarPedidos = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Datos simulados - en un caso real vendrían de tu API
      const pedidosSimulados: Pedido[] = [
        {
          id: 12345,
          fecha: "2025-08-22",
          estado: "entregado",
          total: 150000,
          items: [
            { id: 1, nombre: "Producto A", cantidad: 2, precio: 50000 },
            { id: 2, nombre: "Producto B", cantidad: 1, precio: 50000 }
          ]
        },
        {
          id: 12344,
          fecha: "2025-08-20",
          estado: "enviado",
          total: 75000,
          items: [
            { id: 3, nombre: "Producto C", cantidad: 1, precio: 75000 }
          ]
        },
        {
          id: 12343,
          fecha: "2025-08-18",
          estado: "procesando",
          total: 120000,
          items: [
            { id: 4, nombre: "Producto D", cantidad: 3, precio: 40000 }
          ]
        }
      ];
      
      setPedidos(pedidosSimulados);
      setLoading(false);
    };

    cargarPedidos();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Mis Pedidos</h1>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (pedidos.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Mis Pedidos</h1>
        <div className="text-center py-16">
          <svg
            className="mx-auto h-16 w-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            No tienes pedidos aún
          </h2>
          <p className="text-gray-500 mb-6">
            Cuando hagas tu primera compra, aparecerá aquí
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Empezar a Comprar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Mis Pedidos</h1>
      
      <div className="space-y-6">
        {pedidos.map((pedido) => (
          <div key={pedido.id} className="bg-white rounded-lg shadow-md p-6">
            {/* Header del pedido */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 pb-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">
                  Pedido #{pedido.id}
                </h3>
                <p className="text-sm text-gray-500">
                  Realizado el {new Date(pedido.fecha).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${estadoColors[pedido.estado]}`}>
                  {estadoLabels[pedido.estado]}
                </span>
                <span className="text-lg font-bold text-blue-600">
                  Gs. {pedido.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Items del pedido */}
            <div className="space-y-2 mb-4">
              {pedido.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span>
                    {item.nombre} × {item.cantidad}
                  </span>
                  <span className="font-medium">
                    Gs. {(item.precio * item.cantidad).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Ver Detalles
              </button>
              {pedido.estado === "entregado" && (
                <button className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                  Volver a Comprar
                </button>
              )}
              {(pedido.estado === "pendiente" || pedido.estado === "procesando") && (
                <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Cancelar Pedido
                </button>
              )}
              <Link
                href="/contacto"
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-center"
              >
                Soporte
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Información adicional */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3">¿Necesitas ayuda con tu pedido?</h3>
        <p className="text-gray-600 mb-4">
          Si tienes alguna pregunta sobre el estado de tu pedido o necesitas hacer un cambio, 
          estamos aquí para ayudarte.
        </p>
        <Link
          href="/contacto"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          Contáctanos
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
