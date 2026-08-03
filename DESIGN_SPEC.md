# DESIGN SPEC — Nano Cotillón

Sistema de diseño para la landing, basado en la paleta de marca y en el logo existente (círculo con "NANO COTILLÓN", globos, estrella y torta de cumpleaños). Estética: **alegre, colorida, cálida, familiar** — no corporativa ni minimalista fría.

## 1. Paleta de color

### 1.1 Colores de marca (dados)

| Color | Hex | Rol |
|---|---|---|
| 🔴 Rojo | `#F23545` | **Primario** — CTA principal, header/acentos fuertes |
| 🌸 Magenta | `#F22E8A` | **Secundario** — hovers, badges, elementos festivos |
| 🔵 Azul | `#0C2FF2` | **Terciario** — contraste, links, detalles, sección alterna |
| 🟡 Amarillo | `#F2E313` | **Acento de alta energía** — resaltados, badges "¡Nuevo!", estrellas/detalles decorativos |
| 🟠 Naranja | `#F27B35` | **Fondo de apoyo** — secciones, coherente con fondo del logo |

### 1.2 Neutros (a definir, no venían en la paleta)

Los 5 colores de marca son saturados y no sirven como texto ni fondo base de lectura — se necesitan neutros:

| Uso | Color | Hex |
|---|---|---|
| Texto principal | Casi-negro cálido | `#1E1512` |
| Texto secundario | Gris cálido | `#6B5F5A` |
| Fondo base | Blanco cálido | `#FFFDF8` |
| Fondo alterno / cards | Gris muy claro | `#F5F1EC` |
| Bordes / separadores | Gris claro | `#E5DED6` |

### 1.3 Reglas de contraste (verificado, WCAG 2.1)

| Fondo | Texto negro `#1E1512` | Texto blanco `#FFFFFF` | Recomendación |
|---|---|---|---|
| Rojo `#F23545` | ~5.4:1 ✅ AA | ~3.9:1 ⚠️ solo texto grande/bold | Usar **texto oscuro** para párrafos; blanco solo en botones con texto grande/bold |
| Magenta `#F22E8A` | ~5.5:1 ✅ AA | ~3.8:1 ⚠️ solo texto grande/bold | Igual que rojo: texto oscuro para lectura |
| Azul `#0C2FF2` | ~2.7:1 ❌ | ~7.8:1 ✅ AAA | Usar **siempre texto blanco** sobre azul |
| Amarillo `#F2E313` | ~15.8:1 ✅ AAA | ~1.3:1 ❌ | Usar **siempre texto oscuro** sobre amarillo, nunca blanco |
| Naranja `#F27B35` | ~7.7:1 ✅ AAA | ~2.7:1 ❌ | Usar **siempre texto oscuro** sobre naranja |

**Regla simple para no equivocarse:** azul → texto blanco. Amarillo y naranja → texto oscuro siempre. Rojo y magenta → texto oscuro en párrafos, blanco permitido solo en botones/títulos grandes y en negrita.

### 1.4 Qué NO hacer

- No usar amarillo como fondo de texto largo con blanco (ilegible).
- No usar los 5 colores saturados juntos en una misma sección sin neutros de por medio — generan ruido visual. Máximo 2 colores de marca + 1 neutro por sección.
- No usar azul como fondo de texto largo con negro.

## 2. Tipografía

- **Display / títulos** (H1, H2, hero, logo-type): tipografía redondeada y con carácter que evoque fiesta — ej. **Baloo 2**, **Fredoka**, o **Bricolage Grotesque** (Google Fonts, gratuitas). Uso: títulos, nombres de categoría, badges.
- **Cuerpo / UI** (párrafos, botones, nav, fichas de producto): sans-serif neutra y muy legible — ej. **Nunito**, **Inter**, o **Poppins**. Uso: descripciones, texto de contacto, formularios.

### Escala tipográfica sugerida

| Elemento | Tamaño (desktop) | Tamaño (mobile) | Peso |
|---|---|---|---|
| H1 (hero) | 56px | 32px | 700–800 |
| H2 (secciones) | 36px | 26px | 700 |
| H3 (subtítulos/categorías) | 24px | 20px | 600 |
| Body | 18px | 16px | 400 |
| Small / labels | 14px | 13px | 500 |

## 3. Iconografía e ilustración

En lugar de fotografía real (no disponible aún), el lenguaje visual se apoya en:

- **Formas de fiesta**: globos, confetti, estrellas, cintas, gorros de cumpleaños — como elementos decorativos sueltos (no fotográficos), en estilo flat/vector, coherente con el logo existente.
- **Blobs orgánicos**: formas redondeadas de color de fondo (en los 5 colores de marca, con transparencia/opacidad baja) detrás de secciones para dar dinamismo sin necesitar fotos.
- **Iconos por categoría**: un ícono simple y colorido por categoría de producto (torta para repostería, globo para cotillón, vaso para descartables, caramelo para golosinas, escarapela para fiestas patrias, arco de globos para decoración).
- **Patrón de fondo opcional**: confetti disperso a baja opacidad en el hero o footer.

## 4. Componentes base

- **Botón primario**: fondo rojo `#F23545`, texto oscuro o blanco bold, radio de borde grande (pill/rounded-full), sombra suave. Uso: "Escribinos por WhatsApp".
- **Botón secundario**: fondo blanco/neutro, borde de color de marca, texto oscuro. Uso: "Ver catálogo".
- **Botón ghost**: sin fondo, texto de color de marca, subrayado en hover.
- **Tarjeta de categoría**: fondo neutro claro `#F5F1EC`, ícono/ilustración de categoría, título en tipografía display, radio de borde grande, hover con leve elevación + acento de color de marca en el borde.
- **Tarjeta de producto**: similar a la de categoría, pero con imagen (o placeholder ilustrado si no hay foto), nombre y descripción breve, sin precio.
- **Badge**: pastilla pequeña, fondo amarillo o magenta, texto oscuro, para "¡Nuevo!" / "Fiestas Patrias" / "Temporada".
- **Header/Nav**: fondo blanco o naranja suave, logo a la izquierda, links centrados, botón WhatsApp destacado a la derecha.
- **Footer**: fondo oscuro cálido o azul con texto blanco, datos de contacto, redes, horario.

## 5. Layout y espaciado

- **Grid**: 12 columnas en desktop, container máx. ~1200px, 1 columna en mobile.
- **Breakpoints**: mobile <640px, tablet 640–1024px, desktop >1024px.
- **Radios de borde**: generosos (12–24px, o pill/9999px en botones y badges) — refuerza la estética amigable/festiva.
- **Sombras**: suaves y difusas (`0 4px 16px rgba(0,0,0,0.08)`), evitar sombras duras.
- **Espaciado entre secciones**: generoso (80–120px desktop, 48–64px mobile) para que cada sección "respire".

## 6. Tono visual general

Alegre, colorido, cálido, apto para toda la familia. Referencias: vidrieras de cotillón, papelería de cumpleaños infantil, packaging de golosinas. Evitar cualquier estética corporativa, oscura o ultra-minimalista — el exceso de espacio en blanco frío contradice la propuesta de marca.

## 7. Checklist de accesibilidad

- [ ] Todo texto sobre azul es blanco
- [ ] Todo texto sobre amarillo y naranja es oscuro
- [ ] Texto de párrafo sobre rojo/magenta es oscuro (no blanco)
- [ ] Botones usan texto grande/bold cuando el fondo es rojo/magenta con texto blanco
- [ ] Ningún texto usa amarillo sobre blanco o blanco sobre amarillo
- [ ] Foco de teclado visible en todos los botones/links (outline de color de marca)
