<script setup lang="ts">
import mountsGlobal from "@/assets/data/mounts.json";
console.log(mountsGlobal);
const { data, error } = await useFetch("/api/mounts");
const { data: icons } = await useFetch("/api/icons");

// declare var $WowheadPower: any;

// // $WowheadPower.refreshLinks();
</script>

<template>
  <!-- <div>
    <h2>Montures possédées</h2>
    <div v-if="data">
      <ul>
        <li v-for="mounts in data">
          <a
            :href="`https://wowhead.com/mount/${mounts.mount.id}?domain=fr`"
            data-wh-rename-link="true"
          >
            {{ mounts.mount.name }}
          </a>
        </li>
      </ul>
    </div>
    <p v-else-if="error">Error fetching mounts : {{ error }}</p>
    <p v-else>Loading...</p>
  </div> -->
  <div>
    <h2>Montures globales</h2>
    <div v-if="mountsGlobal && data">
      <div v-for="expansion in mountsGlobal" :key="expansion.name">
        <h3>{{ expansion.name }}</h3>
        <div v-for="subcat in expansion.subcats" :key="subcat.name">
          <h4>
            {{ subcat.name }}
          </h4>
          <ul>
            <li v-for="mount in subcat.items" :key="mount.ID">
              <a
                :href="`https://wwww.wowhead.com/mount/${mount.ID}`"
                class="mount-item"
              >
                <!-- <img
                  :src="`https://wow.zamimg.com/images/wow/icons/medium/${mount.icon}.jpg`"
                  alt=""
                  srcset=""
                /> -->
                <img
                  :src="`https://render.worldofwarcraft.com/eu/icons/56/ability_mount_drake_blue.jpg`"
                  alt=""
                  srcset=""
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
