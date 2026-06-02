<script setup lang="ts">
useHead({
  title: "Reins",
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
