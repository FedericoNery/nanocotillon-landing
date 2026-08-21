import { defineArrayMember, defineField, defineType } from "sanity";
import { ThLargeIcon } from "@sanity/icons/ThLarge";

export const VITRINA_MODOS = ["manual", "categoria"] as const;

export const vitrina = defineType({
  name: "vitrina",
  title: "Vitrina de productos",
  type: "document",
  icon: ThLargeIcon,
  fields: [
    defineField({ name: "titulo", title: "Título", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "titulo" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "descripcion", title: "Descripción", type: "text" }),
    defineField({
      name: "modo",
      title: "Modo",
      type: "string",
      options: {
        list: [
          { title: "Lista manual de productos", value: "manual" },
          { title: "Por categoría", value: "categoria" },
        ],
      },
      initialValue: "manual",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "productos",
      title: "Productos (orden manual)",
      description: "Se usa cuando el modo es 'Lista manual de productos'.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "producto" }] })],
      hidden: ({ parent }) => parent?.modo !== "manual",
    }),
    defineField({
      name: "categoria",
      title: "Categoría",
      description: "Se usa cuando el modo es 'Por categoría'.",
      type: "reference",
      to: [{ type: "categoria" }],
      hidden: ({ parent }) => parent?.modo !== "categoria",
    }),
    defineField({
      name: "soloDestacados",
      title: "Solo productos destacados",
      description: "Si el modo es 'Por categoría', mostrar únicamente productos marcados como destacados.",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.modo !== "categoria",
    }),
    defineField({
      name: "limite",
      title: "Cantidad máxima de productos",
      type: "number",
      initialValue: 8,
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "verTodosLink",
      title: "Link 'Ver todos' (opcional)",
      description: "Ej: /productos/golosinas",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "titulo", subtitle: "modo" },
  },
});
