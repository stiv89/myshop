"use client";

import { useState } from "react";

export default function AdminConfiguracionPage() {
  const [configuracion, setConfiguracion] = useState({
    nombreTienda: "Mi Tienda Online",
    descripcion: "La mejor tienda online para tus compras",
    email: "info@mitienda.com",
    telefono: "+595 21 123-4567",
    whatsapp: "+595 981 123-456",
    direccion: "Av. Principal 123, Asunción, Paraguay",
    moneda: "PYG",
    simboloMoneda: "Gs.",
    envioGratis: 100000,
    tiempoEntrega: "24-48 horas",
    metodosEnvio: ["Entrega a domicilio", "Retiro en tienda"],
    metodosPago: ["Efectivo", "Transferencia", "Tarjeta"],
    notificacionesEmail: true,
    notificacionesWhatsApp: true,
    mostrarStock: true,
    permitirComentarios: true
  });

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setConfiguracion(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleArrayChange = (name: string, index: number, value: string) => {
    setConfiguracion(prev => ({
      ...prev,
      [name]: (prev[name as keyof typeof prev] as string[]).map((item, i) => 
        i === index ? value : item
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setMensaje("Configuración guardada exitosamente");
    setTimeout(() => setMensaje(""), 3000);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
      </div>

      {mensaje && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-green-700">{mensaje}</div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información General */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Información General</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la Tienda
              </label>
              <input
                type="text"
                name="nombreTienda"
                value={configuracion.nombreTienda}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={configuracion.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={configuracion.descripcion}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Contacto */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Información de Contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={configuracion.telefono}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={configuracion.whatsapp}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección
              </label>
              <input
                type="text"
                name="direccion"
                value={configuracion.direccion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Configuración de Ventas */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Configuración de Ventas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Moneda
              </label>
              <select
                name="moneda"
                value={configuracion.moneda}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="PYG">Guaraníes (PYG)</option>
                <option value="USD">Dólares (USD)</option>
                <option value="EUR">Euros (EUR)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Símbolo de Moneda
              </label>
              <input
                type="text"
                name="simboloMoneda"
                value={configuracion.simboloMoneda}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Envío Gratis Desde (mínimo)
              </label>
              <input
                type="number"
                name="envioGratis"
                value={configuracion.envioGratis}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tiempo de Entrega
              </label>
              <input
                type="text"
                name="tiempoEntrega"
                value={configuracion.tiempoEntrega}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Métodos de Envío */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Métodos de Envío</h2>
          <div className="space-y-2">
            {configuracion.metodosEnvio.map((metodo, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={metodo}
                  onChange={(e) => handleArrayChange("metodosEnvio", index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Métodos de Pago */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Métodos de Pago</h2>
          <div className="space-y-2">
            {configuracion.metodosPago.map((metodo, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={metodo}
                  onChange={(e) => handleArrayChange("metodosPago", index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Configuraciones Adicionales */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Configuraciones Adicionales</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="notificacionesEmail"
                checked={configuracion.notificacionesEmail}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Enviar notificaciones por email
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="notificacionesWhatsApp"
                checked={configuracion.notificacionesWhatsApp}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Enviar notificaciones por WhatsApp
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="mostrarStock"
                checked={configuracion.mostrarStock}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Mostrar stock en productos
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="permitirComentarios"
                checked={configuracion.permitirComentarios}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Permitir comentarios en productos
              </label>
            </div>
          </div>
        </div>

        {/* Botón Guardar */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Guardando..." : "Guardar Configuración"}
          </button>
        </div>
      </form>
    </div>
  );
}
