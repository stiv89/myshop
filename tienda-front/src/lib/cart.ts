// src/lib/cart.ts
export type CartItem = {
  productoId: number;
  nombre: string;
  precio: number;
  imagenUrl?: string;
  cantidad: number;
};

const KEY = "cart:v1";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function setCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addToCart(
  item: Omit<CartItem, "cantidad">,
  qty = 1
) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.productoId === item.productoId);
  if (idx >= 0) cart[idx].cantidad += qty;
  else cart.push({ ...item, cantidad: qty });
  setCart(cart);
  
  // Disparar evento personalizado para actualizar el contador
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"));
  }
}

export function removeFromCart(productoId: number) {
  const cart = getCart();
  const filtered = cart.filter(item => item.productoId !== productoId);
  setCart(filtered);
  
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"));
  }
}

export function updateCartItemQuantity(productoId: number, cantidad: number) {
  if (cantidad <= 0) {
    removeFromCart(productoId);
    return;
  }
  
  const cart = getCart();
  const idx = cart.findIndex(i => i.productoId === productoId);
  if (idx >= 0) {
    cart[idx].cantidad = cantidad;
    setCart(cart);
    
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }
}

export function clearCart() {
  setCart([]);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"));
  }
}

export function getCartTotal(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}
