<script setup lang="ts">
import { useRoute } from "#app";
import { authClient } from "~~/server/lib/auth-client";

const route = useRoute();
const session = authClient.useSession();

const comparedCharacterName = ref<string>();
const comparedCharacterChoosed = (character: string) => {
  comparedCharacterName.value = character;
};

const { data: comparedMountsLink, execute: comparedGo } = await useLazyFetch(
  "/api/character-mounts",
  {
    query: {
      region: route.query.cregion,
      realm: route.query.crealm,
      character: route.query.ccharacter,
    },
    immediate: false,
  },
);

const {
  data: comparedCharRender,
  execute: comparedRenderGo,
  clear: comparedClear,
} = await useLazyFetch("/api/character-render", {
  query: {
    region: route.query.cregion,
    realm: route.query.crealm,
    character: route.query.ccharacter,
  },
  immediate: false,
});

const comparedMounts = ref();

let comparedMountsChoosed;

if (!comparedMounts.value && route.query.ccharacter) {
  await comparedGo();
  await comparedRenderGo();
  comparedMounts.value = comparedMountsLink.value;
} else if (
  !comparedMounts.value &&
  !route.query.cregion &&
  !route.query.crealm &&
  !route.query.ccharacter
) {
  comparedMountsChoosed = (character: any[]) => {
    comparedMounts.value = character;
  };
}

const comparedRealm = ref<string>();
const comparedRealmChoosed = (realm: string) => {
  comparedRealm.value = realm;
};

const comparedRegion = ref<string>();
const comparedRegionChoosed = (region: string) => {
  comparedRegion.value = region;
};

const comparedAvatar = ref<string>();
const comparedAvatarChoosed = (avatar: string) => {
  comparedAvatar.value = avatar;
};

const {
  data: characterMounts,
  execute: charGo,
  status: loading,
  clear: charClear,
} = await useLazyFetch("/api/character-mounts/", {
  query: {
    region: route.query.region,
    realm: route.query.realm,
    character: route.query.character,
  },
});

const { data: characterRender, execute: renderGo } = await useLazyFetch(
  "/api/character-render",
  {
    query: {
      region: route.query.region,
      realm: route.query.realm,
      character: route.query.character,
    },
    immediate: false,
  },
);

const firstAvatar = ref<string>();

onMounted(async () => {
  await charGo();
  await renderGo();
  firstAvatar.value = await characterRender.value[0].value;
  if (comparedCharRender.value) {
    comparedAvatar.value = await comparedCharRender.value[0].value;
  }
});

const showLeft = ref(true);
const showRight = ref();

watch(
  () => comparedCharacterName.value,
  () => {
    if (
      comparedRegion.value &&
      comparedRealm.value &&
      comparedCharacterName.value
    ) {
      let url = new URL(window?.location.href);
      url.searchParams.set("cregion", comparedRegion.value!);
      url.searchParams.set("crealm", comparedRealm.value!);
      url.searchParams.set("ccharacter", comparedCharacterName.value!);
      history.pushState({}, "", url.href);
      showRight.value = true;
    }
  },
);

watch(
  () => showRight.value,
  () => {
    console.log(showRight.value);

    if (showRight.value === false) {
      comparedClear();
      let url = new URL(window?.location.href);
      url.searchParams.delete("cregion", comparedRegion.value!);
      url.searchParams.delete("crealm", comparedRealm.value!);
      url.searchParams.delete("ccharacter", comparedCharacterName.value!);
      history.pushState({}, "", url.href);
    }
  },
);
</script>

<template>
  <Header />
  <div class="comparison">
    <div class="comparison__left">
      <div
        class="comparison__header"
        v-if="
          (route.query.region && route.query.realm && route.query.character) ||
          showLeft
        "
      >
        <div class="comparison__character">
          <img
            :src="firstAvatar"
            alt="Character's profile"
            class="comparison__profile"
          />
          <span class="comparison__name">
            {{ route.query.character }}'s mount collection
          </span>
        </div>
        <button class="comparison__clear" @click="showLeft = !showLeft">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#FFD100"
              d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"
            />
          </svg>
        </button>
      </div>
      <CompareMountList
        :character-mounts="characterMounts"
        v-if="characterMounts"
      />
    </div>
    <div class="comparison__right">
      <div class="comparison__header" v-if="showRight">
        <div class="comparison__character">
          <img
            :src="comparedAvatar"
            alt="Character profile"
            class="comparison__profile"
          />
          <span class="comparison__name">
            {{ route.query.ccharacter || comparedCharacterName }}'s mount
            collection
          </span>
        </div>
        <button class="comparison__clear" @click="showRight = !showRight">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#FFD100"
              d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"
            />
          </svg>
        </button>
      </div>

      <div
        class="comparison__search"
        v-else-if="
          !showRight &&
          !route.query.cregion &&
          !route.query.crealm &&
          !route.query.ccharacter
        "
      >
        <h2 class="search-h2">Add a character</h2>
        <CompareSearchCharacter
          @compared-mounts="comparedMountsChoosed"
          @character="comparedCharacterChoosed"
          @realm="comparedRealmChoosed"
          @region="comparedRegionChoosed"
          @avatar="comparedAvatarChoosed"
        />
      </div>
      <CompareMountList
        :character-mounts="comparedMounts"
        v-if="
          comparedMounts &&
          showRight &&
          !route.query.cregion &&
          !route.query.crealm &&
          !route.query.ccharacter
        "
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-mounts {
  width: 100% !important;
  height: 80vh !important;
}

.comparison {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  &__left,
  &__right {
    width: 100%;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 2rem);
    margin-bottom: 1rem;
    padding: 0 1rem;
  }
  &__character {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  &__profile {
    border: solid 2px $border-container;
    border-radius: 0.5rem;
    height: 3rem;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    @supports (corner-shape: bevel) {
      corner-shape: bevel;
      border-radius: $corner-shape-s;
    }
  }
  &__name {
    font-family: $main-size;
  }
  &__search {
    padding: 2rem;
    border-radius: 1rem;
    border: 2px solid $border-container;
    background-image: url("/images/wooden-background-2.webp");
    box-shadow: 0 0 40px 0 #000 inset;
    background-repeat: repeat;
    background-attachment: local;
    height: calc(80vh - 4rem);
    @supports (corner-shape: bevel) {
      corner-shape: bevel;
      border-radius: $corner-shape-s;
    }
  }
  &__clear {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      filter: brightness(75%);
    }
  }
}
.search-h2 {
  font-size: $h2-size;
  background: linear-gradient(180deg, #ffd100 0%, #dfaa03 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin: 0;
  margin-bottom: 2rem;
}
</style>
