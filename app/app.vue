<script setup lang="ts">
useHead({
  title: "Reins",
  script: [
    {
      innerHTML: `const whTooltips = {colorLinks: true, iconizeLinks: false, iconSize: false, renameLinks: false};`,
      // defer: true,
    },
    {
      src: "https://wow.zamimg.com/js/tooltips.js",
      // defer: true,
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
</script>

<template>
  <div>
    <Header />
    <NuxtPage />
  </div>
</template>
