<script setup lang="ts">
useHead({
  title: "Reins | Pinned mounts",
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
