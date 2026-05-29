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
    <h2>Mount Not Found</h2>
    <p>Oops! We've searched everywhere but couldn't find that mount.</p>
    <NuxtLink to="/mount" class="empty-page__link">
      <span class="empty-page__label">Go back</span>
    </NuxtLink>
  </div>
</template>

<style lang="scss">
.empty-page {
  text-align: center;
  padding: 50px;
  max-width: 600px;
  margin: 0 auto;

  h2 {
    font-size: $h2-size;
    margin-bottom: 20px;
    @include gradient-heading($h2-size);
  }

  p {
    font-size: 1.2em;
    margin-bottom: 30px;
  }

  &__label {
    position: relative;
    display: inline-block;
    width: 100%;
    text-align: center;
    z-index: 1;
    font-size: 1rem;
  }

  &__link {
    color: $yellow;
    padding: 0.5rem 2rem;
    background-image: url("/images/body.webp");
    background-color: $red;
    background-blend-mode: luminosity;
    border: solid 2px #2d0000;
    font-size: $small;
    transition: all 0.3s ease;
    text-decoration: none;
    position: relative;
    display: block;
    overflow: hidden;
    @include border-radius(0.5rem, true);

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #ff0400;
      background: radial-gradient(rgba(182, 3, 0, 0.7), rgba(0, 0, 0, 0));
      opacity: 0;
      z-index: 0;
      transition: all 0.3s ease;
    }
    &:hover {
      &::after {
        opacity: 1;
      }
    }
  }
}
</style>
