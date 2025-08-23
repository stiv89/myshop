"use client";

import { useState, useEffect } from "react";
import { getPedidos, actualizarEstadoPedido, type Pedido } from "@/lib/api";

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

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<string>("");
  const [pedidoDetalle, setPedidoDetalle] = useState<Pedido | null>(null);

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      setLoading(true);
      // Datos simulados mientras no esté la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const pedidosSimulados: Pedido[] = [
        {
          id: 1,
          clienteNombre: "Juan Pérez",
          clienteEmail: "juan@email.com",
          clienteTelefono: "+595981123456",
          direccion: "Av. España 123",
          ciudad: "Asunción",
          estado: "pendiente",
          total: 150000,
          fechaCreacion: "2025-08-22T10:30:00Z",
          items: [
            {
              id: 1,
              productoId: 1,
              producto: { id: 1, nombre: "Producto A", precio: 50000, stock: 10 },
              cantidad: 2,
              precio: 50000
            },
            {
              id: 2,
              productoId: 2,
              producto: { id: 2, nombre: "Producto B", precio: 50000, stock: 5 },
              cantidad: 1,
              precio: 50000
            }
          ]
        },
        {
          id: 2,
          clienteNombre: "María González",
          clienteEmail: "maria@email.com",
          estado: "procesando",
          total: 75000,
          fechaCreacion: "2025-08-21T15:20:00Z",
          items: [
            {
              id: 3,
              productoId: 3,
              producto: { id: 3, nombre: "Producto C", precio: 75000, stock: 8 },
              cantidad: 1,
              precio: 75000
            }
          ]
        },
        {
          id: 3,
          clienteNombre: "Carlos Rodríguez",
          clienteEmail: "carlos@email.com",
          estado: "enviado",
          total: 200000,
          fechaCreacion: "2025-08-20T09:15:00Z",
          items: [
            {
              id: 4,
              productoId: 4,
              producto: { id: 4, nombre: "Producto D", precio: 100000, stock: 3 },
              cantidad: 2,
              precio: 100000
            }
          ]
        }
      ];
      
      setPedidos(pedidosSimulados);
    } catch (err) {
      setError("Error al cargar pedidos");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCambiarEstado = async (pedidoId: number, nuevoEstado: string) => {
    try {
      await actualizarEstadoPedido(pedidoId, nuevoEstado);
      setPedidos(pedidos.map(p => 
        p.id === pedidoId ? { ...p, estado: nuevoEstado as any } : p
      ));
    } catch (err) {
      alert("Error al actualizar estado del pedido");
      console.error("Error:", err);
    }
  };

  const pedidosFiltrados = filtroEstado 
    ? pedidos.filter(p => p.estado === filtroEstado)
    : pedidos;

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Pedidos</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center justify-between p-4 border rounded">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-8 w-20 bg-gray-200 rounded"></div>
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
          onClick={cargarPedidos}
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
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Pedidos</h1>
        <div className="text-sm text-gray-500">
          {pedidosFiltrados.length} pedidos
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFiltroEstado("")}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              !filtroEstado 
                ? "bg-blue-100 text-blue-800" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todos
          </button>
          {Object.entries(estadoLabels).map(([estado, label]) => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                filtroEstado === estado
                  ? estadoColors[estado as keyof typeof estadoColors]
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {label} ({pedidos.filter(p => p.estado === estado).length})
            </button>
          ))}
        </div>
      </div>

      {/* Lista de pedidos */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {pedidosFiltrados.map((pedido) => (
            <div key={pedido.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Pedido #{pedido.id}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${estadoColors[pedido.estado]}`}>
                    {estadoLabels[pedido.estado]}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">
                    Gs. {pedido.total.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(pedido.fechaCreacion).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Cliente</h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-900">{pedido.clienteNombre}</p>
                    {pedido.clienteEmail && (
                      <p className="text-sm text-gray-600">{pedido.clienteEmail}</p>
                    )}
                    {pedido.clienteTelefono && (
                      <p className="text-sm text-gray-600">{pedido.clienteTelefono}</p>
                    )}
                    {pedido.direccion && (
                      <p className="text-sm text-gray-600">
                        {pedido.direccion}
                        {pedido.ciudad && `, ${pedido.ciudad}`}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Productos</h4>
                  <div className="space-y-1">
                    {pedido.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.producto.nombre} × {item.cantidad}</span>
                        <span className="font-medium">
                          Gs. {(item.precio * item.cantidad).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center pt-4 border-t">
                <div className="flex flex-wrap gap-2">
                  {pedido.estado === "pendiente" && (
                    <>
                      <button
                        onClick={() => handleCambiarEstado(pedido.id, "procesando")}
                        className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700"
                      >
                        Procesar
                      </button>
                      <button
                        onClick={() => handleCambiarEstado(pedido.id, "cancelado")}
                        className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700"
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                  {pedido.estado === "procesando" && (
                    <button
                      onClick={() => handleCambiarEstado(pedido.id, "enviado")}
                      className="bg-purple-600 text-white px-3 py-1 text-sm rounded hover:bg-purple-700"
                    >
                      Marcar como Enviado
                    </button>
                  )}
                  {pedido.estado === "enviado" && (
                    <button
                      onClick={() => handleCambiarEstado(pedido.id, "entregado")}
                      className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700"
                    >
                      Marcar como Entregado
                    </button>
                  )}
                </div>
                
                <button
                  onClick={() => setPedidoDetalle(pedido)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        {pedidosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay pedidos</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filtroEstado ? "No hay pedidos con ese estado." : "No se han recibido pedidos aún."}
            </p>
          </div>
        )}
      </div>

      {/* Modal de detalle */}
      {pedidoDetalle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">
                Detalle del Pedido #{pedidoDetalle.id}
              </h2>
              <button
                onClick={() => setPedidoDetalle(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Información del cliente */}
              <div>
                <h3 className="text-lg font-medium mb-3">Información del Cliente</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><strong>Nombre:</strong> {pedidoDetalle.clienteNombre}</p>
                  {pedidoDetalle.clienteEmail && (
                    <p><strong>Email:</strong> {pedidoDetalle.clienteEmail}</p>
                  )}
                  {pedidoDetalle.clienteTelefono && (
                    <p><strong>Teléfono:</strong> {pedidoDetalle.clienteTelefono}</p>
                  )}
                  {pedidoDetalle.direccion && (
                    <p><strong>Dirección:</strong> {pedidoDetalle.direccion}</p>
                  )}
                  {pedidoDetalle.ciudad && (
                    <p><strong>Ciudad:</strong> {pedidoDetalle.ciudad}</p>
                  )}
                  {pedidoDetalle.notas && (
                    <p><strong>Notas:</strong> {pedidoDetalle.notas}</p>
                  )}
                </div>
              </div>

              {/* Productos */}
              <div>
                <h3 className="text-lg font-medium mb-3">Productos</h3>
                <div className="space-y-3">
                  {pedidoDetalle.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.producto.nombre}</p>
                        <p className="text-sm text-gray-600">
                          Precio unitario: Gs. {item.precio.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">× {item.cantidad}</p>
                        <p className="text-lg font-bold text-blue-600">
                          Gs. {(item.precio * item.cantidad).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">
                    Gs. {pedidoDetalle.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
