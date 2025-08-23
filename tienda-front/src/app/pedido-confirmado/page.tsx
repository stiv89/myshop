"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PedidoConfirmadoPage() {
  const searchParams = useSearchParams();
  const pedidoId = searchParams.get("id");
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Ocultar confetti después de 3 segundos
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="animate-bounce absolute top-20 left-1/4 text-4xl">🎉</div>
          <div className="animate-bounce absolute top-32 right-1/4 text-4xl" style={{animationDelay: '0.2s'}}>🎊</div>
          <div className="animate-bounce absolute top-24 left-1/2 text-4xl" style={{animationDelay: '0.4s'}}>🎈</div>
        </div>
      )}

      <div className="text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Pedido Confirmado!
          </h1>
          <p className="text-lg text-gray-600">
            Tu pedido ha sido recibido y será procesado pronto
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">Detalles del Pedido</h2>
          
          {pedidoId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Número de Pedido:</p>
              <p className="text-lg font-mono font-bold text-blue-600">#{pedidoId}</p>
            </div>
          )}

          <div className="space-y-3 text-left">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Estado:</span>
              <span className="font-medium text-yellow-600">Pendiente</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Método de Pago:</span>
              <span className="font-medium">Efectivo contra entrega</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tiempo estimado:</span>
              <span className="font-medium">24-48 horas</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-3">¿Qué sigue ahora?</h3>
          <div className="text-left space-y-2">
            <p className="flex items-start">
              <span className="inline-block w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">1</span>
              Procesaremos tu pedido en las próximas horas
            </p>
            <p className="flex items-start">
              <span className="inline-block w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">2</span>
              Te contactaremos para confirmar los detalles de entrega
            </p>
            <p className="flex items-start">
              <span className="inline-block w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">3</span>
              Recibirás tu pedido en la dirección indicada
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Seguir Comprando
          </Link>
          <Link
            href="/pedidos"
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Ver Mis Pedidos
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-600">
          <p>
            Si tienes alguna pregunta sobre tu pedido, no dudes en{" "}
            <Link href="/contacto" className="text-blue-600 hover:underline">
              contactarnos
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
