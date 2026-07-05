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

onMounted(() => {
  if (window.$WowheadPower) {
    window.$WowheadPower.refreshLinks();
  }
});
</script>

<template>
  <div class="guide">
    <div class="guide-heading">
      <h2 class="guide-heading__h2">
        <a href="#" :data-wowhead="`item=${mountInfos.itemId}`">
          <img
            :src="`https://wow.zamimg.com/images/wow/icons/large/${mountInfos.icon?.toLowerCase()}.jpg`"
            class="mount-item__icon"
          />
          {{ mountInfos.name }}
        </a>
      </h2>
    </div>
    <div class="guide-desc">
      <div class="guide-desc--left">
        <p class="mount-quote" v-if="mountData?.description">
          <q>{{ mountData?.description }}</q>
        </p>

        <div class="guide__content" v-if="page">
          <slot name="desc"></slot>
        </div>

        <div class="guide__content" v-else>
          <h2 class="guide__h2">Guide Not Found</h2>
          <p>
            Oops! The content you're looking for doesn't exist (yet). Feel free
            to
            <a
              href="https://github.com/TardiGab/reins/tree/main/content"
              class="guide__link"
              target="_blank"
            >
              contribute
            </a>
            and create a guide for this mount!
          </p>
        </div>
        <div class="mount-faction">
          <h2 class="mount-faction__h2" id="faction">
            <a href="#faction">Faction</a>
          </h2>
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
          <div class="display-wrapper__links">
            <a
              :href="`https://wowhead.com/ptr-2/mount/${mountInfos.ID}`"
              class="button-gray"
              target="_blank"
              rel="np"
            >
              <span class="button-label">More on Wowhead</span>
            </a>

            <a
              :href="`https://wowhead.com/ptr-2/mount/${mountInfos.ID}#modelviewer`"
              class="button-gray"
              target="_blank"
              rel="np"
            >
              <span class="button-label">View 3D model on Wowhead</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="guide__content">
      <slot name="guide"></slot>
    </div>
  </div>
</template>
