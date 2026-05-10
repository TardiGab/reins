<script setup lang="ts">
import { useRoute } from "#app";
import { authClient } from "~~/server/lib/auth-client";

const route = useRoute();
const router = useRouter();
const session = authClient.useSession();

const props = defineProps(["openBaseDiff", "openComparedDiff"]);

const {
  data: comparedMountsLink,
  execute: comparedGo,
  clear: comparedClear,
} = await useLazyFetch("/api/character-mounts", {
  query: {
    region: route.query.cregion,
    realm: route.query.crealm,
    character: route.query.ccharacter,
  },
  immediate: false,
});

const { data: comparedCharRender, execute: comparedRenderGo } =
  await useLazyFetch("/api/character-render", {
    query: {
      region: route.query.cregion,
      realm: route.query.crealm,
      character: route.query.ccharacter,
    },
    immediate: false,
  });

const {
  data: characterMounts,
  execute: baseGo,
  status: loading,
  clear: baseClear,
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

const comparedMounts = ref();

let baseMountsChoosed = (character: any[]) => {
  characterMounts.value = character;
};

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

const baseRealm = ref<string>();
const baseRealmChoosed = (realm: string) => {
  baseRealm.value = realm;
};

const comparedRealm = ref<string>();
const comparedRealmChoosed = (realm: string) => {
  comparedRealm.value = realm;
};

const baseRegion = ref<string>();
const baseRegionChoosed = (region: string) => {
  baseRegion.value = region;
};

const comparedRegion = ref<string>();
const comparedRegionChoosed = (region: string) => {
  comparedRegion.value = region;
};

const baseCharacterName = ref<string>();
const baseCharacterChoosed = (character: string) => {
  baseCharacterName.value = character;
};

const comparedCharacterName = ref<string>();
const comparedCharacterChoosed = (character: string) => {
  comparedCharacterName.value = character;
};

// const baseAvatar = ref<string>();
// const baseAvatarChoosed = (avatar: string) => {
//   baseAvatar.value = avatar;
// };

const comparedAvatar = ref<string>();
const comparedAvatarChoosed = (avatar: string) => {
  comparedAvatar.value = avatar;
};

const baseOpenAccordionDiff = ref<number>();
const baseOpenAccordionDiffValue = (value: number) => {
  baseOpenAccordionDiff.value = value;
};

const baseClosedAccordionDiff = ref<number>();
const baseClosedAccordionDiffValue = (value: number) => {
  baseClosedAccordionDiff.value = value;
};

const comparedOpenAccordionDiff = ref<number>();
const comparedOpenAccordionDiffValue = (value: number) => {
  comparedOpenAccordionDiff.value = value;
};

const firstAvatar = ref<string>();
const showLeft = ref(true);
const showRight = ref(true);
onMounted(async () => {
  await baseGo();
  await renderGo();
  firstAvatar.value = await characterRender.value[0].value;
  if (comparedCharRender.value) {
    comparedAvatar.value = await comparedCharRender.value[0].value;
  }
  if (!route.query.cregion && !route.query.crealm && !route.query.ccharacter) {
    showRight.value = false;
  }
  console.log("Base Open:", baseOpenAccordionDiff.value);
  console.log("Compared Open:", comparedOpenAccordionDiff.value);
  console.log(
    "Diff:",
    comparedOpenAccordionDiff.value! - baseOpenAccordionDiff.value!,
  );

  // console.log("Base closed:", baseClosedAccordionDiff.value);
});

watch(
  () => comparedCharacterName.value,
  () => {
    if (
      comparedRegion.value &&
      comparedRealm.value &&
      comparedCharacterName.value
    ) {
      router.push({
        path: `${route.fullPath}`,
        query: {
          region: route.query.region,
          realm: route.query.realm,
          character: route.query.character,
          cregion: comparedRegion.value,
          crealm: comparedRealm.value,
          ccharacter: comparedCharacterName.value,
        },
      });
      comparedGo();
      showRight.value = true;
    }
  },
);
watch(
  () => baseCharacterName.value,
  () => {
    if (baseRegion.value && baseRealm.value && baseCharacterName.value) {
      router.push({
        path: `${route.fullPath}`,
        query: {
          region: baseRegion.value,
          realm: baseRealm.value,
          character: baseCharacterName.value,
          cregion: route.query.cregion,
          crealm: route.query.crealm,
          ccharacter: route.query.ccharacter,
        },
      });
      // let url = new URL(window?.location.href);
      // url.searchParams.set("region", baseRegion.value!);
      // url.searchParams.set("realm", baseRealm.value!);
      // url.searchParams.set("character", baseCharacterName.value!);
      // history.pushState({}, "", url.href);
      baseGo();
      showLeft.value = true;
    }
  },
);

watch(
  () => showRight.value,
  () => {
    console.log("Right:", showRight.value);

    if (showRight.value === false) {
      let url = new URL(window?.location.href);
      url.searchParams.delete("cregion");
      url.searchParams.delete("crealm");
      url.searchParams.delete("ccharacter");
      history.pushState({}, "", url.href);
      comparedClear();
    }
  },
);

watch(
  () => showLeft.value,
  () => {
    console.log("Left:", showLeft.value);

    if (showLeft.value === false) {
      let url = new URL(window?.location.href);
      url.searchParams.delete("region");
      url.searchParams.delete("realm");
      url.searchParams.delete("character");
      history.pushState({}, "", url.href);
      baseClear();
    }
  },
);

watch(
  () => route.fullPath,
  async () => {
    if (route.query.region && route.query.realm && route.query.character) {
      baseGo();
      renderGo();
    } else if (
      route.query.cregion &&
      route.query.crealm &&
      route.query.ccharacter
    ) {
      await comparedGo();
      await comparedRenderGo();
    }
  },
);
</script>

<template>
  <Header />
  <div class="comparison">
    <div class="comparison__left">
      <div class="comparison__header" v-if="showLeft">
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
      <div class="comparison__search" v-else-if="!showLeft">
        <h2 class="search-h2">Add a character</h2>
        <CompareSearchCharacter
          @character="baseCharacterChoosed"
          @realm="baseRealmChoosed"
          @region="baseRegionChoosed"
          @compared-mounts="baseMountsChoosed"
        />
      </div>
      <CompareMountList
        :character-mounts="characterMounts"
        v-if="characterMounts && showLeft"
        @unlocked-amount-o="baseOpenAccordionDiffValue"
        @unlocked-amount="baseClosedAccordionDiffValue"
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
          !showRight ||
          (!route.query.cregion &&
            !route.query.crealm &&
            !route.query.ccharacter)
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
        :base-diff="baseOpenAccordionDiff"
        :compared-diff="comparedOpenAccordionDiff"
        @unlocked-amount-o="comparedOpenAccordionDiffValue"
        v-if="
          comparedMounts &&
          showRight &&
          route.query.cregion &&
          route.query.crealm &&
          route.query.ccharacter
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
