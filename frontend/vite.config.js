import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // Дозволяє слухати на всіх інтерфейсах
        port: 5173, // Використовуйте порт, який ви хочете
    },
})
