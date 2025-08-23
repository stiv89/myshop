"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCart, getCartTotal, clearCart, type CartItem } from "@/lib/cart";
import { crearPedido } from "@/lib/api";

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    clienteNombre: "",
    clienteEmail: "",
    clienteTelefono: "",
    direccion: "",
    ciudad: "",
    notas: ""
  });
  const router = useRouter();

  useEffect(() => {
    const currentCart = getCart();
    if (currentCart.length === 0) {
      router.push("/carrito");
      return;
    }
    setCart(currentCart);
    setTotal(getCartTotal());
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clienteNombre.trim()) {
      alert("Por favor ingresa tu nombre");
      return;
    }

    setIsSubmitting(true);

    try {
      const items = cart.map(item => ({
        productoId: item.productoId,
        cantidad: item.cantidad
      }));

      const pedido = await crearPedido({
        clienteNombre: formData.clienteNombre,
        clienteEmail: formData.clienteEmail || undefined,
        items
      });

      // Limpiar carrito
      clearCart();
      
      // Redirigir a página de confirmación
      router.push(`/pedido-confirmado?id=${pedido.id}`);
      
    } catch (error) {
      console.error("Error al crear pedido:", error);
      alert("Hubo un error al procesar tu pedido. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario de datos */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Información de Contacto</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo *
              </label>
              <input
                type="text"
                name="clienteNombre"
                value={formData.clienteNombre}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="clienteEmail"
                value={formData.clienteEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="clienteTelefono"
                value={formData.clienteTelefono}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección de Entrega
              </label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ciudad
              </label>
              <input
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notas del Pedido
              </label>
              <textarea
                name="notas"
                value={formData.notas}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Instrucciones especiales de entrega..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push("/carrito")}
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Volver al Carrito
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Procesando..." : "Confirmar Pedido"}
              </button>
            </div>
          </form>
        </div>

        {/* Resumen del pedido */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Resumen del Pedido</h2>
          
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.productoId} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  {item.imagenUrl && (
                    <img
                      src={item.imagenUrl}
                      alt={item.nombre}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <p className="font-medium">{item.nombre}</p>
                    <p className="text-sm text-gray-500">
                      Gs. {item.precio.toLocaleString()} x {item.cantidad}
                    </p>
                  </div>
                </div>
                <p className="font-medium">
                  Gs. {(item.precio * item.cantidad).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-blue-600">Gs. {total.toLocaleString()}</span>
            </div>
          </div>

          {/* Información adicional */}
          <div className="mt-6 text-sm text-gray-600">
            <h3 className="font-medium mb-2">Métodos de Pago:</h3>
            <ul className="space-y-1">
              <li>• Efectivo contra entrega</li>
              <li>• Transferencia bancaria</li>
              <li>• Billetera móvil</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
