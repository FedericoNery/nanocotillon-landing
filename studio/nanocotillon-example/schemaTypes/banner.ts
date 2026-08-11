import { defineArrayMember, defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons/Image";

export const BRAND_COLORS = [
  "brand-red",
  "brand-magenta",
  "brand-blue",
  "brand-yellow",
  "brand-orange",
  "brand-celeste",
] as const;

export const banner = defineType({
  name: "banner",
  title: "Banner / Oferta / Outlet",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({ name: "titulo", title: "Título", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "tipo",
      title: "Tipo",
      type: "string",
      options: {
        list: [
          { title: "Banner", value: "banner" },
          { title: "Oferta", value: "oferta" },
          { title: "Outlet", value: "outlet" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "descripcion", title: "Descripción", type: "text" }),
    defineField({
      name: "estilo",
      title: "Estilo visual",
      type: "string",
      options: {
        list: [
          { title: "Franja arriba (fondo claro)", value: "franja" },
          { title: "Rayas diagonales (fondo oscuro)", value: "diagonal" },
        ],
        layout: "radio",
      },
      initialValue: "franja",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "color",
      title: "Color de marca",
      type: "string",
      options: { list: [...BRAND_COLORS] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      description: "Ej: /productos/halloween o https://wa.me/...",
      type: "string",
    }),
    defineField({
      name: "botonTexto",
      title: "Texto del botón",
      type: "string",
      initialValue: "Ver productos",
    }),
    defineField({
      name: "categoriaRelacionada",
      title: "Categoría relacionada",
      type: "reference",
      to: [{ type: "categoria" }],
    }),
    defineField({
      name: "productosRelacionados",
      title: "Productos relacionados",
      description: "Para un outlet puntual sobre productos específicos.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "producto" }] })],
    }),
    defineField({ name: "fechaInicio", title: "Vigente desde", type: "datetime" }),
    defineField({ name: "fechaFin", title: "Vigente hasta", type: "datetime" }),
    defineField({
      name: "prioridad",
      title: "Prioridad",
      description: "Menor número aparece primero.",
      type: "number",
      initialValue: 0,
    }),
    defineField({ name: "activo", title: "Activo", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "titulo", subtitle: "tipo" },
  },
});
