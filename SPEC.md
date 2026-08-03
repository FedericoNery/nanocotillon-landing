# SPEC — Nano Cotillón (Landing Page)

## 1. Resumen del negocio

**Nano Cotillón** es un comercio (físico + presencia online) de artículos de:

- Repostería (moldes, decoración de tortas, insumos de pastelería)
- Cotillón para fiestas y cumpleaños (temáticas infantiles y adultos)
- Descartables para eventos (vasos, platos, manteles, servilletas)
- Golosinas y candy bar
- Artículos para Fiestas Patrias argentinas (25 de Mayo, 9 de Julio, etc.)

## 2. Objetivo de la landing

Ser la **vidriera digital** de la marca: mostrar qué se vende, transmitir la identidad alegre/festiva del negocio, y **derivar tráfico** hacia:

1. WhatsApp (consulta de precios, stock, pedidos)
2. Visita al local físico (dirección, horarios, mapa)
3. Redes sociales (catálogo actualizado, novedades)

No es una tienda con compra online en esta versión — es informativa + catálogo navegable.

## 3. Alcance v1

**Incluido:**
- Landing de una sola página (home) con secciones de marca, categorías y contacto
- Catálogo navegable por categorías (`/productos` y `/productos/[categoria]`)
- Fichas de producto simples: nombre, imagen, descripción breve — **sin precio ni compra**
- Integración con WhatsApp, Google Maps y redes sociales (links/embeds)

**Fuera de alcance v1** (a futuro, no ahora):
- Carrito de compras
- Checkout / pagos online
- Cuentas de usuario / login
- Panel de administración de contenido (se gestiona vía content collections en el repo)

## 4. Audiencia

- Familias organizando cumpleaños infantiles
- Personas organizando eventos/fiestas (adultos, empresas, escuelas)
- Compradores estacionales de artículos para Fiestas Patrias argentinas

## 5. Categorías de producto (estructura del catálogo)

| Categoría | Ejemplos de productos |
|---|---|
| Repostería | Moldes, cápsulas para cupcakes, colorantes, toppers, boquillas, papel para hornear |
| Cotillón por temática | Sets temáticos (personajes, superhéroes, princesas, etc.), gorros, velas de cumpleaños |
| Descartables para fiestas | Vasos, platos, manteles, servilletas, cubiertos descartables |
| Golosinas y candy bar | Caramelos, chupetines, chocolates, bolsitas de regalo |
| Fiestas Patrias | Escarapelas, cintas celeste y blanco, banderines, gorros patrios, banderas de Argentina |
| Globos y decoración | Globos sueltos, arcos de globos, guirnaldas, banderines decorativos |

> Cada categoría se modela como una entrada de la content collection `categorias`; cada producto pertenece a una categoría vía la collection `productos`.

## 6. Estructura de páginas

El sitio es **multi-página** (no single-page con anclas): `Header` y `Footer` compartidos vía `BaseLayout.astro`, con botón flotante de WhatsApp global.

### 6.1 Home (`/`)

1. **Hero**: nombre de marca, tagline, CTA principal ("Ver catálogo" + "Escribinos por WhatsApp")
2. **Categorías destacadas**: grilla con las 6 categorías (icono + nombre), cada una linkea a `/productos/[categoria]`
3. **Cómo comprar** (3 pasos): 1) Elegí tus productos en el catálogo → 2) Consultá stock y precio por WhatsApp → 3) Retirá en el local o coordiná envío
4. **Fiestas Patrias** (sección destacable/estacional): productos temáticos para 25 de Mayo / 9 de Julio
5. **Redes sociales**: links a Instagram / Facebook con CTA "Seguinos"

### 6.2 Nosotros (`/nosotros`)

Página dedicada con la historia/valores de la marca (copy placeholder hasta que el usuario provea contenido real).

### 6.3 Ubicación (`/ubicacion`)

Dirección, horarios, contacto por WhatsApp y placeholder de mapa (sin dirección real todavía, se evita embeber una ubicación inventada).

### 6.4 Catálogo navegable

- `/productos` — grilla de las 6 categorías
- `/productos/[categoria]` — listado de productos de esa categoría: nombre, ícono, descripción breve. Sin precio, sin "agregar al carrito".

### 6.5 Navegación

Header con links a Inicio / Nosotros / Productos / Ubicación + CTA de WhatsApp, con menú mobile implementado sin JavaScript (patrón "checkbox hack" de Tailwind).

## 7. Modelo de contenido (Astro Content Collections)

```
src/content/categorias/*.md   → slug, nombre, descripción, icono, orden
src/content/productos/*.md    → nombre, categoria (ref), descripción
```

Sin fotos propias todavía, cada producto reutiliza el ícono de su categoría como placeholder visual. Esto permite agregar/editar productos y categorías sin tocar código de páginas — hay 18 productos placeholder cargados (3 por categoría) como seed data de ejemplo.

## 8. CTAs y contacto

- **WhatsApp**: botón flotante + botón en hero + footer. Link tipo `https://wa.me/<numero>?text=...`
- **Ubicación**: botón "Cómo llegar" → Google Maps
- **Redes**: iconos Instagram / Facebook en header y footer

## 9. Datos pendientes de completar (placeholders)

Los siguientes datos reales del negocio deben ser provistos por el usuario antes de publicar — se marcan como `[COMPLETAR]` en el código:

- [COMPLETAR] Número de WhatsApp
- [COMPLETAR] Dirección del local
- [COMPLETAR] Horarios de atención
- [COMPLETAR] Handle de Instagram / Facebook
- [COMPLETAR] Tagline / slogan de marca
- [COMPLETAR] Listado real de productos por categoría (nombres, descripciones, fotos)

## 10. Próximos pasos técnicos (no incluidos en este documento)

- Definir stack de estilos (Tailwind vs CSS vanilla) — ver `DESIGN_SPEC.md`
- Crear layout base, componentes (Header, Hero, CategoryCard, ProductCard, Footer)
- Armar content collections `categorias` y `productos`
- Cargar contenido real cuando el usuario lo provea
