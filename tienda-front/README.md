# Mi Tienda Online 🛒

Una moderna tienda online desarrollada con Next.js 15, TypeScript y Tailwind CSS.

## ✨ Características

- **🎨 Diseño Responsivo**: Funciona perfectamente en desktop, tablet y móvil
- **🛒 Sistema de Carrito**: Carrito de compras completo con localStorage
- **📦 Gestión de Pedidos**: Sistema completo de checkout y confirmación
- **🔍 Catálogo de Productos**: Grid de productos con imágenes y detalles
- **📱 Navegación Intuitiva**: Header con contador de carrito y navegación fácil
- **💰 Cálculos Automáticos**: Totales y subtotales calculados dinámicamente
- **📋 Páginas Completas**: Inicio, Productos, Carrito, Checkout, Contacto y más

## 🚀 Tecnologías Utilizadas

- **Next.js 15**: Framework de React con App Router
- **TypeScript**: Tipado estático para mayor robustez
- **Tailwind CSS**: Framework de CSS utilitario
- **React Hooks**: useState, useEffect, useRouter
- **LocalStorage**: Persistencia del carrito de compras

## 📦 Instalación

1. **Navega al directorio del proyecto**
   ```bash
   cd tienda-front
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Abre tu navegador**
   Ve a [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── carrito/           # Página del carrito
│   ├── checkout/          # Página de checkout
│   ├── contacto/          # Página de contacto
│   ├── pedidos/           # Página de pedidos del usuario
│   ├── pedido-confirmado/ # Página de confirmación
│   ├── productos/         # Página de todos los productos
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de inicio
├── components/            # Componentes reutilizables
│   ├── Header.tsx         # Header con navegación
│   └── ProductGrid.tsx    # Grid de productos
└── lib/                   # Utilidades y helpers
    ├── api.ts             # Funciones para API calls
    └── cart.ts            # Lógica del carrito de compras
```

## 🛒 Funcionalidades Principales

### Sistema de Carrito
- Agregar productos al carrito
- Actualizar cantidades
- Eliminar productos
- Cálculo automático de totales
- Persistencia en localStorage
- Contador dinámico en el header

### Proceso de Compra
1. **Explorar Productos**: Navega por el catálogo
2. **Agregar al Carrito**: Selecciona productos y cantidades
3. **Ver Carrito**: Revisa y modifica tu selección
4. **Checkout**: Completa tus datos de contacto
5. **Confirmación**: Recibe confirmación del pedido

### Páginas Disponibles

- **`/`** - Página de inicio con productos destacados
- **`/productos`** - Catálogo completo de productos
- **`/carrito`** - Carrito de compras
- **`/checkout`** - Proceso de pago
- **`/pedido-confirmado`** - Confirmación de pedido
- **`/pedidos`** - Historial de pedidos (simulado)
- **`/contacto`** - Formulario de contacto

## 🔧 Configuración de la API

Esta aplicación está configurada para trabajar con una API backend en `http://localhost:3001`.

### Endpoints Esperados

```
GET /productos              # Obtener lista de productos
POST /pedidos              # Crear nuevo pedido
```

### Formato de Datos Esperado

**Producto:**
```typescript
{
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  imagenUrl?: string;
}
```

**Pedido:**
```typescript
{
  clienteNombre: string;
  clienteEmail?: string;
  items: Array<{
    productoId: number;
    cantidad: number;
  }>;
}
```

## 🎨 Personalización

### Colores y Tema
Los colores principales se pueden modificar en `globals.css`:

- **Primario**: Azul (`blue-600`)
- **Éxito**: Verde (`green-600`) 
- **Advertencia**: Amarillo (`yellow-500`)
- **Error**: Rojo (`red-600`)

## 📱 Responsividad

La aplicación está completamente optimizada para:
- **Desktop**: Experiencia completa con hover effects
- **Tablet**: Layout adaptativo con grid responsivo
- **Móvil**: Interfaz touch-friendly y navegación optimizada

## 🚀 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye la aplicación
npm run start        # Inicia servidor de producción

# Linting
npm run lint         # Ejecuta ESLint
```

---

⭐ ¡Tu tienda online está lista para funcionar!
