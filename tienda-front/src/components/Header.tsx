"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getCart } from "@/lib/cart";
import SearchBar from "./SearchBar";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      const total = cart.reduce((sum, item) => sum + item.cantidad, 0);
      setCartCount(total);
    };

    updateCartCount();
    
    // Escuchar cambios en el localStorage
    const handleStorageChange = () => {
      updateCartCount();
    };

    window.addEventListener("storage", handleStorageChange);
    
    // También escuchar un evento personalizado para actualizaciones inmediatas
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Mi Tienda</h1>
          </Link>

          {/* Buscador (oculto en móvil) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* Navegación */}
          <nav className="hidden lg:flex space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/productos"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Productos
            </Link>
            <Link
              href="/contacto"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contacto
            </Link>
          </nav>

          {/* Carrito y Admin */}
          <div className="flex items-center space-x-4">
            <Link
              href="/carrito"
              className="relative flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
              <span className="ml-2 hidden sm:block">Carrito</span>
            </Link>

            <Link
              href="/admin"
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              title="Panel de Administrador"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="ml-2 hidden sm:block">Admin</span>
            </Link>
          </div>
        </div>

        {/* Barra de búsqueda móvil */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
