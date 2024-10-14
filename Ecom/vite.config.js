import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'react-redux',
        '@reduxjs/toolkit',
        'firebase/firestore',
        'react-toastify',
        'firebase/auth',
        'react-tabs',
        'react-icons/fa'  // Add any other modules you encounter
      ]
    }
  }
});