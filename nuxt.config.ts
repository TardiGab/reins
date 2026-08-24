// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Reins | World of Warcraft Mount Tracker",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Track your World of Warcraft mount collection, plan farming routes, compare stables with friends, and discover detailed mount guides on Reins.",
        },
        {
          name: "keywords",
          content:
            "world of warcraft, wow, mounts, mount collection, mount tracker, wow mounts guide, blizzard, battle.net, farming mounts",
        },
        { name: "author", content: "Reins" },
        { name: "creator", content: "Reins" },
        { name: "publisher", content: "Reins" },
        { name: "robots", content: "index, follow" },
        { name: "theme-color", content: "#ffd100" },
        { name: "color-scheme", content: "dark" },
        { name: "application-name", content: "Reins" },
        { name: "apple-mobile-web-app-title", content: "Reins" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
        { name: "format-detection", content: "telephone=no" },
        // Open Graph / Facebook / LinkedIn / Discord
        { property: "og:site_name", content: "Reins" },
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "Reins | World of Warcraft Mount Tracker",
        },
        {
          property: "og:description",
          content:
            "Track your World of Warcraft mount collection, plan farming routes, compare stables with friends, and discover detailed mount guides on Reins.",
        },
        { property: "og:image", content: "/images/logo.png" },
        { property: "og:image:alt", content: "Reins - WoW Mount Tracker" },
        { property: "og:image:type", content: "image/png" },
        { property: "og:locale", content: "en_US" },
        // Twitter / X
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Reins | World of Warcraft Mount Tracker",
        },
        {
          name: "twitter:description",
          content:
            "Track your World of Warcraft mount collection, plan farming routes, compare stables with friends, and discover detailed mount guides on Reins.",
        },
        { name: "twitter:image", content: "/images/logo.png" },
        { name: "twitter:image:alt", content: "Reins - WoW Mount Tracker" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/images/logo.png" },
      ],
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/fonts",
    "@nuxt/content",
    "nuxt-studio",
    "@nuxtjs/color-mode",
    "@vercel/analytics",
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
    route: "/contribute",
  },
  colorMode: {
    preference: "dark",
    fallback: "dark",
  },
});
