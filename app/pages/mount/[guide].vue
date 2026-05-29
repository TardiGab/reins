<script setup lang="ts">
import { useRoute } from "#app";
import mounts from "@/assets/data/mounts.json";

interface Mount {
  ID?: number;
  icon?: string;
  itemId?: number;
  name?: string;
  spellid?: number;
  notObtainable?: boolean;
  notReleased?: boolean;
  side?: string;
}

const route = useRoute("mount-guide");

let mountInfos: Mount = {};

mounts.forEach((category) => {
  category.subcats.forEach((subcat) => {
    subcat.items.forEach((mount) => {
      if (
        mount.name?.replace(/\W+/g, "-").toLowerCase() === route.params.guide
      ) {
        mountInfos = mount;
      }
    });
  });
});

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(route.path).first();
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: `Reins | ${mountInfos.name || "Mount Not Found"}`,
  meta: [
    {
      name: "description",
      content: `Guide to obtain the ${mountInfos.name} mount in World of Warcraft.`,
    },
    {
      property: "og:sitename",
      content: "Reins",
    },
    {
      property: "og:title",
      content: `Reins | ${mountInfos.name || "Mount Not Found"}`,
    },
    {
      property: "og:description",
      content: `Guide to obtain the ${mountInfos.name} mount in World of Warcraft.`,
    },
    {
      property: "og:image",
      content:
        (page.value?.meta.image as string) ||
        `https://wow.zamimg.com/images/wow/icons/large/${mountInfos.icon}.jpg`,
    },
  ],
});
</script>

<template>
  <GuidesTemplate v-if="mountInfos.name">
    <template #template v-if="page">
      <ContentRenderer :value="page" />
    </template>
    <template #template v-else>
      <GuidesContentNotFound />
    </template>
  </GuidesTemplate>
  <div v-else class="empty-page">
    <h2 class="empty-page__h2">Mount Not Found</h2>
    <p class="empty-page__message">
      Oops! We've searched everywhere but couldn't find that mount.
    </p>
    <NuxtLink to="/" class="empty-page__link empty-page__link--red">
      <span class="empty-page__label">Go back home</span>
    </NuxtLink>
  </div>
</template>
