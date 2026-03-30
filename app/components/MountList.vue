<script setup lang="ts">
// console.clear();
import { onMounted, ref } from "vue";
import mountsGlobal from "@/assets/data/mounts.json";
const { data: userMounts, error } = await useFetch("/api/mounts");

// const isLogged = document.cookie.get({
//   name: "better-auth.session_token"
// })

// console.log(document.cookie);

// function getCookie(name: any) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return (parts.pop() as any).split(";").shift();
// }

// const cookies = getCookie("better-auth.session_token");

// console.log(cookies);

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

const userMountsIds = userMounts.value?.map((item: any) => {
  return item.mount.id;
});

const ownedMountArrawy: number[] = [];

mountsGlobal.forEach((item) => {
  item?.subcats?.forEach((subcats) => {
    subcats?.items?.forEach((mount) => {
      if (userMountsIds?.includes(mount.ID)) {
        ownedMountArrawy.push(mount.ID);
      }
    });
  });
});
</script>

<template>
  <div>
    <!-- <h2>Montures globales</h2> -->
    <div>
      <div v-for="expansion in mountsGlobal" :key="expansion.name">
        <h2>{{ expansion.name }}</h2>
        <div v-for="subcat in expansion.subcats" :key="subcat.name">
          <h3>
            {{ subcat.name }}
          </h3>
          <ul>
            <li
              v-for="mount in subcat.items"
              :key="mount.ID"
              class="mount-item"
              :class="{
                'mount-item__owned': ownedMountArrawy.includes(mount.ID),
              }"
            >
              <a
                :href="`https://wowhead.com/ptr/mount/${mount.ID}`"
                target="_blank"
                class="mount-item__link"
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

<style lang="scss" scoped>
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
  opacity: 0.25;
  &__owned {
    opacity: 1;
  }
  &__link {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
