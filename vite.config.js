import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        host: true, // <-- bu LAN orqali kirish imkonini beradi
        port: 8000, // <-- istalgan port
    },
});
