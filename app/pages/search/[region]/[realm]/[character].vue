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

const charTitle = computed(
  () => `Reins | Visiting ${route.params.character}'s stable`,
);
const charDescription = computed(
  () =>
    `Check out ${route.params.character}'s World of Warcraft mount collection on realm ${route.params.realm} (${String(route.params.region).toUpperCase()}) with Reins!`,
);

useSeoMeta({
  title: charTitle,
  description: charDescription,
  ogSiteName: "Reins",
  ogTitle: charTitle,
  ogDescription: charDescription,
  ogImage: "/images/logo.png",
  ogImageAlt: "Reins - WoW Mount Tracker",
  ogType: "profile",
  twitterCard: "summary_large_image",
  twitterTitle: charTitle,
  twitterDescription: charDescription,
  twitterImage: "/images/logo.png",
  twitterImageAlt: "Reins - WoW Mount Tracker",
});
</script>

<template>
  <main class="character">
    <MountSidePanel class="character__side-panel" />
    <div class="character__right">
      <p class="character__name">
        Visiting {{ route.params.character }}'s stable.
      </p>
      <CompareMountList
        :character-mounts="characterMounts"
        class="character__collection"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.character {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  &__side-panel {
    @media screen and (max-width: 780px) {
      display: none;
    }
  }
  &__right {
    flex: 1;
    @media screen and (max-width: 780px) {
      width: 100%;
    }
  }
  &__collection {
    width: 100%;
  }
  &__name {
    font-size: $main-size;
    margin-left: 1rem;
    display: none;
    @media screen and (max-width: 780px) {
      display: block;
    }
  }
}
</style>
