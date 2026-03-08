import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    dedupe: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
  },
  build: {
    chunkSizeWarningLimit: 2000, // Tells Vite: "Relax, I am building a 3D site, the files are going to be bigger."
  }
})