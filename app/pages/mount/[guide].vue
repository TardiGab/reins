<script setup lang="ts">
import { useRoute } from "#app";
import mounts from "@/assets/data/mounts.json";

interface Mount {
  ID?: number;
  icon?: string;
  itemId?: number;
  name?: string;
  spellid?: number;
}

const route = useRoute("mount-guide");

let mountInfos: Mount = {};

mounts.forEach((category) => {
  category.subcats.forEach((subcat) => {
    subcat.items.forEach((mount) => {
      if (mount.ID === Number(route.params.guide)) {
        mountInfos = mount;
      }
    });
  });
});

useHead({
  title: `Reins | ${mountInfos.name}`,
});
</script>

<template>
  <img
    :src="`https://wow.zamimg.com/images/wow/icons/medium/${mountInfos.icon}.jpg`"
    class="mount-item__icon"
  />
  <p>{{ mountInfos.name }}</p>
</template>
