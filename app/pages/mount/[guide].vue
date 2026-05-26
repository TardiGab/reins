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

interface MountInfo {
  id: number;
  name: string;
  creature_displays: [
    {
      key: { href: string };
      id: number;
    },
  ];
  description: string;
  source: {
    type: string;
    name: string;
  };
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

const { data: mountData } = await useFetch<MountInfo>("/api/mount-info", {
  query: {
    mountId: mountInfos.ID,
  },
});

const { data: creatureDisplay } = await useFetch(
  "/api/creature-display-media",
  {
    query: {
      creatureDisplayId: mountData.value?.creature_displays[0].id,
    },
  },
);

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(route.path).first();
});

console.log(page.value);

useHead({
  title: `Reins | ${mountInfos.name}`,
  meta: [
    {
      name: "description",
      content: `Guide to obtain the ${mountInfos.name} mount in World of Warcraft.`,
    },
  ],
});
</script>

<template>
  <div class="guide">
    <div class="guide-heading">
      <h2 class="guide-heading__h2">
        <a
          :href="`https://wowhead.com/ptr-2/mount/${mountInfos.ID}`"
          target="_blank"
        >
          <img
            :src="`https://wow.zamimg.com/images/wow/icons/large/${mountInfos.icon}.jpg`"
            class="mount-item__icon"
          />
          {{ mountInfos.name }}
        </a>
      </h2>
    </div>
    <div class="guide-desc">
      <div class="guide-desc--left">
        <p class="mount-quote">
          <q>{{ mountData?.description }}</q>
        </p>
        <ContentRenderer v-if="page" :value="page" class="guide__content" />
        <div class="mount-faction">
          <h3 class="mount-faction__h3">Faction</h3>
          <span
            v-if="mountInfos.side === 'A'"
            class="mount-faction__span mount-faction__span--alliance"
          >
            Alliance
          </span>
          <span
            v-else-if="mountInfos.side === 'H'"
            class="mount-faction__span mount-faction__span--horde"
          >
            Horde
          </span>
          <span v-else class="mount-faction__span mount-faction__span--both">
            Both
          </span>
        </div>
      </div>
      <div class="guide-desc--right">
        <div class="display-wrapper">
          <img
            :src="creatureDisplay"
            :alt="`Creature display of ${mountInfos.name}`"
            class="display-wrapper__img"
          />
          <a
            :href="`https://wowhead.com/ptr-2/mount/${mountInfos.ID}`"
            class="display-wrapper__wh-link"
          >
            More on Wowhead
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.guide {
  max-width: 1440px;
  margin: auto;
  &-heading {
    &__h2 {
      font-size: $h2-size;
      padding-bottom: 2rem;
      margin-bottom: 4rem;
      border-bottom: 2px solid $border-container;
      text-shadow: 1px 1px black;
      a {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }
  }
  &-desc {
    display: flex;
    flex-direction: row;
    gap: 20vw;
    @media screen and (max-width: 1200px) {
      gap: 5vw;
    }
    @media screen and (max-width: 780px) {
      flex-direction: column;
      gap: 2rem;
    }
  }
  &__content {
    h2 {
      a {
        font-size: $h2-size;
        margin: 0;
        margin-top: 2rem;
        margin-bottom: 1rem;
        text-shadow: 1px 1px black;
        font-weight: 400;
        color: white;
      }
    }
  }
}

.mount-quote {
  font-size: $main-size;
  margin: 0;
  q {
    font-family: "Sentient Variable";
    font-style: italic;
    font-weight: 300;
    line-height: 140%;
    color: $yellow;
    text-shadow: 1px 1px black;
  }
}

.mount-faction {
  &__h3 {
    font-size: $h3-size;
    margin: 0;
    margin-top: 2rem;
    margin-bottom: 1rem;
    text-shadow: 1px 1px black;
    font-weight: 400;
  }
  &__span {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: $main-size;
    border-radius: 0.5rem;
    color: white;
    text-shadow: 1px 1px black;
    &--alliance {
      &::before {
        content: "";
        display: inline-block;
        width: 2em;
        height: 2em;
        background-image: url("/images/factions/alliance.webp");
        background-size: cover;
        background-position: center;
      }
    }
    &--horde {
      &::before {
        content: "";
        display: inline-block;
        width: 2em;
        height: 2em;
        background-image: url("/images/factions/horde.webp");
        background-size: cover;
        background-position: center;
      }
    }
    &--both {
      &::before {
        content: "";
        display: inline-block;
        width: 2em;
        height: 2em;
        background-image: url("/images/factions/both.webp");
        background-size: cover;
        background-position: center;
      }
    }
  }
}

.display-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 1rem;
  &__wh-link {
    color: white;
    text-shadow: 1px 1px black;
    font-size: $main-size;
    font-weight: 500;
    @media screen and (max-width: 780px) {
      align-self: center;
    }
  }
  &__img {
    @include border-radius(1rem, true);
    @include container-border();
    width: 542px;
    @media screen and (max-width: 960px) {
      width: 100%;
    }
    @media screen and (max-width: 780px) {
      width: 50%;
      margin: 0 auto;
    }
    @media screen and (max-width: 480px) {
      width: 100%;
    }
  }
}
</style>
