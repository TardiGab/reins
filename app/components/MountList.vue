<script setup lang="ts">
const { data, error } = await useFetch("/api/mounts");
</script>

<template>
  <div>
    <h2>Montures data</h2>
    <pre v-if="data">{{ data }}</pre>
    <p v-else-if="error">Error fetching mounts</p>
    <!-- <pre>{{ data }}</pre> -->
    <!-- <button @click="getMounts">Get Mounts</button>
    <pre>{{ data.mounts }}</pre> -->
    <!-- <pre>{{ session.data }}</pre> -->
  </div>
</template>
