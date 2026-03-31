/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Usamos el nombre del paquete directamente
    require("daisyui")
  ],
  // Esto es para que el tema "corporate" de abogado funcione
  daisyui: {
    themes: ["corporate"], 
  },
}