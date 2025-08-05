import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/site-recrutamento-marinha/teste-psicologico/', 
  plugins: [react()],
});
