<script setup lang="ts">
import { useRoute } from "#app";
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(route.path).first();
});

useSeoMeta({
  title: () =>
    page.value?.title
      ? `Reins | ${page.value.title}`
      : "Reins | Privacy Policy",
  description: () =>
    page.value?.description ||
    "Privacy Policy and global data protection disclosures for Reins, World of Warcraft mount tracker.",
  ogSiteName: "Reins",
  ogTitle: () =>
    page.value?.title
      ? `Reins | ${page.value.title}`
      : "Reins | Privacy Policy",
  ogDescription: () =>
    page.value?.description ||
    "Privacy Policy and global data protection disclosures for Reins, World of Warcraft mount tracker.",
  ogImage: "/images/logo.png",
  ogImageAlt: "Reins - WoW Mount Tracker",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: () =>
    page.value?.title
      ? `Reins | ${page.value.title}`
      : "Reins | Privacy Policy",
  twitterDescription: () =>
    page.value?.description ||
    "Privacy Policy and global data protection disclosures for Reins, World of Warcraft mount tracker.",
  twitterImage: "/images/logo.png",
  twitterImageAlt: "Reins - WoW Mount Tracker",
});
</script>

<template>
  <main class="privacy-policy">
    <ContentRenderer v-if="page" :value="page" />
  </main>
</template>

<style lang="scss">
.privacy-policy {
  max-width: 800px;
  margin: auto;
  padding: 2rem 1rem;
}
</style>
