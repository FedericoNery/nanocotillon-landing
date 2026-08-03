import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const BRAND_COLORS = [
  'brand-red',
  'brand-magenta',
  'brand-blue',
  'brand-yellow',
  'brand-orange',
  'brand-celeste',
] as const;

export const ICON_ANIMATIONS = ['wobble', 'pop', 'wiggle', 'tilt', 'flutter', 'bob'] as const;

const categorias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/categorias' }),
  schema: z.object({
    nombre: z.string(),
    descripcion: z.string(),
    icono: z.string(),
    orden: z.number().default(0),
    color: z.enum(BRAND_COLORS),
    anim: z.enum(ICON_ANIMATIONS),
  }),
});

const productos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/productos' }),
  schema: z.object({
    nombre: z.string(),
    categoria: reference('categorias'),
    descripcion: z.string(),
  }),
});

export const collections = { categorias, productos };
