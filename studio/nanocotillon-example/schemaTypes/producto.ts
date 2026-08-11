import { defineArrayMember, defineField, defineType } from "sanity";
import { PackageIcon } from "@sanity/icons/Package";

export const producto = defineType({
  name: "producto",
  title: "Producto",
  type: "document",
  icon: PackageIcon,
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
      name: "categoria",
      title: "Categoría",
      type: "reference",
      to: [{ type: "categoria" }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "descripcion", title: "Descripción", type: "text" }),
    defineField({
      name: "imagenes",
      title: "Imágenes",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })],
        }),
      ],
      validation: (rule) => rule.min(1).required(),
    }),
    defineField({ name: "precio", title: "Precio", type: "number" }),
    defineField({
      name: "disponibilidad",
      title: "Disponibilidad",
      type: "string",
      options: {
        list: [
          { title: "Disponible", value: "disponible" },
          { title: "Agotado", value: "agotado" },
          { title: "Próximamente", value: "proximamente" },
        ],
      },
      initialValue: "disponible",
    }),
    defineField({ name: "stock", title: "Stock", type: "number" }),
    defineField({ name: "sku", title: "SKU", type: "string" }),
    defineField({ name: "destacado", title: "Destacado", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "nombre", subtitle: "categoria.nombre", media: "imagenes.0" },
  },
});
