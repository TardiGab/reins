<script setup lang="ts">
const { data, error } = await useFetch("/api/mounts");
</script>

<template>
  <div>
    <h2>Montures possédées</h2>
    <!-- <pre v-if="data">{{ data }}</pre> -->
    <div v-if="data">
      <ul>
        <li v-for="mounts in data">
          {{ mounts.mount.name }} - {{ mounts.mount.id }}
        </li>
      </ul>
    </div>
    <p v-else-if="error">Error fetching mounts : {{ error }}</p>
    <p v-else>Loading...</p>
  </div>
</template>
