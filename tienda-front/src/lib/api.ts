export const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// Tipos para TypeScript
export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  imagenUrl?: string;
  categoria?: string;
  activo?: boolean;
  fechaCreacion?: string;
  fechaActualizacion?: string;
}

export interface CrearProducto {
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  imagenUrl?: string;
  categoria?: string;
  activo?: boolean;
}

export interface Pedido {
  id: number;
  clienteNombre: string;
  clienteEmail?: string;
  clienteTelefono?: string;
  direccion?: string;
  ciudad?: string;
  notas?: string;
  estado: 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado';
  total: number;
  fechaCreacion: string;
  items: PedidoItem[];
}

export interface PedidoItem {
  id: number;
  productoId: number;
  producto: Producto;
  cantidad: number;
  precio: number;
}

// ========== PRODUCTOS ==========

export async function getProductos(): Promise<Producto[]> {
  const r = await fetch(`${API_URL}/productos`, { cache: "no-store" });
  if (!r.ok) throw new Error("No se pudo cargar productos");
  return r.json();
}

export async function getProducto(id: number): Promise<Producto> {
  const r = await fetch(`${API_URL}/productos/${id}`, { cache: "no-store" });
  if (!r.ok) throw new Error("No se pudo cargar el producto");
  return r.json();
}

export async function crearProducto(producto: CrearProducto): Promise<Producto> {
  const r = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err?.message || "No se pudo crear el producto");
  }
  return r.json();
}

export async function actualizarProducto(id: number, producto: Partial<CrearProducto>): Promise<Producto> {
  const r = await fetch(`${API_URL}/productos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err?.message || "No se pudo actualizar el producto");
  }
  return r.json();
}

export async function eliminarProducto(id: number): Promise<void> {
  const r = await fetch(`${API_URL}/productos/${id}`, {
    method: "DELETE",
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err?.message || "No se pudo eliminar el producto");
  }
}

// ========== PEDIDOS ==========

export async function crearPedido(payload: {
  clienteNombre: string;
  clienteEmail?: string;
  clienteTelefono?: string;
  direccion?: string;
  ciudad?: string;
  notas?: string;
  items: { productoId: number; cantidad: number }[];
}): Promise<Pedido> {
  const r = await fetch(`${API_URL}/pedidos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err?.message || "No se pudo crear el pedido");
  }
  return r.json();
}

export async function getPedidos(): Promise<Pedido[]> {
  const r = await fetch(`${API_URL}/pedidos`, { cache: "no-store" });
  if (!r.ok) throw new Error("No se pudo cargar los pedidos");
  return r.json();
}

export async function getPedido(id: number): Promise<Pedido> {
  const r = await fetch(`${API_URL}/pedidos/${id}`, { cache: "no-store" });
  if (!r.ok) throw new Error("No se pudo cargar el pedido");
  return r.json();
}

export async function actualizarEstadoPedido(id: number, estado: string): Promise<Pedido> {
  const r = await fetch(`${API_URL}/pedidos/${id}/estado`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado }),
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err?.message || "No se pudo actualizar el estado del pedido");
  }
  return r.json();
}

// ========== ESTADÍSTICAS ==========

export async function getEstadisticas(): Promise<{
  totalProductos: number;
  totalPedidos: number;
  ventasHoy: number;
  ventasMes: number;
  productosPopulares: Array<{ producto: Producto; ventas: number }>;
}> {
  const r = await fetch(`${API_URL}/admin/estadisticas`, { cache: "no-store" });
  if (!r.ok) throw new Error("No se pudo cargar las estadísticas");
  return r.json();
}
