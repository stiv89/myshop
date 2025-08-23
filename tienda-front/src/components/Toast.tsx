"use client";

import { useState, useEffect } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastProps extends Toast {
  onClose: (id: string) => void;
}

function ToastComponent({ id, message, type, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white", 
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white"
  };

  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ"
  };

  return (
    <div className={`flex items-center p-4 rounded-lg shadow-lg ${typeStyles[type]} animate-slide-in-right`}>
      <span className="text-lg font-bold mr-2">{icons[type]}</span>
      <span className="flex-1">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="ml-2 text-white hover:text-gray-200"
      >
        ✕
      </button>
    </div>
  );
}

let toastId = 0;
const toastListeners: Array<(toast: Toast) => void> = [];

export function addToast(message: string, type: ToastType = "info", duration = 3000) {
  const id = (++toastId).toString();
  const toast: Toast = { id, message, type, duration };
  toastListeners.forEach(listener => listener(toast));
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleToast = (toast: Toast) => {
      setToasts(current => [...current, toast]);
    };

    toastListeners.push(handleToast);

    return () => {
      const index = toastListeners.indexOf(handleToast);
      if (index > -1) {
        toastListeners.splice(index, 1);
      }
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts(current => current.filter(toast => toast.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <ToastComponent
          key={toast.id}
          {...toast}
          onClose={removeToast}
        />
      ))}
    </div>
  );
}
