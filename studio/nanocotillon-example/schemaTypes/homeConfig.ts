import { defineArrayMember, defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons/Home";

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

const SECCION_HOME_TIPO_LABELS: Record<(typeof SECCION_HOME_TIPOS)[number], string> = {
  hero: "Hero (portada)",
  marcas: "Marcas (carrusel)",
  categorias: "Categorías",
  sobreNosotros: "Sobre nosotros",
  porQueElegirnos: "Por qué elegirnos",
  banners: "Banners / Ofertas",
  vitrina: "Vitrina personalizada",
  contactoCta: "Contacto (CTA final)",
};

export const homeConfig = defineType({
  name: "configuracionHome",
  title: "Configuración de la Home",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "secciones",
      title: "Secciones (orden)",
      description: "Arrastrá para reordenar. Cada bloque puede ocultarse sin borrarlo.",
      type: "array",
      of: [
        defineArrayMember({
          name: "seccion",
          title: "Sección",
          type: "object",
          fields: [
            defineField({
              name: "tipo",
              title: "Tipo de sección",
              type: "string",
              options: {
                list: SECCION_HOME_TIPOS.map((value) => ({ title: SECCION_HOME_TIPO_LABELS[value], value })),
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "vitrina",
              title: "Vitrina",
              type: "reference",
              to: [{ type: "vitrina" }],
              hidden: ({ parent }) => parent?.tipo !== "vitrina",
              validation: (rule) =>
                rule.custom((value, context) => {
                  const parent = context.parent as { tipo?: string } | undefined;
                  if (parent?.tipo === "vitrina" && !value) return "Elegí una vitrina para este bloque";
                  return true;
                }),
            }),
            defineField({ name: "visible", title: "Visible", type: "boolean", initialValue: true }),
          ],
          preview: {
            select: { tipo: "tipo", visible: "visible", vitrinaTitulo: "vitrina.titulo" },
            prepare({ tipo, visible, vitrinaTitulo }) {
              const label = SECCION_HOME_TIPO_LABELS[tipo as (typeof SECCION_HOME_TIPOS)[number]] || tipo;
              return {
                title: tipo === "vitrina" && vitrinaTitulo ? `${label}: ${vitrinaTitulo}` : label,
                subtitle: visible === false ? "Oculto" : "Visible",
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Configuración de la Home" };
    },
  },
});
