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

export interface Categoria {
  _id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  icono: string;
  color: (typeof BRAND_COLORS)[number];
  anim: (typeof ICON_ANIMATIONS)[number];
  orden: number;
}

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

const CATEGORIA_PROJECTION = `{
  "_id": _id,
  "slug": slug.current,
  nombre,
  descripcion,
  icono,
  color,
  anim,
  orden
}`;

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

export async function getBanners(): Promise<Banner[]> {
  return getClient().fetch(
    `*[_type == "banner" && activo == true
      && (!defined(fechaInicio) || fechaInicio <= now())
      && (!defined(fechaFin) || fechaFin >= now())
    ] | order(prioridad asc) ${BANNER_PROJECTION}`,
  );
}
