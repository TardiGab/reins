<script lang="ts" setup>
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(route.path).first();
});

console.log(page.value);
</script>

<template>
  <template v-if="page">
    <ContentRenderer :value="page" />
  </template>
  <template v-else>
    <div class="empty-page">
      <h2>Page Not Found</h2>
      <p>Oops! The content you're looking for doesn't exist (yet).</p>
      <NuxtLink to="/">Go back home</NuxtLink>
    </div>
  </template>
</template>
