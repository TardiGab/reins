// https://nuxt.com/docs/api/configuration/nuxt-config
const studioGithubClientId =
  process.env.STUDIO_GITHUB_CLIENT_ID ??
  process.env.NUXT_STUDIO_AUTH_GITHUB_CLIENT_ID;
const studioGithubClientSecret =
  process.env.STUDIO_GITHUB_CLIENT_SECRET ??
  process.env.NUXT_STUDIO_AUTH_GITHUB_CLIENT_SECRET;

if (studioGithubClientId && !process.env.STUDIO_GITHUB_CLIENT_ID) {
  process.env.STUDIO_GITHUB_CLIENT_ID = studioGithubClientId;
}

if (studioGithubClientSecret && !process.env.STUDIO_GITHUB_CLIENT_SECRET) {
  process.env.STUDIO_GITHUB_CLIENT_SECRET = studioGithubClientSecret;
}

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/fonts",
    "@nuxt/content",
    "nuxt-studio",
    "@nuxtjs/color-mode",
  ],
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
  studio: {
    repository: {
      provider: "github",
      owner: "TardiGab",
      repo: "reins",
      branch: "main",
    },
  },
  colorMode: {
    preference: "dark",
    fallback: "dark",
  },
});
