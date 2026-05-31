<script setup lang="ts">
import { useRoute } from "#app";
const route = useRoute("credits");

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(route.path).first();
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
  h2 {
    @include gradient-heading($h2-size, 800);
    text-align: left;
    margin-bottom: 1rem;
  }
  h3 {
    font-size: $h3-size;
    text-align: left;
    margin-bottom: 0.5rem;
    a {
      color: white;
    }
  }
  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
}
</style>
