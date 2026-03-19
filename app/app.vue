<script setup lang="ts">
useHead({
  title: "Reins",
  script: [
    {
      innerHTML: `const whTooltips = {colorLinks: true, iconizeLinks: true, renameLinks: true};`,
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
