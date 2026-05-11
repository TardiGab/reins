<script lang="ts" setup>
import mountsGlobal from "@/assets/data/mounts.json";
import { useRoute } from "#app";
import { authClient } from "~~/server/lib/auth-client";

const route = useRoute();
const router = useRouter();
const session = authClient.useSession();

const props = defineProps<{
  mountsOwnedByP1?: any;
  mountsOwnedByP2?: any;
  openBaseDiff: any;
  openComparedDiff: any;
}>();

interface Mount {
  mount: {
    key: { href: string };
    name: string;
    id: number;
  };
}

interface SubCategoryOwnedMounts {
  subcatName: string;
  amount: number;
  unlockedAmount: number;
}

interface CategoryOwnedMounts {
  categoryName: string;
  subCategories: SubCategoryOwnedMounts[];
  amount: number;
  unlockedAmount: number;
}

const userMountsIds = props.mountsOwnedByP1?.map((item: any) => {
  return item.mount.id;
});

const ownedMountArrayP1: number[] = [];
let categoryOwnedMountsArrayP1: CategoryOwnedMounts[] = [];
let numberOfMountsUnlockedP1 = 0;
let totalMountNumberP1: number = 0;
let comparedDiffValueP1: any[] = [];

mountsGlobal.forEach((item, i) => {
  categoryOwnedMountsArrayP1.push({
    categoryName: item.name,
    subCategories: [],
    amount: 0,
    unlockedAmount: 0,
  });

  item?.subcats?.forEach((subcats, index) => {
    if (categoryOwnedMountsArrayP1[i])
      categoryOwnedMountsArrayP1[i].subCategories[index] = {
        subcatName: subcats.name,
        amount: 0,
        unlockedAmount: 0,
      };

    subcats?.items?.forEach((mount) => {
      // console.log(mount);
      if (categoryOwnedMountsArrayP1[i]?.subCategories[index]) {
        categoryOwnedMountsArrayP1[i].subCategories[index].amount += 1;
        categoryOwnedMountsArrayP1[i].amount += 1;
      }
      totalMountNumberP1 += 1;
      if (userMountsIds?.includes(mount.ID)) {
        ownedMountArrayP1.push(mount.ID);
        numberOfMountsUnlockedP1 = numberOfMountsUnlockedP1 + 1;
        if (
          categoryOwnedMountsArrayP1[i] &&
          categoryOwnedMountsArrayP1[i].subCategories[index]
        ) {
          categoryOwnedMountsArrayP1[i].subCategories[index].unlockedAmount +=
            1;
          categoryOwnedMountsArrayP1[i].unlockedAmount += 1;

          comparedDiffValueP1.push(
            categoryOwnedMountsArrayP1[i].categoryName,
            categoryOwnedMountsArrayP1[i].unlockedAmount,
          );
        }
      }
    });
  });
});

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

const compareClosedAccordionDiff = ref<number>();
const comparedAccordionDiffValue = (value: number) => {
  compareClosedAccordionDiff.value = value;
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

  console.log();
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

watch(
  () => baseClosedAccordionDiff.value,
  () => {
    const diffMountOwned =
      compareClosedAccordionDiff.value! - baseClosedAccordionDiff.value!;

    console.log(
      diffMountOwned,
      compareClosedAccordionDiff.value,
      baseClosedAccordionDiff.value,
    );
  },
);
</script>

<template>
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
        :amount="categoryOwnedMountsArrayP1[0]?.amount"
        :unlocked-amount="categoryOwnedMountsArrayP1[0]?.unlockedAmount"
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
        :open-base-diff="baseOpenAccordionDiff"
        :open-compared-diff="comparedOpenAccordionDiff"
        :base-diff="baseClosedAccordionDiff"
        :compared-diff="compareClosedAccordionDiff"
        :character-mounts="comparedMounts"
        :mounts-owned-by-other="characterMounts"
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
