<script setup lang="ts">
useSeoMeta({
  title: "Reins | Pinned Mounts",
  description:
    "View your pinned World of Warcraft mounts and track your favorite farming targets.",
  ogSiteName: "Reins",
  ogTitle: "Reins | Pinned Mounts",
  ogDescription:
    "View your pinned World of Warcraft mounts and track your favorite farming targets.",
  ogImage: "/images/logo.png",
  ogImageAlt: "Reins - WoW Mount Tracker",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "Reins | Pinned Mounts",
  twitterDescription:
    "View your pinned World of Warcraft mounts and track your favorite farming targets.",
  twitterImage: "/images/logo.png",
  twitterImageAlt: "Reins - WoW Mount Tracker",
});
</script>

<template>
  <MountSidePanel class="mobile-pinned" />
</template>

<style lang="scss" scoped>
.mobile-pinned {
  width: calc(100% - 0.5rem);
  width: 100%;
  height: calc(90vh - 1rem);
}
</style>
