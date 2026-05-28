// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/fonts", "@nuxt/content"],
  css: ["@/assets/styles/main.scss"],
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
          additionalData: `
            @use "~/assets/styles/partials/_variables.scss" as *;
            @use "~/assets/styles/partials/_base.scss" as *; 
            @use "~/assets/styles/partials/_mixins.scss" as *; 
            `,
        },
      },
    },
  },
  fonts: {
    families: [{ name: "Sentient Variable", provider: "fontshare" }],
  },
  pages: true,
  devServer: {
    port: 3000,
    host: "0.0.0.0",
  },
  content: {
    experimental: {
      sqliteConnector: "native",
    },
  },
});
