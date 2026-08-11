import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons/Tag";

export const BRAND_COLORS = [
  "brand-red",
  "brand-magenta",
  "brand-blue",
  "brand-yellow",
  "brand-orange",
  "brand-celeste",
] as const;

export const ICON_ANIMATIONS = ["wobble", "pop", "wiggle", "tilt", "flutter", "bob"] as const;

export const categoria = defineType({
  name: "categoria",
  title: "Categoría",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({ name: "nombre", title: "Nombre", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "nombre" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icono",
      title: "Ícono (emoji)",
      type: "string",
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
      name: "anim",
      title: "Animación del ícono",
      type: "string",
      options: { list: [...ICON_ANIMATIONS] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "orden", title: "Orden", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "nombre", subtitle: "descripcion" },
  },
});
