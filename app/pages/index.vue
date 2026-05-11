<script setup lang="ts">
// Retrieved 2026-03-20, License - CC BY-SA 4.0
// Source - https://stackoverflow.com/a/56458070
// Posted by Titian Cernicova-Dragomir, modified by community. See post 'Timeline' for change history
declare global {
  interface Window {
    $WowheadPower: any;
  }
}

onMounted(() => {
  if (window.$WowheadPower) {
    window.$WowheadPower.refreshLinks();
  }
});
</script>

<template>
  <main class="main">
    <MountSidePanel />
    <MountList />
  </main>
</template>

<style scoped>
.main {
  display: flex;
  gap: 1rem;
}
</style>
