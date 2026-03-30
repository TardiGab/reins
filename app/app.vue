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
});
</script>

<template>
  <Header />
  <MountList />
</template>
