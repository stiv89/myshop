import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ToastContainer from "@/components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mi Tienda Online",
  description: "La mejor tienda online para tus compras",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; 2025 Mi Tienda Online. Todos los derechos reservados.</p>
          </div>
        </footer>
        <ToastContainer />
      </body>
    </html>
  );
}
