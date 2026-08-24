<script lang="ts" setup>
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(route.path).first();
});

useSeoMeta({
  title: () =>
    page.value?.title
      ? `Reins | ${page.value.title}`
      : "Reins | Mount Not Found",
  description: () =>
    page.value?.description ||
    "Oops! The content you're looking for doesn't exist (yet).",
  ogSiteName: "Reins",
  ogTitle: () =>
    page.value?.title
      ? `Reins | ${page.value.title}`
      : "Reins | Mount Not Found",
  ogDescription: () =>
    page.value?.description ||
    "Oops! The content you're looking for doesn't exist (yet).",
  ogImage: "/images/logo.png",
  ogImageAlt: "Reins - WoW Mount Tracker",
  ogType: "article",
  twitterCard: "summary_large_image",
  twitterTitle: () =>
    page.value?.title
      ? `Reins | ${page.value.title}`
      : "Reins | Mount Not Found",
  twitterDescription: () =>
    page.value?.description ||
    "Oops! The content you're looking for doesn't exist (yet).",
  twitterImage: "/images/logo.png",
  twitterImageAlt: "Reins - WoW Mount Tracker",
});
</script>

<template>
  <template v-if="page">
    <ContentRenderer :value="page" />
  </template>
  <template v-else>
    <div class="empty-page">
      <h2 class="empty-page__h2">Mount Not Found</h2>
      <p class="empty-page__message">
        Oops! We've searched everywhere but couldn't find that mount.
      </p>
      <NuxtLink to="/" class="empty-page__link empty-page__link--red">
        <span class="empty-page__label">Go back home</span>
      </NuxtLink>
    </div>
  </template>
</template>
