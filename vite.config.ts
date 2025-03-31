import { defineConfig } from 'vite'
import marko from "@marko/run/vite";
import netlify from "@marko/run-adapter-netlify";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    marko({
      adapter: netlify({ edge: true})
    })
  ],
})