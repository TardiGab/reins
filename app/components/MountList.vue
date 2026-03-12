<script setup lang="ts">
const { data, error } = await useFetch("/api/mounts");
</script>

<template>
  <div>
    <h2>Montures data</h2>
    <!-- <pre v-if="data">{{ data }}</pre> -->
    <div v-if="data">
      <ul>
        <li v-for="mounts in data">
          {{ mounts.mount.name }} {{ mounts.mount.id }}
        </li>
      </ul>
    </div>
    <p v-else-if="error">Error fetching mounts</p>
    <p v-else>Loading...</p>
    <!-- <pre>{{ data }}</pre> -->
    <!-- <button @click="getMounts">Get Mounts</button> -->
    <!-- <pre>{{ data.mounts }}</pre> -->
    <!-- <pre>{{ session.data }}</pre> -->
  </div>
</template>
