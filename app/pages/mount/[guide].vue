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
      if (mount.ID === Number(route.params.guide)) {
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

useHead({
  title: `Reins | ${mountInfos.name}`,
  script: [
    {
      innerHTML: `const whTooltips = {colorLinks: true, iconizeLinks: true, iconSize: false, renameLinks: false};`,
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

.display-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  &__wh-link {
    color: white;
  }
  &__img {
    @include border-radius(1rem, true);
    @include container-border();
    width: 542px;
    @media screen and (max-width: 780px) {
      width: 100%;
    }
  }
}
</style>
