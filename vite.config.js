import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    // This forces Vercel to only use ONE version of these 3D libraries
    dedupe: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
  },
})