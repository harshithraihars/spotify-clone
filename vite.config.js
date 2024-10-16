// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base:"/spotify-clone/",
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base:"/spotify-clone/",
  build: {
    rollupOptions: {
      external: ['react-router-dom'],  // Externalize react-router-dom
    },
  },
});
