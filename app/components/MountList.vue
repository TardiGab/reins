<script setup lang="ts">
import { onMounted } from "vue";
import mountsGlobal from "@/assets/data/mounts.json";
const { data, error } = await useFetch("/api/mounts");
console.log(data);

// Source - https://stackoverflow.com/a/56458070
// Posted by Titian Cernicova-Dragomir, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-20, License - CC BY-SA 4.0
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
  <div>
    <h2>Montures possédées</h2>
    <div v-if="data">
      <ul>
        <li v-for="mounts in data" :key="mounts.mount.id">
          <a :href="`https://wowhead.com/mount/${mounts.mount.id}`">
            {{ mounts.mount.name }}
          </a>
        </li>
      </ul>
    </div>
    <p v-else-if="error">Error fetching mounts : {{ error }}</p>
    <p v-else>Loading...</p>
  </div>
  <div>
    <h2>Montures globales</h2>
    <div>
      <div v-for="expansion in mountsGlobal" :key="expansion.name">
        <h3>{{ expansion.name }}</h3>
        <div v-for="subcat in expansion.subcats" :key="subcat.name">
          <h4>
            {{ subcat.name }}
          </h4>
          <ul>
            <li v-for="mount in subcat.items" :key="mount.ID">
              <a
                :href="`https://wowhead.com/ptr/mount/${mount.ID}`"
                class="mount-item"
              >
                <img
                  :src="`https://wow.zamimg.com/images/wow/icons/medium/${mount.icon?.toLowerCase()}.jpg`"
                />
                <span>{{ mount.name }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
}

li {
  list-style: none;
  padding: 0;
}

ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0;
}

.mount-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}
</style>
