"use client";

import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  if (!isAuthenticated) {
    return <div>No autorizado</div>;
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/productos", label: "Productos", icon: "📦" },
    { href: "/admin/pedidos", label: "Pedidos", icon: "🛒" },
    { href: "/admin/configuracion", label: "Configuración", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <Link href="/admin" className="text-xl font-bold text-blue-600">
              Admin Panel
            </Link>
            <Link href="/" className="text-sm text-gray-500 hover:text-blue-600">
              Ver Tienda
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="border-t p-4">
            <button
              onClick={logout}
              className="w-full flex items-center px-2 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
            >
              <span className="mr-3 text-lg">🚪</span>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Top bar */}
        <header className="bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg font-semibold">Panel de Administración</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {new Date().toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
