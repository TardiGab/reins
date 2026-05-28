<script lang="ts" setup>
useHead({
  title: "Reins | Your collection",
});
</script>

<template>
  <main class="main">
    <MountSidePanel class="main__side-panel" />
    <GuideMountList class="main__mount-list" />
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
