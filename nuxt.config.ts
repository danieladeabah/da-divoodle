// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: ['~/plugins/pinia'],
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["nuxt-icon", "nuxt-snackbar", "@nuxt/ui"],
  snackbar: {
    top: true,
    right: true,
    duration: 5000,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});