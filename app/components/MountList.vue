<script setup lang="ts">
const { data, error } = await useFetch("/api/mounts");

import mountsGlobal from "@/assets/data/mounts.json";

console.log("Mounts global : ", mountsGlobal);
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
  <div>
    <h2>Montures globales</h2>
    <!-- <pre v-if="mountsGlobal">{{ mountsGlobal.data }}</pre> -->
    <div v-if="mountsGlobal">
      <div v-for="expansion in mountsGlobal" :key="expansion.name">
        <h3>{{ expansion.name }}</h3>
        <h4 v-for="subcat in expansion.subcats" :key="subcat.name">
          {{ subcat.name }}
        </h4>
        <!-- <p v-for="mount in expansion.subcats.items">{{  }}</p> -->
      </div>
    </div>
  </div>
</template>
