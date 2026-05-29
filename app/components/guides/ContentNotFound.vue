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
  code?: number;
  detail?: string;
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

console.log(mountData.value);

if (mountData.value?.code === 404) {
  throw createError({
    status: 404,
    statusText: "Mount not found",
    data: {
      link: `https://www.wowhead.com/ptr-2/search?q=${mountInfos.name}&s=mounts`,
      mountName: mountInfos.name,
      message: `was not found on Blizzard's API. This mount might be very new or not released yet. Please check back later.`,
    },
  });
}

const { data: creatureDisplay } = await useFetch(
  "/api/creature-display-media",
  {
    query: {
      creatureDisplayId: mountData.value?.creature_displays[0].id,
    },
  },
);
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
        <div class="guide__content">
          <h2 class="guide__h2">Guide Not Found</h2>
          <p class="guide__p">
            Oops! The content you're looking for doesn't exist (yet). Feel free
            to <a href="" class="guide__link">contribute</a> and create a guide
            for this mount!
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
              class="display-wrapper__wh-link"
              target="_blank"
            >
              More on Wowhead
            </a>
            <a
              :href="`https://wowhead.com/ptr-2/mount/${mountInfos.ID}#modelviewer`"
              class="display-wrapper__wh-link"
              target="_blank"
            >
              View 3D model on Wowhead
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.guide {
  max-width: 1440px;
  margin: auto;
  @media screen and (max-width: 1530px) {
    max-width: 80vw;
    margin: auto;
  }
  @media screen and (max-width: 780px) {
    max-width: 90vw;
  }
  &-heading {
    &__h2 {
      font-size: $h1-size;
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
    gap: 5rem;
    @media screen and (max-width: 1200px) {
      gap: 5vw;
    }
    @media screen and (max-width: 780px) {
      flex-direction: column;
      gap: 2rem;
    }
    &--left,
    &--right {
      flex: 1;
    }
    &--right {
      max-width: 480px;
      @media screen and (max-width: 780px) {
        max-width: 100%;
      }
    }
  }
  &__content {
    max-width: 960px;
    h2 {
      font-size: $h2-size;
      margin: 0;
      margin-top: 2rem;
      margin-bottom: 1rem;
      text-shadow: 1px 1px black;
      font-weight: 600;
      color: white;
      a {
        font-size: $h2-size;
        margin: 0;
        margin-top: 2rem;
        margin-bottom: 1rem;
        text-shadow: 1px 1px black;
        font-weight: 600;
        color: white;
        transition: all 0.3s ease;
        position: relative;
        &::before {
          content: "#";
          opacity: 0;
          color: $yellow;
          position: absolute;
          left: -1em;
          transition: opacity 0.3s ease;
        }
        &:hover::before {
          opacity: 1;
        }
      }
    }
    h3 {
      font-size: $h3-size;
      margin: 0;
      margin-top: 2rem;
      margin-bottom: 1rem;
      text-shadow: 1px 1px black;
      font-weight: 600;
      color: white;
      a {
        font-size: $h3-size;
        margin: 0;
        margin-top: 2rem;
        margin-bottom: 1rem;
        text-shadow: 1px 1px black;
        font-weight: 600;
        color: white;
        transition: all 0.3s ease;
        position: relative;
        &::before {
          content: "#";
          opacity: 0;
          color: $yellow;
          position: absolute;
          left: -1em;
          transition: opacity 0.3s ease;
        }
        &:hover::before {
          opacity: 1;
        }
      }
    }
    p {
      font-size: $main-size;
      line-height: 140%;
      color: white;
      text-shadow: 1px 1px black;
      a {
        color: $yellow;
      }
    }
    ul,
    ol {
      margin: 0;
      padding: 0;
      li {
        margin-bottom: 1rem;
        font-size: $main-size;
        line-height: 140%;
        a {
          color: $yellow;
        }
      }
    }
  }
}

.mount-quote {
  font-size: $main-size;
  margin: 0;
  margin-bottom: 2rem;
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
  &__h2 {
    a {
      font-size: $h2-size;
      margin: 0;
      margin-top: 2rem;
      margin-bottom: 1rem;
      text-shadow: 1px 1px black;
      font-weight: 600;
      color: white;
      transition: all 0.3s ease;
      position: relative;
      &::before {
        content: "#";
        opacity: 0;
        color: $yellow;
        position: absolute;
        left: -1em;
        transition: opacity 0.3s ease;
      }
      &:hover::before {
        opacity: 1;
      }
    }
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
  &__links {
    display: flex;
    gap: 1.5rem;
    width: 100%;
  }
  &__wh-link,
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 1px 1px black;
    font-size: $small;
    font-weight: 500;
    padding: 0.5rem 1rem;
    background-color: $dark-gray;
    outline: 2px solid $border-container;
    @include border-radius(0.5rem, true);
    width: 100%;
    transition: background-color 0.3s ease;
    text-align: center;
    &:hover {
      background-color: $light-gray;
    }
  }
  a {
    color: white !important;
  }
  &__img {
    @include border-radius(1rem, true);
    @include container-border();
    width: 100%;
  }
}
</style>
