<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? titleChunk.includes("Reins")
        ? titleChunk
        : `${titleChunk} | Reins`
      : "Reins | World of Warcraft Mount Tracker";
  },
  htmlAttrs: {
    lang: "en",
  },
  script: [
    {
      innerHTML: `const whTooltips = {colorLinks: true, iconizeLinks: false, iconSize: false, renameLinks: false};`,
    },
    {
      src: "https://wow.zamimg.com/js/tooltips.js",
      defer: true,
    },
  ],
  link: [
    {
      rel: "stylesheet",
      href: "https://use.typekit.net/wyy1zbc.css",
    },
  ],
});

useSeoMeta({
  title: "Reins | World of Warcraft Mount Tracker",
  description:
    "Track your World of Warcraft mount collection, plan farming routes, compare stables with friends, and discover detailed mount guides on Reins.",
  ogSiteName: "Reins",
  ogTitle: "Reins | World of Warcraft Mount Tracker",
  ogDescription:
    "Track your World of Warcraft mount collection, plan farming routes, compare stables with friends, and discover detailed mount guides on Reins.",
  ogImage: "/images/logo.png",
  ogImageAlt: "Reins - WoW Mount Tracker",
  ogType: "website",
  ogLocale: "en_US",
  twitterCard: "summary_large_image",
  twitterTitle: "Reins | World of Warcraft Mount Tracker",
  twitterDescription:
    "Track your World of Warcraft mount collection, plan farming routes, compare stables with friends, and discover detailed mount guides on Reins.",
  twitterImage: "/images/logo.png",
  twitterImageAlt: "Reins - WoW Mount Tracker",
});

// Retrieved 2026-03-20, License - CC BY-SA 4.0
// Source - https://stackoverflow.com/a/56458070
// Posted by Titian Cernicova-Dragomir, modified by community. See post 'Timeline' for change history
declare global {
  interface Window {
    $WowheadPower: any;
  }
}

onMounted(() => {
  if (window.$WowheadPower) {
    window.$WowheadPower.refreshLinks();
  }
});

const navState = ref(false);
const handleNavOpened = (state: boolean) => {
  navState.value = state;
};
</script>

<template>
  <NuxtLoadingIndicator color="#FFD100" />
  <Header @nav-opened="handleNavOpened" />
  <NuxtPage class="content" :class="{ 'nav-opened': navState }" />
  <Footer />
</template>

<style lang="scss">
.content {
  transition: opacity 0.3s ease;
  @media screen and (max-width: 780px) {
    opacity: 1;
  }
  &.nav-opened {
    @media screen and (max-width: 780px) {
      opacity: 0;
    }
  }
}
</style>
