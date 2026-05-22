<script setup lang="ts">
import { useRoute } from "#app";

const route = useRoute();

const { data: characterMounts, execute: go } = await useFetch(
  "/api/character-mounts",
  {
    query: {
      region: route.params.region,
      realm: route.params.realm,
      character: route.params.character,
    },
  },
);
onMounted(async () => {
  await go();
});
</script>

<template>
  <div class="character">
    <MountSidePanel />
    <div class="character__right">
      <p>{{ $route.params.character }}'s mounts collection</p>
      <CompareMountList
        :character-mounts="characterMounts"
        class="character__collection"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.character {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  &__collection {
    width: 100%;
  }
}
</style>
