<script setup lang="ts">
import { useRoute } from "#app";
import mounts from "@/assets/data/mounts.json";

const route = useRoute();

let mountInfos;

mounts.forEach((category) => {
  category.subcats.forEach((subcat) => {
    mountInfos = computed(() => {
      // console.log(subcat.items.find((mount) => mount.ID == route.params.guide as number));
      // return subcat.items.find((mount) => mount.ID === route.params.guide);
    });
  });
});

useHead({
  title: `Reins | ${route.params.guide}`,
});
</script>

<template>
  <p>{{ mountInfos }}</p>
</template>
