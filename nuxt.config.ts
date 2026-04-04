// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/fonts"],
  css: ["@/assets/styles/main.css"],
  vite: {
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "better-auth/vue",
        "better-auth/client/plugins",
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "~/assets/styles/partials/_variables.scss" as *;',
        },
      },
    },
  },
  fonts: {
    families: [{ name: "Sentient Variable", provider: "fontshare" }],
  },
});
