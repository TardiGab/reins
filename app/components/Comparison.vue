<script lang="ts" setup>
import { useRoute } from "#app";

const route = useRoute();

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

const baseAvatar = ref<string>();
const baseAvatarChoosed = (avatar: string) => {
  baseAvatar.value = avatar;
};

const comparedAvatar = ref<string>();
const comparedAvatarChoosed = (avatar: string) => {
  comparedAvatar.value = avatar;
};

const baseOpenAccordionDiff = ref<number>();
const baseOpenAccordionDiffValue = (value: number) => {
  baseOpenAccordionDiff.value = value;
};

const baseClosedAccordionDiff = ref<number[]>();
const baseClosedAccordionDiffValue = (value: number[]) => {
  baseClosedAccordionDiff.value = value;
};

const comparedOpenAccordionDiff = ref<number>();
const comparedOpenAccordionDiffValue = (value: number) => {
  comparedOpenAccordionDiff.value = value;
};

const compareClosedAccordionDiff = ref<number[]>();
const comparedAccordionDiffValue = (value: number[]) => {
  compareClosedAccordionDiff.value = value;
};

const baseProfile = ref();
const baseProfileChoosed = (value: any) => {
  baseProfile.value = value;
};
const comparedProfile = ref();
const comparedProfileChoosed = (value: any) => {
  comparedProfile.value = value;
};

const baseTotalOwned = ref();
const baseTotalOwnedChoosed = (total: number) => {
  baseTotalOwned.value = total;
};
const baseUseable = ref();
const baseUseableChoosed = (useable: number) => {
  baseUseable.value = useable;
};
const comparedTotalOwned = ref();
const comparedTotalOwnedChoosed = (total: number) => {
  comparedTotalOwned.value = total;
};
const comparedUseable = ref();
const comparedUseableChoosed = (useable: number) => {
  comparedUseable.value = useable;
};

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
  clear: baseClear,
} = await useLazyFetch("/api/character-mounts/", {
  query: {
    region: route.query.region,
    realm: route.query.realm,
    character: route.query.character,
  },
});

const { data: baseCharRender, execute: baseRenderGo } = await useLazyFetch(
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

const { data: baseProfileLink, execute: baseProfileGo } = await useLazyFetch(
  "/api/character-profile/",
  {
    query: {
      region: route.query.region,
      realm: route.query.realm,
      character: route.query.character,
    },
    immediate: false,
  },
);
const { data: comparedProfileLink, execute: comparedProfileGo } =
  await useLazyFetch("/api/character-profile/", {
    query: {
      region: route.query.cregion,
      realm: route.query.crealm,
      character: route.query.ccharacter,
    },
    immediate: false,
  });

let baseMountsChoosed = (character: any[]) => {
  characterMounts.value = character;
};

const comparedMounts = ref();
let comparedMountsChoosed;

comparedMountsChoosed = (character: any[]) => {
  comparedMounts.value = character;
};

if (!comparedMounts.value && route.query.ccharacter) {
  await comparedGo();
  await comparedRenderGo();
  comparedMounts.value = comparedMountsLink.value;
}

if (
  !comparedMounts.value &&
  !route.query.cregion &&
  !route.query.crealm &&
  !route.query.ccharacter
) {
  comparedMountsChoosed = (character: any[]) => {
    comparedMounts.value = character;
  };
}

let baseUseableMounts: string[] = [];
let comparedUseableMounts: string[] = [];

const showLeft = ref(true);
const showRight = ref(true);
onMounted(async () => {
  await baseGo();
  await baseRenderGo();
  await baseProfileGo();

  baseAvatar.value = await baseCharRender.value[0].value;
  if (comparedCharRender.value) {
    comparedAvatar.value = await comparedCharRender.value[0].value;
  } else if (baseCharRender.value) {
    baseAvatar.value = await baseCharRender.value[0].value;
  }
  if (!route.query.cregion && !route.query.crealm && !route.query.ccharacter) {
    showRight.value = false;
  }
  if (route.query.cregion && route.query.crealm && route.query.ccharacter) {
    await comparedProfileGo();
  }
  if (characterMounts.value) {
    characterMounts.value.forEach((item: any) => {
      if (item.is_useable) {
        baseUseableMounts.push(item.mount.name);
      }
    });
  }
  if (comparedMountsLink.value) {
    comparedMountsLink.value.forEach((item: any) => {
      if (item.is_useable) {
        comparedUseableMounts.push(item.mount.name);
      }
    });
  }
});

// Modification du lien quand on fait une recherche

watch(
  () => comparedCharacterName.value,
  () => {
    if (
      comparedRegion.value &&
      comparedRealm.value &&
      comparedCharacterName.value
    ) {
      navigateTo({
        path: `/compare-result`,
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
      comparedProfileGo();
      showRight.value = true;
    }
  },
);
watch(
  () => baseCharacterName.value,
  async () => {
    if (
      baseRegion.value &&
      baseRealm.value &&
      baseCharacterName.value &&
      route.query.cregion &&
      route.query.crealm &&
      route.query.ccharacter
    ) {
      navigateTo({
        path: `/compare-result`,
        query: {
          region: baseRegion.value,
          realm: baseRealm.value,
          character: baseCharacterName.value,
          cregion: route.query.cregion,
          crealm: route.query.crealm,
          ccharacter: route.query.ccharacter,
        },
      });
      baseGo();
      baseProfileGo();
      showLeft.value = true;
    }
  },
);

watch(
  () => showRight.value,
  () => {
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

// Fetch quand on arrive sur la page via le lien

watch(
  () => route.fullPath,
  () => {
    if (route.query.region && route.query.realm && route.query.character) {
      baseGo();
      baseRenderGo();
      baseProfileGo();
    } else if (
      route.query.cregion &&
      route.query.crealm &&
      route.query.ccharacter
    ) {
      comparedGo();
      comparedRenderGo();
      comparedProfileGo();
    }
  },
);

// Diff

const baseDiffArray = ref<number[]>([]);
const comparedDiffArray = ref<number[]>([]);
const baseDiff = ref<number>();
const comparedDiff = ref<number>();

watch(
  () => baseClosedAccordionDiff.value && compareClosedAccordionDiff.value,
  () => {
    if (!baseDiffArray.value.length || !comparedDiffArray.value.length) {
      comparedDiffArray.value.length = 0;
      baseDiffArray.value.length = 0;
      for (let i = 0; i < baseClosedAccordionDiff.value?.length!; i++) {
        comparedDiff.value = compareClosedAccordionDiff.value?.[i]!;
        comparedDiffArray.value.push(comparedDiff.value);
        baseDiff.value = baseClosedAccordionDiff.value?.[i]!;
        baseDiffArray.value.push(baseDiff.value);
      }
    } else if (baseDiffArray.value.length || comparedDiffArray.value.length) {
      comparedDiffArray.value.length = 0;
      baseDiffArray.value.length = 0;
      for (let i = 0; i < baseClosedAccordionDiff.value?.length!; i++) {
        comparedDiff.value = compareClosedAccordionDiff.value?.[i]!;
        comparedDiffArray.value.push(comparedDiff.value);
        baseDiff.value = baseClosedAccordionDiff.value?.[i]!;
        baseDiffArray.value.push(baseDiff.value);
      }
    }
  },
);

watch(
  () => route.fullPath,
  () => {
    if (!baseDiffArray.value.length || !comparedDiffArray.value.length) {
      for (let i = 0; i < baseClosedAccordionDiff.value?.length!; i++) {
        comparedDiff.value = compareClosedAccordionDiff.value?.[i]!;
        comparedDiffArray.value.push(comparedDiff.value);
        baseDiff.value = baseClosedAccordionDiff.value?.[i]!;
        baseDiffArray.value.push(baseDiff.value);
      }
    } else if (baseDiffArray.value.length || comparedDiffArray.value.length) {
      comparedDiffArray.value.length = 0;
      baseDiffArray.value.length = 0;
      for (let i = 0; i < baseClosedAccordionDiff.value?.length!; i++) {
        comparedDiff.value = compareClosedAccordionDiff.value?.[i]!;
        comparedDiffArray.value.push(comparedDiff.value);
        baseDiff.value = baseClosedAccordionDiff.value?.[i]!;
        baseDiffArray.value.push(baseDiff.value);
      }
    }
  },
);

const showLeftTooltip = ref(false);
const showRightTooltip = ref(false);
</script>

<template>
  <div class="comparison">
    <div class="comparison__left">
      <div class="comparison__header" v-if="showLeft">
        <div
          class="comparison__character"
          @mouseover="showLeftTooltip = true"
          @mouseleave="showLeftTooltip = false"
        >
          <img
            :src="
              baseAvatar ||
              'https://render.worldofwarcraft.com/shadow/avatar/3-0.jpg'
            "
            alt="Character's profile"
            class="comparison__profile"
          />
          <span class="comparison__name">
            {{ route.query.character || baseCharacterName }}'s mount collection
          </span>
          <Transition>
            <Tooltip
              v-if="showLeftTooltip && typeof route.query.region === 'string'"
              class="comparison__tooltip"
              :useable-number="baseUseable || baseUseableMounts.length"
              :total-owned-number="baseTotalOwned || characterMounts.length"
              :region="route.query.region || baseRegion?.toLocaleUpperCase()"
              :profile="baseProfile || baseProfileLink"
            />
          </Transition>
        </div>
        <ChangeCharacterButton
          class="comparison__clear"
          @click="showLeft = !showLeft"
          :label="'Change character'"
        />
      </div>
      <div class="comparison__search" v-else-if="!showLeft">
        <h2 class="search-h2">Add a character</h2>
        <CompareSearchCharacter
          @character="baseCharacterChoosed"
          @realm="baseRealmChoosed"
          @region="baseRegionChoosed"
          @compared-mounts="baseMountsChoosed"
          @avatar="baseAvatarChoosed"
          @profile="baseProfileChoosed"
          @total-owned="baseTotalOwnedChoosed"
          @useable-number="baseUseableChoosed"
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
        <div
          class="comparison__character"
          @mouseover="showRightTooltip = true"
          @mouseleave="showRightTooltip = false"
        >
          <img
            :src="
              comparedAvatar ||
              'https://render.worldofwarcraft.com/shadow/avatar/3-0.jpg'
            "
            alt="Character profile"
            class="comparison__profile"
          />
          <span class="comparison__name">
            {{ route.query.ccharacter || comparedCharacterName }}'s mount
            collection
          </span>
          <Transition>
            <Tooltip
              v-if="showRightTooltip && typeof route.query.cregion === 'string'"
              class="comparison__tooltip"
              :region="
                route.query.cregion || comparedRegion?.toLocaleUpperCase()
              "
              :profile="comparedProfile || comparedProfileLink"
              :total-owned-number="
                comparedTotalOwned ||
                comparedMountsLink.length ||
                comparedMounts.length
              "
              :useable-number="comparedUseable || comparedUseableMounts.length"
            />
          </Transition>
        </div>
        <ChangeCharacterButton
          class="comparison__clear"
          :label="'Change character'"
          @click="showRight = !showRight"
        />
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
          @profile="comparedProfileChoosed"
          @total-owned="comparedTotalOwnedChoosed"
          @useable-number="comparedUseableChoosed"
        />
      </div>
      <CompareMountList
        :open-base-diff="baseOpenAccordionDiff"
        :open-compared-diff="comparedOpenAccordionDiff"
        :base-diff="baseDiffArray"
        :compared-diff="comparedDiffArray"
        :character-mounts="comparedMounts"
        @unlocked-amount-o="comparedOpenAccordionDiffValue"
        @unlocked-amount="comparedAccordionDiffValue"
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

<style lang="scss" scoped>
.user-mounts {
  width: 100% !important;
  height: 80vh !important;
}

.comparison {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  @media screen and (max-width: 900px) {
    max-width: 100vw;
    overflow-x: scroll;
    max-height: 85dvh;
  }
  &__left,
  &__right {
    display: flex;
    flex-direction: column;
    width: 100%;
    @media screen and (max-width: 900px) {
      min-width: 320px;
      height: 85dvh;
    }
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 2rem);
    margin-bottom: 1rem;
    padding: 0 1rem;
    @media screen and (max-width: 780px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      padding: 0 0.25rem;
      width: calc(100% - 0.5rem);
    }
  }
  &__character {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
    cursor: help;
  }
  &__tooltip {
    position: absolute;
    top: 110%;
    left: 0;
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
    @media screen and (max-width: 780px) {
      padding: 1rem;
      height: 100%;
    }
  }
  &__clear {
    @media screen and (max-width: 780px) {
      width: 100%;
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
