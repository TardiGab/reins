<script setup lang="ts">
import { random } from "#imports";

interface Profile {
  name: string;
  level: number;
  race: {
    name: string;
  };
  realm: {
    name: string;
  };
  character_class: {
    name: string;
  };
  active_spec: {
    name: string;
  };
  active_title: {
    name: string;
    display_string?: string;
  };
}

const regionChoosed = ref<string>("");
const regionSelected = (region: string) => {
  regionChoosed.value = region;
};

// Realm slug
const realmChoosed = ref<string>("");
const realmSelected = (realm: string) => {
  realmChoosed.value = realm;
};

// Realm name
const fullRealmString = ref<string>();
const realmString = (realm: string) => {
  fullRealmString.value = realm;
};

const errorRealm = ref<string>();
const errorRegion = ref<string>();

const characterSearch = ref<string>();
const searchString = ref<string>();

const emit = defineEmits<{
  (e: "profile", profile: Profile): void;
  (e: "compared-mounts", mounts: any): void;
  (e: "character", character: string): void;
  (e: "region", region: string): void;
  (e: "realm", realm: string): void;
  (e: "avatar", avatar: string): void;
  (e: "useable-number", useable: number): void;
  (e: "total-owned", owned: number): void;
}>();

const {
  data: comparedMounts,
  execute: go,
  status: loading,
  clear: clearComparedMounts,
} = await useLazyFetch("/api/character-mounts", {
  query: {
    region: regionChoosed,
    realm: realmChoosed,
    character: characterSearch,
  },
  immediate: false,
});

const { data: comparedCharacterRender, execute: comparedRenderGo } =
  await useLazyFetch("/api/character-render", {
    query: {
      region: regionChoosed,
      realm: realmChoosed,
      character: characterSearch,
    },
    immediate: false,
  });

const { data: profile, execute: profileGo } = await useFetch(
  "/api/account-profile",
  {
    query: {
      region: regionChoosed,
      realm: realmChoosed,
      character: characterSearch,
    },
    immediate: false,
  },
);

const { data: characterProfile, execute: charProfileGo } = await useLazyFetch(
  "/api/character-profile/",
  {
    query: {
      region: regionChoosed,
      realm: realmChoosed,
      character: characterSearch,
    },
    immediate: false,
  },
);

let loadingText = ref<string[]>([
  "Searching saddles...",
  "Looking for Invincible...",
  "These webs will summon Nerubians, don't stand in 'em!",
  "Cleaning stable...",
  "Gathering horseshoes...",
  "Mrglglglglgl!",
  "Looking for mounts...",
]);

const randomLoadingValue = ref<number>(0);

const avatar = ref();

const totalOwnedNumber = ref<number>();
const useableNumber = ref<number>();
const useableNumberArray = ref<string[]>([]);

const showError = ref<boolean>(false);

const search = async () => {
  clearComparedMounts();
  await go();
  await comparedRenderGo();
  await profileGo();
  await charProfileGo();

  searchString.value = characterSearch.value?.trim() as string;

  if (comparedMounts.value) {
    totalOwnedNumber.value = comparedMounts.value.length;
  }

  useableNumber.value = useableNumberArray.value.length;

  if (comparedCharacterRender.value) {
    avatar.value = await comparedCharacterRender.value[0].value;
  }

  randomLoadingValue.value = random(0, loadingText.value.length - 1);
  if (await comparedMounts.value) {
    showError.value = false;
    emit("character", characterSearch.value?.trim() as string);
    emit("realm", realmChoosed.value);
    emit("region", regionChoosed.value);
    emit("avatar", avatar.value);
    emit("profile", characterProfile.value);
    emit("useable-number", useableNumber.value);
    if (totalOwnedNumber.value) {
      emit("total-owned", totalOwnedNumber.value);
    }
    emit("compared-mounts", await comparedMounts.value);
    await comparedMounts.value.forEach((item: any) => {
      if (item.is_useable) {
        useableNumberArray.value.push(item.mount.name);
      }
    });
    console.log("Character found");
  } else {
    errorRegion.value = regionChoosed.value;
    errorRealm.value = fullRealmString.value;
    showError.value = true;
    console.log("Character not found");
    return;
  }
};
</script>

<template>
  <div class="search">
    <SelectRegion @region="regionSelected" class="search__region" />
    <SelectRealm
      :region-choosed="regionChoosed"
      @realm="realmSelected"
      @complete-realm="realmString"
      class="search__realm"
    />
    <div class="search__input-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M9.5 4a6.5 6.5 0 0 1 6.5 6.5c0 1.62-.59 3.1-1.57 4.23l5.65 5.65l-.71.71l-5.65-5.65A6.47 6.47 0 0 1 9.5 17A6.5 6.5 0 0 1 3 10.5A6.5 6.5 0 0 1 9.5 4m0 1A5.5 5.5 0 0 0 4 10.5A5.5 5.5 0 0 0 9.5 16a5.5 5.5 0 0 0 5.5-5.5A5.5 5.5 0 0 0 9.5 5"
        />
      </svg>
      <input
        type="text"
        v-model="characterSearch"
        placeholder="Character's name"
        @change="search"
        class="search__input"
        :disabled="!realmChoosed"
      />
    </div>

    <button @click="search" class="search__button" :disabled="!characterSearch">
      <span class="search__button--label">Search</span>
    </button>

    <div
      class="loader"
      v-if="loading === 'pending' || (loading === 'success' && !showError)"
    >
      <p class="loader__text">
        {{ loadingText[randomLoadingValue] }}
      </p>
    </div>
    <div class="error" v-if="showError && searchString">
      <p class="error__text">
        Character named <span>{{ searchString }}</span> not found on
        <span>{{ regionChoosed }} - {{ errorRealm }}</span
        >.
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss">
.loading {
  margin-top: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &__text {
    font-size: $main-size;
  }
}

.search {
  display: flex;
  width: 100%;
  gap: 1rem;
  flex-direction: column;
  &__region,
  &__realm {
    width: 100% !important;
  }
  &__input-container {
    position: relative;
    svg {
      position: absolute;
      top: 1rem;
      left: 1rem;
    }
  }
  &__input {
    background-color: $button-bg-dark;
    border: none;
    box-shadow:
      inset 0px 0px 0px 2px $border-container,
      inset 0 0 0 3px black;
    color: $dark-gray;
    text-shadow: 1px 1px black;
    font-size: $main-size;
    border-radius: 0.5rem;
    padding: 1rem;
    padding-left: 3rem;
    transition: background-color 0.3s ease;
    width: stretch;
    @supports (corner-shape: bevel) {
      corner-shape: bevel;
      border-radius: $corner-shape-s;
    }
    &:hover {
      background-color: $button-bg-hover;
    }
    &:active,
    &:focus {
      box-shadow:
        inset 0px 0px 0px 2px $dark-gray,
        inset 0 0 0 3px black;
      outline: none;
    }
    &:disabled {
      cursor: not-allowed;
      &:hover {
        background-color: $button-bg-dark;
      }
    }
  }
  &__button {
    color: $yellow;
    padding: 0.5rem 2rem;
    background-image: url("/images/body.webp");
    background-color: $red;
    background-blend-mode: luminosity;
    border: solid 2px $dark-red;
    border-radius: 0.5rem;
    font-size: $main-size;
    transition: all 0.3s ease;
    text-decoration: none;
    position: relative;
    cursor: pointer;
    @supports (corner-shape: bevel) {
      corner-shape: bevel;
      border-radius: $corner-shape-s;
    }
    &--label {
      z-index: 1;
      position: relative;
      text-shadow: 1px 1px black;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
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
    &:disabled {
      cursor: not-allowed;
      filter: grayscale(50%);
      &:hover {
        &::after {
          opacity: 0;
        }
      }
    }
  }
}

.loader,
.error {
  width: 100%;
  &__text {
    margin: 0;
    font-size: $small;
    text-align: center;
    span {
      color: $yellow;
    }
  }
}
</style>
