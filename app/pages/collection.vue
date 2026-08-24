<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: "Reins | Your Collection",
  description:
    "Explore and manage your World of Warcraft mount collection. View acquired mounts, missing mounts, and pin mounts to your wishlist.",
  ogSiteName: "Reins",
  ogTitle: "Reins | Your Collection",
  ogDescription:
    "Explore and manage your World of Warcraft mount collection. View acquired mounts, missing mounts, and pin mounts to your wishlist.",
  ogImage: "/images/logo.png",
  ogImageAlt: "Reins - WoW Mount Tracker",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "Reins | Your Collection",
  twitterDescription:
    "Explore and manage your World of Warcraft mount collection. View acquired mounts, missing mounts, and pin mounts to your wishlist.",
  twitterImage: "/images/logo.png",
  twitterImageAlt: "Reins - WoW Mount Tracker",
});
</script>

<template>
  <main class="main">
    <MountSidePanel class="main__side-panel" />
    <MountList class="main__mount-list" />
  </main>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  gap: 1rem;
  &__side-panel {
    @media screen and (max-width: 780px) {
      display: none;
    }
  }
  &__mount-list {
    @media screen and (max-width: 780px) {
      width: 100%;
    }
  }
}
</style>
