"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCart, updateCartItemQuantity, removeFromCart, getCartTotal, type CartItem } from "@/lib/cart";

export default function CarritoPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const updateCart = () => {
      const currentCart = getCart();
      setCart(currentCart);
      setTotal(getCartTotal());
    };

    updateCart();
    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  const handleQuantityChange = (productoId: number, newQuantity: number) => {
    updateCartItemQuantity(productoId, newQuantity);
  };

  const handleRemoveItem = (productoId: number) => {
    removeFromCart(productoId);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
            />
          </svg>
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-500 mb-6">
            ¡Empieza a agregar productos increíbles!
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Seguir Comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {cart.map((item) => (
          <div
            key={item.productoId}
            className="flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0"
          >
            <div className="flex items-center space-x-4 flex-1">
              {item.imagenUrl && (
                <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={item.imagenUrl}
                    alt={item.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.nombre}</h3>
                <p className="text-sm text-gray-500">
                  Gs. {item.precio.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Control de cantidad */}
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => handleQuantityChange(item.productoId, item.cantidad - 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                  disabled={item.cantidad <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1 border-x">{item.cantidad}</span>
                <button
                  onClick={() => handleQuantityChange(item.productoId, item.cantidad + 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Precio total del item */}
              <div className="text-right min-w-[80px]">
                <p className="font-medium">
                  Gs. {(item.precio * item.cantidad).toLocaleString()}
                </p>
              </div>

              {/* Botón eliminar */}
              <button
                onClick={() => handleRemoveItem(item.productoId)}
                className="text-red-600 hover:text-red-800 transition-colors p-2"
                title="Eliminar producto"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {/* Resumen del carrito */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">Total:</span>
            <span className="text-2xl font-bold text-blue-600">
              Gs. {total.toLocaleString()}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-center hover:bg-gray-300 transition-colors"
            >
              Seguir Comprando
            </Link>
            <Link
              href="/checkout"
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-700 transition-colors"
            >
              Proceder al Pago
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
