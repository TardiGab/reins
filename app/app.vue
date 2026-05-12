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
