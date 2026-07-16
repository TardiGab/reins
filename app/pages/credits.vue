<script setup lang="ts">
import { useRoute } from "#app";
const route = useRoute("credits");

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(route.path).first();
});

useHead({
  title: `Reins | ${page.value?.title}`,
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
