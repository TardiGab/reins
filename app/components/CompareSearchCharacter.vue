<script setup lang="ts">
import { random } from "#imports";

const regionChoosed = ref<string>("");
const regionSelected = (region: string) => {
  regionChoosed.value = region;
};

const realmChoosed = ref<string>("");
const realmSelected = (realm: string) => {
  realmChoosed.value = realm;
};

const characterSearch = ref<string>();

const emit = defineEmits([
  "region",
  "realm",
  "character",
  "compared-mounts",
  "avatar",
]);

const {
  data: comparedMounts,
  execute: go,
  status: loading,
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

let loadingText = ref([
  "Searching saddles...",
  "Looking for Invincible...",
  "These webs will summon Nerubians, don't stand in 'em!",
  "Cleaning stable...",
  "Gathering horseshoes...",
]);

let randomLoadingValue: number;

let avatar = ref();

const search = async () => {
  await go();
  await comparedRenderGo();
  avatar.value = await comparedCharacterRender.value[0].value;
  randomLoadingValue = random(0, loadingText.value.length - 1);
  emit("compared-mounts", comparedMounts.value);
  emit("character", characterSearch.value);
  emit("realm", realmChoosed.value);
  emit("region", regionChoosed.value);
  emit("avatar", avatar.value);
};
</script>

<template>
  <div class="search">
    <SelectRegion @region="regionSelected" class="search__region" />
    <SelectRealm
      :region-choosed="regionChoosed"
      @realm="realmSelected"
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
      />
    </div>

    <button @click="search" class="search__button">
      <span class="search__button--label">Search</span>
    </button>

    <div class="loader" v-if="loading === 'pending'">
      <span class="loader__text">{{ loadingText[randomLoadingValue] }}</span>
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
  }
  &__button {
    color: $yellow;
    padding: 0.5rem 2rem;
    background-image: url("/images/body-background-1.webp");
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
  }
}
</style>
