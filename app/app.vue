<script setup lang="ts">
useHead({
  title: "Reins - Montures",
  script: [
    {
      src: "https://wow.zamimg.com/js/tooltips.js",
      innerHTML: `const whTooltips = {colorLinks: true, iconizeLinks: true, renameLinks: true};`,
    },
  ],
  // script: [{innerHTML: `const whTooltips = {colorLinks: true, iconizeLinks: true, renameLinks: true};`}]
});
</script>

<template>
  <Header />
  <MountList />
</template>
