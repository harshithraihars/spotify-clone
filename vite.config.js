// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   // base:"/spotify-clone/",
// })
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Example: To split vendor code into a separate chunk
          vendor: ['react', 'react-router-dom'],
        },
      },
    },
  },
});
