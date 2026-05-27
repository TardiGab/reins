<script setup lang="ts">
defineProps<{
  src: string;
  alt?: string;
}>();
</script>

<template>
  <img :src="src" :alt="alt" class="guide-img" />
</template>

<style scoped lang="scss">
.guide-img {
  width: 100%;
  height: auto;
  margin: 1rem 0;
  @include border-radius(0.5rem, true);
  @include container-border();
}
</style>
