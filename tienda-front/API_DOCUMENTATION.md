# Documentación de la API - Mi Tienda Online

Esta documentación describe todas las llamadas a la API necesarias para el funcionamiento completo de la tienda online.

## URL Base

```
http://localhost:3001
```

## Autenticación

Para las rutas de administrador, se recomienda implementar un sistema de autenticación JWT. Por simplicidad, algunas rutas pueden requerir un header de autorización.

```
Authorization: Bearer <token>
```

---

## 📦 Productos

### GET /productos
Obtiene la lista completa de productos activos.

**Parámetros de consulta opcionales:**
- `categoria` (string): Filtrar por categoría
- `activo` (boolean): Filtrar por estado (default: true)
- `limit` (number): Limitar número de resultados
- `offset` (number): Paginación

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "nombre": "Producto Ejemplo",
    "descripcion": "Descripción del producto",
    "precio": 150000,
    "stock": 25,
    "imagenUrl": "https://ejemplo.com/imagen.jpg",
    "categoria": "Electrónicos",
    "activo": true,
    "fechaCreacion": "2025-08-22T10:30:00Z",
    "fechaActualizacion": "2025-08-22T10:30:00Z"
  }
]
```

**Ejemplo de implementación en NestJS:**
```typescript
@Get()
async findAll(
  @Query('categoria') categoria?: string,
  @Query('activo') activo: boolean = true,
  @Query('limit') limit?: number,
  @Query('offset') offset?: number,
) {
  return this.productosService.findAll({ categoria, activo, limit, offset });
}
```

---

### GET /productos/:id
Obtiene un producto específico por ID.

**Parámetros:**
- `id` (number): ID del producto

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "nombre": "Producto Ejemplo",
  "descripcion": "Descripción del producto",
  "precio": 150000,
  "stock": 25,
  "imagenUrl": "https://ejemplo.com/imagen.jpg",
  "categoria": "Electrónicos",
  "activo": true,
  "fechaCreacion": "2025-08-22T10:30:00Z",
  "fechaActualizacion": "2025-08-22T10:30:00Z"
}
```

**Respuesta de error (404):**
```json
{
  "statusCode": 404,
  "message": "Producto no encontrado"
}
```

---

### POST /productos
Crea un nuevo producto (requiere autenticación de admin).

**Body:**
```json
{
  "nombre": "Nuevo Producto",
  "descripcion": "Descripción opcional",
  "precio": 75000,
  "stock": 10,
  "imagenUrl": "https://ejemplo.com/imagen.jpg",
  "categoria": "Categoría",
  "activo": true
}
```

**Respuesta exitosa (201):**
```json
{
  "id": 2,
  "nombre": "Nuevo Producto",
  "descripcion": "Descripción opcional",
  "precio": 75000,
  "stock": 10,
  "imagenUrl": "https://ejemplo.com/imagen.jpg",
  "categoria": "Categoría",
  "activo": true,
  "fechaCreacion": "2025-08-22T11:00:00Z",
  "fechaActualizacion": "2025-08-22T11:00:00Z"
}
```

**Ejemplo de implementación:**
```typescript
@Post()
@UseGuards(AdminAuthGuard)
async create(@Body() createProductoDto: CreateProductoDto) {
  return this.productosService.create(createProductoDto);
}
```

---

### PATCH /productos/:id
Actualiza un producto existente (requiere autenticación de admin).

**Parámetros:**
- `id` (number): ID del producto a actualizar

**Body (campos opcionales):**
```json
{
  "nombre": "Producto Actualizado",
  "precio": 80000,
  "stock": 15
}
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "nombre": "Producto Actualizado",
  "descripcion": "Descripción del producto",
  "precio": 80000,
  "stock": 15,
  "imagenUrl": "https://ejemplo.com/imagen.jpg",
  "categoria": "Electrónicos",
  "activo": true,
  "fechaCreacion": "2025-08-22T10:30:00Z",
  "fechaActualizacion": "2025-08-22T11:30:00Z"
}
```

---

### DELETE /productos/:id
Elimina un producto (requiere autenticación de admin).

**Parámetros:**
- `id` (number): ID del producto a eliminar

**Respuesta exitosa (204):** Sin contenido

**Alternativa - Desactivación suave:**
También puedes implementar una "eliminación suave" actualizando el campo `activo` a `false` en lugar de eliminar físicamente el registro.

---

## 🛒 Pedidos

### POST /pedidos
Crea un nuevo pedido.

**Body:**
```json
{
  "clienteNombre": "Juan Pérez",
  "clienteEmail": "juan@email.com",
  "clienteTelefono": "+595981123456",
  "direccion": "Av. España 123",
  "ciudad": "Asunción",
  "notas": "Entregar en horario de oficina",
  "items": [
    {
      "productoId": 1,
      "cantidad": 2
    },
    {
      "productoId": 3,
      "cantidad": 1
    }
  ]
}
```

**Respuesta exitosa (201):**
```json
{
  "id": 1,
  "clienteNombre": "Juan Pérez",
  "clienteEmail": "juan@email.com",
  "clienteTelefono": "+595981123456",
  "direccion": "Av. España 123",
  "ciudad": "Asunción",
  "notas": "Entregar en horario de oficina",
  "estado": "pendiente",
  "total": 225000,
  "fechaCreacion": "2025-08-22T12:00:00Z",
  "items": [
    {
      "id": 1,
      "productoId": 1,
      "cantidad": 2,
      "precio": 75000,
      "producto": {
        "id": 1,
        "nombre": "Producto A",
        "precio": 75000,
        "imagenUrl": "https://ejemplo.com/imagen1.jpg"
      }
    },
    {
      "id": 2,
      "productoId": 3,
      "cantidad": 1,
      "precio": 75000,
      "producto": {
        "id": 3,
        "nombre": "Producto C",
        "precio": 75000,
        "imagenUrl": "https://ejemplo.com/imagen3.jpg"
      }
    }
  ]
}
```

**Ejemplo de implementación:**
```typescript
@Post()
async create(@Body() createPedidoDto: CreatePedidoDto) {
  return this.pedidosService.create(createPedidoDto);
}
```

**Validaciones necesarias:**
- Verificar que todos los productos existan
- Verificar que hay suficiente stock
- Calcular el total correctamente
- Reducir el stock de los productos

---

### GET /pedidos
Obtiene la lista de pedidos (requiere autenticación de admin).

**Parámetros de consulta opcionales:**
- `estado` (string): Filtrar por estado del pedido
- `fecha_desde` (string): Filtrar desde fecha (ISO 8601)
- `fecha_hasta` (string): Filtrar hasta fecha (ISO 8601)
- `cliente` (string): Buscar por nombre de cliente
- `limit` (number): Limitar resultados
- `offset` (number): Paginación

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "clienteNombre": "Juan Pérez",
    "clienteEmail": "juan@email.com",
    "clienteTelefono": "+595981123456",
    "direccion": "Av. España 123",
    "ciudad": "Asunción",
    "estado": "pendiente",
    "total": 225000,
    "fechaCreacion": "2025-08-22T12:00:00Z",
    "items": [
      {
        "id": 1,
        "productoId": 1,
        "cantidad": 2,
        "precio": 75000,
        "producto": {
          "id": 1,
          "nombre": "Producto A",
          "precio": 75000
        }
      }
    ]
  }
]
```

---

### GET /pedidos/:id
Obtiene un pedido específico por ID.

**Parámetros:**
- `id` (number): ID del pedido

**Respuesta exitosa (200):** Igual formato que el POST /pedidos

---

### PATCH /pedidos/:id/estado
Actualiza el estado de un pedido (requiere autenticación de admin).

**Parámetros:**
- `id` (number): ID del pedido

**Body:**
```json
{
  "estado": "procesando"
}
```

**Estados válidos:**
- `pendiente`: Pedido recibido, esperando procesamiento
- `procesando`: Pedido en preparación
- `enviado`: Pedido despachado
- `entregado`: Pedido entregado al cliente
- `cancelado`: Pedido cancelado

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "estado": "procesando",
  "fechaActualizacion": "2025-08-22T13:00:00Z"
}
```

---

## 📊 Estadísticas (Admin)

### GET /admin/estadisticas
Obtiene estadísticas generales de la tienda (requiere autenticación de admin).

**Respuesta exitosa (200):**
```json
{
  "totalProductos": 25,
  "totalPedidos": 142,
  "ventasHoy": 15750000,
  "ventasMes": 89650000,
  "pedidosPendientes": 8,
  "productosPopulares": [
    {
      "producto": {
        "id": 1,
        "nombre": "Producto A",
        "precio": 50000,
        "stock": 10
      },
      "ventas": 45
    },
    {
      "producto": {
        "id": 2,
        "nombre": "Producto B",
        "precio": 75000,
        "stock": 5
      },
      "ventas": 32
    }
  ],
  "ventasPorMes": [
    { "mes": "2025-01", "total": 45000000 },
    { "mes": "2025-02", "total": 52000000 },
    { "mes": "2025-03", "total": 48000000 }
  ]
}
```

---

## 🔧 Configuración (Opcional)

### GET /admin/configuracion
Obtiene la configuración de la tienda.

### PUT /admin/configuracion
Actualiza la configuración de la tienda.

---

## 📝 Ejemplo de Implementación con NestJS

### 1. Entidades

**producto.entity.ts:**
```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PedidoItem } from './pedido-item.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 0 })
  precio: number;

  @Column('int')
  stock: number;

  @Column({ nullable: true })
  imagenUrl: string;

  @Column({ nullable: true })
  categoria: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @OneToMany(() => PedidoItem, pedidoItem => pedidoItem.producto)
  pedidoItems: PedidoItem[];
}
```

**pedido.entity.ts:**
```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { PedidoItem } from './pedido-item.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clienteNombre: string;

  @Column({ nullable: true })
  clienteEmail: string;

  @Column({ nullable: true })
  clienteTelefono: string;

  @Column({ nullable: true })
  direccion: string;

  @Column({ nullable: true })
  ciudad: string;

  @Column({ nullable: true })
  notas: string;

  @Column({ 
    type: 'enum', 
    enum: ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'],
    default: 'pendiente'
  })
  estado: string;

  @Column('decimal', { precision: 12, scale: 0 })
  total: number;

  @CreateDateColumn()
  fechaCreacion: Date;

  @OneToMany(() => PedidoItem, pedidoItem => pedidoItem.pedido, { cascade: true })
  items: PedidoItem[];
}
```

### 2. DTOs

**create-producto.dto.ts:**
```typescript
import { IsString, IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNumber()
  @Min(0)
  precio: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsString()
  imagenUrl?: string;

  @IsOptional()
  @IsString()
  categoria?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
```

### 3. Servicio

**productos.service.ts:**
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}

  async findAll(options?: {
    categoria?: string;
    activo?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Producto[]> {
    const query = this.productosRepository.createQueryBuilder('producto');
    
    if (options?.categoria) {
      query.andWhere('producto.categoria = :categoria', { categoria: options.categoria });
    }
    
    if (options?.activo !== undefined) {
      query.andWhere('producto.activo = :activo', { activo: options.activo });
    }
    
    if (options?.limit) {
      query.limit(options.limit);
    }
    
    if (options?.offset) {
      query.offset(options.offset);
    }
    
    return query.getMany();
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productosRepository.findOne({ where: { id } });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    return producto;
  }

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const producto = this.productosRepository.create(createProductoDto);
    return this.productosRepository.save(producto);
  }

  async update(id: number, updateData: Partial<CreateProductoDto>): Promise<Producto> {
    await this.productosRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Producto no encontrado');
    }
  }
}
```

---

## 🔒 Consideraciones de Seguridad

1. **Validación de datos**: Usar DTOs con class-validator
2. **Autenticación**: Implementar JWT para rutas de admin
3. **Rate limiting**: Limitar número de requests por IP
4. **CORS**: Configurar correctamente para producción
5. **Validación de stock**: Verificar disponibilidad antes de crear pedidos
6. **Transacciones**: Usar transacciones de BD para operaciones críticas

## 🚀 Despliegue

### Variables de entorno necesarias:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/tienda
JWT_SECRET=tu_jwt_secret_muy_seguro
PORT=3001
```

### Scripts de base de datos:
```sql
-- Crear tablas
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,0) NOT NULL,
  stock INTEGER NOT NULL,
  imagen_url TEXT,
  categoria VARCHAR(100),
  activo BOOLEAN DEFAULT true,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  cliente_nombre VARCHAR(255) NOT NULL,
  cliente_email VARCHAR(255),
  cliente_telefono VARCHAR(20),
  direccion TEXT,
  ciudad VARCHAR(100),
  notas TEXT,
  estado VARCHAR(20) DEFAULT 'pendiente',
  total DECIMAL(12,0) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pedido_items (
  id SERIAL PRIMARY KEY,
  pedido_id INTEGER REFERENCES pedidos(id) ON DELETE CASCADE,
  producto_id INTEGER REFERENCES productos(id),
  cantidad INTEGER NOT NULL,
  precio DECIMAL(10,0) NOT NULL
);
```

Esta documentación cubre todas las funcionalidades necesarias para que tu tienda online funcione completamente. La API debe ser implementada siguiendo estos endpoints y estructuras de datos.
