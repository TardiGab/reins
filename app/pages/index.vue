<script setup lang="ts">
const { data: userMounts, error } = await useFetch("/api/mounts");

// if (error) {
//   navigateTo("/login");
// }
</script>

<template>
  <Header />
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
