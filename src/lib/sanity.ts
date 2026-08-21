import { createClient, type SanityClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export interface SanityImage {
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
}

export const BRAND_COLORS = [
  "brand-red",
  "brand-magenta",
  "brand-blue",
  "brand-yellow",
  "brand-orange",
  "brand-celeste",
] as const;

export const ICON_ANIMATIONS = ["wobble", "pop", "wiggle", "tilt", "flutter", "bob"] as const;

export interface Producto {
  _id: string;
  slug: string;
  nombre: string;
  descripcion?: string;
  categoria: { slug: string; nombre: string };
  imagenes: SanityImage[];
  precio?: number;
  disponibilidad: "disponible" | "agotado" | "proximamente";
  destacado: boolean;
}

export const VITRINA_MODOS = ["manual", "categoria"] as const;

export interface Vitrina {
  _id: string;
  slug: string;
  titulo: string;
  descripcion?: string;
  modo: (typeof VITRINA_MODOS)[number];
  productos?: Producto[];
  categoriaSlug?: string;
  soloDestacados: boolean;
  limite: number;
  verTodosLink?: string;
}

export interface Categoria {
  _id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  imagen: SanityImage;
  icono: string;
  color: (typeof BRAND_COLORS)[number];
  anim: (typeof ICON_ANIMATIONS)[number];
  orden: number;
  vitrinaDestacada?: Vitrina;
}

export interface Banner {
  _id: string;
  titulo: string;
  tipo: "banner" | "oferta" | "outlet";
  descripcion?: string;
  estilo: "franja" | "diagonal";
  color: (typeof BRAND_COLORS)[number];
  link?: string;
  botonTexto?: string;
  prioridad: number;
}

export const SECCION_HOME_TIPOS = [
  "hero",
  "marcas",
  "categorias",
  "sobreNosotros",
  "porQueElegirnos",
  "banners",
  "vitrina",
  "contactoCta",
] as const;

export type TipoSeccionHome = (typeof SECCION_HOME_TIPOS)[number];

export interface SeccionHome {
  tipo: TipoSeccionHome;
  visible: boolean;
  vitrina?: Vitrina;
}

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || "production";
export const isSanityConfigured = Boolean(projectId);

let client: SanityClient | null = null;

function getClient(): SanityClient {
  if (!projectId) {
    throw new Error(
      "Falta configurar PUBLIC_SANITY_PROJECT_ID (y opcionalmente PUBLIC_SANITY_DATASET) en el archivo .env del proyecto.",
    );
  }
  if (!client) {
    client = createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
    });
  }
  return client;
}

const builder = () => createImageUrlBuilder(getClient());

export function urlFor(source: SanityImage) {
  return builder().image(source);
}

const PRODUCTO_PROJECTION = `{
  "_id": _id,
  "slug": slug.current,
  nombre,
  descripcion,
  "categoria": categoria->{ "slug": slug.current, nombre },
  imagenes,
  precio,
  disponibilidad,
  destacado
}`;

const VITRINA_PROJECTION = `{
  "_id": _id,
  "slug": slug.current,
  titulo,
  descripcion,
  modo,
  "productos": productos[]->${PRODUCTO_PROJECTION},
  "categoriaSlug": categoria->slug.current,
  soloDestacados,
  limite,
  verTodosLink
}`;

const CATEGORIA_PROJECTION = `{
  "_id": _id,
  "slug": slug.current,
  nombre,
  descripcion,
  imagen,
  icono,
  color,
  anim,
  orden,
  "vitrinaDestacada": vitrinaDestacada->${VITRINA_PROJECTION}
}`;

const BANNER_PROJECTION = `{
  "_id": _id,
  titulo,
  tipo,
  descripcion,
  estilo,
  color,
  link,
  botonTexto,
  prioridad
}`;

export async function getCategorias(): Promise<Categoria[]> {
  try{
    console.log("Fetching categories from Sanity...");
  return getClient().fetch(`*[_type == "categoria"] | order(orden asc) ${CATEGORIA_PROJECTION}`);
  }
  catch(error){
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getCategoriaBySlug(slug: string): Promise<Categoria | null> {
  try {
    return getClient().fetch(`*[_type == "categoria" && slug.current == $slug][0] ${CATEGORIA_PROJECTION}`, { slug });
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
}

export async function getProductosByCategoria(categoriaSlug: string): Promise<Producto[]> {
  return getClient().fetch(
    `*[_type == "producto" && categoria->slug.current == $categoriaSlug] | order(destacado desc, nombre asc) ${PRODUCTO_PROJECTION}`,
    { categoriaSlug },
  );
}

export async function getAllProductos(): Promise<Producto[]> {
  try {
    return await getClient().fetch(`*[_type == "producto"] | order(nombre asc) ${PRODUCTO_PROJECTION}`);
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

export async function getProductoBySlug(slug: string): Promise<Producto | null> {
  try {
    return await getClient().fetch(`*[_type == "producto" && slug.current == $slug][0] ${PRODUCTO_PROJECTION}`, {
      slug,
    });
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

export async function getBanners(): Promise<Banner[]> {
  return getClient().fetch(
    `*[_type == "banner" && activo == true
      && (!defined(fechaInicio) || fechaInicio <= now())
      && (!defined(fechaFin) || fechaFin >= now())
    ] | order(prioridad asc) ${BANNER_PROJECTION}`,
  );
}

export async function getVitrinaProductos(vitrina: Vitrina): Promise<Producto[]> {
  if (vitrina.modo === "manual") {
    return (vitrina.productos ?? []).slice(0, vitrina.limite);
  }

  if (vitrina.modo === "categoria" && vitrina.categoriaSlug) {
    const productos = await getProductosByCategoria(vitrina.categoriaSlug);
    const filtrados = vitrina.soloDestacados ? productos.filter((producto) => producto.destacado) : productos;
    return filtrados.slice(0, vitrina.limite);
  }

  return [];
}

export const DEFAULT_SECCIONES_HOME: SeccionHome[] = [
  { tipo: "hero", visible: true },
  { tipo: "marcas", visible: true },
  { tipo: "banners", visible: true },
  { tipo: "categorias", visible: true },
  { tipo: "sobreNosotros", visible: true },
  { tipo: "porQueElegirnos", visible: true },
  { tipo: "contactoCta", visible: true },
];

export async function getConfiguracionHome(): Promise<SeccionHome[]> {
  try {
    const secciones = await getClient().fetch<SeccionHome[] | null>(
      `*[_type == "configuracionHome"][0].secciones[]{
        tipo,
        visible,
        "vitrina": vitrina->${VITRINA_PROJECTION}
      }`,
    );
    return secciones && secciones.length > 0 ? secciones : DEFAULT_SECCIONES_HOME;
  } catch (error) {
    console.error("Error fetching configuracionHome:", error);
    return DEFAULT_SECCIONES_HOME;
  }
}
