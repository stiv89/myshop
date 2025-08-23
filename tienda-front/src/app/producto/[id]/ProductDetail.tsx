"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { addToCart } from "@/lib/cart";
import { addToast } from "@/components/Toast";

interface Product {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  imagenUrl?: string;
  categoria?: string;
}

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (product.stock <= 0) {
      addToast("Este producto está sin stock", "error");
      return;
    }

    if (quantity > product.stock) {
      addToast(`Solo hay ${product.stock} unidades disponibles`, "warning");
      return;
    }

    setIsAdding(true);

    try {
      addToCart(
        {
          productoId: product.id,
          nombre: product.nombre,
          precio: product.precio,
          imagenUrl: product.imagenUrl,
        },
        quantity
      );
      
      addToast(`${quantity} ${product.nombre}(s) agregado(s) al carrito`, "success");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="text-gray-500 hover:text-blue-600">
              Inicio
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link href="/productos" className="text-gray-500 hover:text-blue-600">
                Productos
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700 font-medium">{product.nombre}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagen del producto */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {product.imagenUrl ? (
              <img
                src={product.imagenUrl}
                alt={product.nombre}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.nombre}
            </h1>
            {product.categoria && (
              <p className="text-sm text-blue-600 font-medium">
                {product.categoria}
              </p>
            )}
          </div>

          {product.descripcion && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.descripcion}
              </p>
            </div>
          )}

          <div className="border-t border-b py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold text-blue-600">
                Gs. {product.precio.toLocaleString()}
              </span>
              <div className="text-right">
                <p className={`text-sm font-medium ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}>
                  {product.stock > 0 ? `En stock (${product.stock})` : "Sin stock"}
                </p>
              </div>
            </div>
          </div>

          {/* Controles de compra */}
          <div className="space-y-4">
            {product.stock > 0 && (
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">
                  Cantidad:
                </label>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-16 px-3 py-2 text-center border-x focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAdding}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                  product.stock > 0
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isAdding ? "Agregando..." : product.stock > 0 ? "Agregar al Carrito" : "Sin Stock"}
              </button>
              
              <Link
                href="/carrito"
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-center"
              >
                Ver Carrito
              </Link>
            </div>
          </div>

          {/* Información adicional */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Entrega en 24-48 horas</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Garantía de calidad</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Múltiples métodos de pago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
