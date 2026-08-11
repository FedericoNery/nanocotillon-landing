import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'nanocotillon-example',

  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.SANITY_STUDIO_DATASET || 'your-dataset-id',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
