<script setup lang="ts">
import { useRoute } from "#app";
const route = useRoute("credits");

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(route.path).first();
});

useSeoMeta({
  title: () =>
    page.value?.title ? `Reins | ${page.value.title}` : "Reins | Credits",
  description: () =>
    page.value?.description ||
    "Credits and acknowledgments for Reins, World of Warcraft mount tracker.",
  ogSiteName: "Reins",
  ogTitle: () =>
    page.value?.title ? `Reins | ${page.value.title}` : "Reins | Credits",
  ogDescription: () =>
    page.value?.description ||
    "Credits and acknowledgments for Reins, World of Warcraft mount tracker.",
  ogImage: "/images/logo.png",
  ogImageAlt: "Reins - WoW Mount Tracker",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: () =>
    page.value?.title ? `Reins | ${page.value.title}` : "Reins | Credits",
  twitterDescription: () =>
    page.value?.description ||
    "Credits and acknowledgments for Reins, World of Warcraft mount tracker.",
  twitterImage: "/images/logo.png",
  twitterImageAlt: "Reins - WoW Mount Tracker",
});
</script>

<template>
  <main class="credits">
    <ContentRenderer v-if="page" :value="page" />
  </main>
</template>

<style lang="scss">
.credits {
  max-width: 800px;
  margin: auto;
}
</style>
