"use client";

import { AuthProvider, useAuth } from "@/lib/auth";
import AdminLayout from "@/components/AdminLayout";
import { usePathname } from "next/navigation";

function AdminContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  // Si está en la página de login, no mostrar el layout del admin
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Si no está autenticado y no está en login, redirigir a login
  if (!isAuthenticated) {
    window.location.href = "/admin/login";
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirigiendo...</p>
      </div>
    </div>;
  }

  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminContent>{children}</AdminContent>
    </AuthProvider>
  );
}
