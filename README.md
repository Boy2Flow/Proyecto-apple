# 💚 REDES SOCIALES 💚
🔗 https://www.instagram.com/boy2flow_
🔗 https://github.com/Boy2Flow

# Réplica de la Página Web de Apple

Este proyecto es una réplica completa de la página web de Apple (apple.com), creada con HTML, CSS y JavaScript vanilla.

## 📁 Estructura del Proyecto

```
Apple/
├── index.html              # Página principal
├── tienda.html            # Tienda de productos
├── iphone.html            # Página de iPhone
├── ipad.html              # Página de iPad
├── mac.html               # Página de Mac
├── watch.html             # Página de Apple Watch
├── airpods.html           # Página de AirPods
├── tv-casa.html           # Página de TV y Casa
├── entretenimiento.html   # Servicios de entretenimiento
├── accesorios.html        # Accesorios
├── soporte.html           # Soporte técnico
├── carrito.html           # Carrito de compras
│
├── css/
│   ├── styles.css         # Estilos globales
│   ├── tienda.css         # Estilos de la tienda
│   ├── productos.css      # Estilos de páginas de productos
│   ├── entretenimiento.css # Estilos de entretenimiento
│   └── carrito.css        # Estilos del carrito
│
├── js/
│   ├── main.js            # JavaScript principal
│   ├── tienda.js          # Funcionalidad de la tienda
│   └── carrito.js         # Funcionalidad del carrito
│
└── data/
    └── products.json      # Base de datos de productos
```

## 🎨 Características

### Diseño

- **Navegación global** idéntica a Apple con menú sticky
- **Hero sections** con gradientes y diseño responsive
- **Grid de productos** con cards interactivas
- **Footer completo** con múltiples columnas de enlaces
- **Animaciones suaves** y transiciones
- **Diseño responsive** para móviles, tablets y desktop

### Funcionalidades

#### Navegación

- Menú de navegación global con todos los productos
- Búsqueda de productos (overlay con resultados en tiempo real)
- Carrito de compras con contador de productos

#### Tienda

- Filtrado de productos por categoría
- Grid de productos con información detallada
- Botones de "Añadir al carrito" y "Ver detalles"
- Carga dinámica desde base de datos JSON

#### Páginas de Productos

- iPhone: Modelos iPhone 17 Pro, iPhone Air, iPhone 16
- iPad: iPad Pro 13", iPad Air
- Mac: MacBook Pro 14", MacBook Air 15"
- Watch: Apple Watch Ultra 3, Series 11
- AirPods: AirPods Max, AirPods Pro 3
- TV y Casa: Apple TV 4K, HomePod

#### Entretenimiento

- Apple One
- Apple Music
- Apple TV+
- Apple Arcade
- Apple Fitness+
- iCloud+

#### Carrito de Compras

- Añadir/eliminar productos
- Ajustar cantidades
- Cálculo automático de subtotal y total
- Persistencia con localStorage
- Proceso de checkout (demo)

## 🗄️ Base de Datos

El archivo `data/products.json` contiene:

- **13 productos** con información completa
- **6 categorías** de productos
- **6 servicios** de entretenimiento

Cada producto incluye:

- ID único
- Nombre y categoría
- Precio
- Descripción detallada
- Características (features)
- Colores disponibles
- Opciones de almacenamiento
- Estado de stock

## 🚀 Cómo Usar

1. **Abrir el proyecto**: Simplemente abre `index.html` en tu navegador web

2. **Navegar**: Usa el menú de navegación para explorar las diferentes secciones

3. **Comprar productos**:

   - Ve a la tienda
   - Filtra por categoría si lo deseas
   - Haz clic en "Añadir al carrito"
   - Ve al carrito para ver tus productos
   - Ajusta cantidades o elimina productos
   - Haz clic en "Tramitar pedido"

4. **Buscar**: Haz clic en el icono de búsqueda para buscar productos

## 🎯 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**:
  - Flexbox y Grid para layouts
  - Gradientes y animaciones
  - Variables CSS
  - Media queries para responsive
- **JavaScript (Vanilla)**:
  - Manipulación del DOM
  - Fetch API para cargar datos
  - LocalStorage para persistencia
  - Event listeners

## 📱 Responsive Design

El sitio está optimizado para:

- **Desktop**: > 1068px
- **Tablet**: 734px - 1068px
- **Mobile**: < 734px

## 🎨 Paleta de Colores

- **Fondo**: #ffffff, #f5f5f7
- **Texto**: #1d1d1f, #6e6e73
- **Navegación**: #000000 (con transparencia)
- **Enlaces**: #0066cc, #2997ff
- **Gradientes**: Variados según sección

## ✨ Características Destacadas

1. **Diseño fiel a Apple**: Tipografía, espaciado y estética idénticos
2. **Interactividad**: Hover effects, animaciones, transiciones
3. **Funcionalidad completa**: Carrito funcional con localStorage
4. **Base de datos**: JSON con productos reales de Apple
5. **SEO optimizado**: Meta tags, títulos descriptivos
6. **Accesibilidad**: ARIA labels, estructura semántica

## 📝 Notas

- Este es un proyecto educativo/demo
- Los precios y productos son ilustrativos
- El proceso de checkout es una simulación
- No hay backend real ni procesamiento de pagos

## 🔧 Mejoras Futuras Posibles

- Integración con backend real
- Sistema de usuarios y autenticación
- Pasarela de pago
- Más productos y categorías
- Sistema de reviews y valoraciones
- Comparador de productos
- Wishlist/Lista de deseos

---

**Creado como réplica educativa de apple.com**
_Todos los derechos de diseño y marca pertenecen a Apple Inc._

