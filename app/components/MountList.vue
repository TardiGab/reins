<script setup lang="ts">
import mountsGlobal from "@/assets/data/mounts.json";

const { data, error } = await useFetch("/api/mounts");

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
    <div v-if="mountsGlobal">
      <div v-for="expansion in mountsGlobal" :key="expansion.name">
        <h3>{{ expansion.name }}</h3>
        <div v-for="subcat in expansion.subcats" :key="subcat.name">
          <h4>
            {{ subcat.name }}
          </h4>
          <ul>
            <li v-for="mount in subcat.items" :key="mount.ID">
              {{ mount.name }} - {{ mount.ID }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
