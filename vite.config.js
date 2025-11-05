import {
  defineConfig
}

from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig( {

    plugins: [react()],
    build: {

      // Minify JavaScript
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log'],
        }

        ,
      }

      ,
      // Code splitting and chunk optimization
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          }

          ,
          // Optimize asset naming
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
        }

        ,
      }

      ,
      // Optimize chunk size
      chunkSizeWarningLimit: 500,
      // Source maps for production debugging (optional, increases size)
      sourcemap: false,
      // CSS code splitting
      cssCodeSplit: true,
      // Target modern browsers for smaller bundle
      target: 'es2015',
    }

    ,
    // Enable caching
    server: {
      headers: {
        'Cache-Control': 'public, max-age=31536000',
      }

      ,
    }

    ,
  }

)