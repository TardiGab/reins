<script setup lang="ts">
import mountsGlobal from "@/assets/data/mounts.json";
const { data, error } = await useFetch("/api/mounts");
</script>

<template>
  <div>
    <h2>Montures possédées</h2>
    <!-- <pre v-if="data">{{ data }}</pre> -->
    <div v-if="data">
      <ul>
        <li v-for="mounts in data">
          <a
            :href="`https://wowhead.com/mount/${mounts.mount.id}?domain=fr`"
            data-wh-rename-link="true"
          >
            {{ mounts.mount.name }} - {{ mounts.mount.id }}
          </a>
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
              <a
                :href="`https://wwww.wowhead.com/mount/${mount.ID}?domain=fr`"
                data-wh-rename-link="true"
              >
                {{ mount.name }} - {{ mount.ID }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
