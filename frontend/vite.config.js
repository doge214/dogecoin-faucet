import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // Дозволяє слухати на всіх інтерфейсах
        port: process.env.PORT || 5173, // Використовуйте порт, який ви хочете
        strictPort: false // Дозволяє змінювати порт, якщо він зайнятий
    },
})
