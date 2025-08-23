"use client";

import { useState } from "react";
import Link from "next/link";
import { addToCart } from "@/lib/cart";
import { addToast } from "./Toast";

export default function ProductGrid({ productos }: { productos: any[] }) {
  const [addedId, setAddedId] = useState<number | null>(null);

  const handleAdd = (e: React.MouseEvent, p: any) => {
    e.preventDefault(); // Prevenir navegación del Link
    e.stopPropagation();
    
    if (p.stock <= 0) {
      addToast("Este producto está sin stock", "error");
      return;
    }

    addToCart(
      {
        productoId: p.id,
        nombre: p.nombre,
        precio: Number(p.precio),
        imagenUrl: p.imagenUrl,
      },
      1
    );
    
    setAddedId(p.id);
    addToast(`${p.nombre} agregado al carrito`, "success");
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {productos.map((p) => (
        <Link key={p.id} href={`/producto/${p.id}`} className="group">
          <div className="bg-white shadow-md rounded-xl p-4 relative hover-lift transition-all duration-300">
            {p.imagenUrl && (
              <div className="relative overflow-hidden rounded-md mb-3 group-hover:opacity-90">
                <img
                  src={p.imagenUrl}
                  alt={p.nombre}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {p.stock <= 5 && p.stock > 0 && (
                  <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    ¡Últimas {p.stock}!
                  </div>
                )}
                {p.stock === 0 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold">Sin Stock</span>
                  </div>
                )}
              </div>
            )}
            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">{p.nombre}</h2>
            {p.descripcion && (
              <p className="text-gray-500 text-sm mb-3 line-clamp-2">{p.descripcion}</p>
            )}
            <p className="text-2xl font-bold text-blue-600 mb-2">
              Gs. {Number(p.precio).toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 mb-3">Stock: {p.stock}</p>

            <button
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                p.stock > 0
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={(e) => p.stock > 0 && handleAdd(e, p)}
              disabled={p.stock === 0}
            >
              {p.stock > 0 ? "Agregar al carrito" : "Sin stock"}
            </button>

            {addedId === p.id && (
              <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-3 py-2 rounded-full animate-bounce">
                ¡Agregado! ✓
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
