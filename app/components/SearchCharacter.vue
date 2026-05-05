<script setup lang="ts">
interface CharactersMounts {
  mounts: {
    mount: {
      key: { href: string };
      name: string;
      id: number;
    };
  };
  // length: number;
}

const showSearch = ref(true);

const regionChoosed = ref<string>("");
const regionSelected = (region: string) => {
  regionChoosed.value = region;
};

const realmChoosed = ref<string>("");
const realmSelected = (realm: string) => {
  realmChoosed.value = realm;
};

const characterSearch = ref<string>();

const baseCharacterName = ref<string>();
const comparedCharacterName = ref<string>();

const baseCharacterSearch = ref<string>();
const comparedCharacterSearch = ref<string>();

const {
  data: characterMounts,
  execute: go,
  status: loading,
} = await useLazyFetch("/api/character-mounts", {
  query: {
    region: regionChoosed,
    realm: realmChoosed,
    character: characterSearch,
  },
  watch: false,
  immediate: false,
});

const baseCharacterMountsData = ref<CharactersMounts>();
const baseSearch = async () => {
  characterSearch.value = baseCharacterSearch.value;
  await go();
  // Histoire d'éviter que lorsqu'on relance la recherche, la valeur du span change en temps réel
  baseCharacterName.value = baseCharacterSearch.value;
  baseCharacterMountsData.value = characterMounts.value;
  showSearch.value = false;
  // console.log(
  //   `${baseCharacterName.value} mounts data:`,
  //   baseCharacterMountsData.value,
  //   "Total mounts owned:",
  //   baseCharacterMountsData.value?.length,
  // );
};

const comparedCharacterMountsData = ref<CharactersMounts>();
const comparedSearch = async () => {
  characterSearch.value = comparedCharacterSearch.value;
  await go();
  // Histoire d'éviter que lorsqu'on relance la recherche, la valeur du span change en temps réel
  comparedCharacterName.value = comparedCharacterSearch.value;
  comparedCharacterMountsData.value = characterMounts.value;
  // console.log(
  //   `${comparedCharacterName.value} mounts data:`,
  //   comparedCharacterMountsData.value,
  //   "Total mounts owned:",
  //   comparedCharacterMountsData.value?.length,
  // );
};
</script>

<template>
  <div class="compare">
    <div class="left" :class="{ 'left--half': !baseCharacterMountsData }">
      <div class="search" v-if="showSearch">
        <SelectRegion @region="regionSelected" />
        <SelectRealm :region-choosed="regionChoosed" @realm="realmSelected" />
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
            v-model="baseCharacterSearch"
            placeholder="Character's name"
            @change="baseSearch"
            class="search__input"
          />
        </div>

        <button @click="baseSearch" class="search__button">
          <span class="search__button--label">Search</span>
        </button>
      </div>
      <span v-if="loading === 'pending' && baseCharacterName">Loading...</span>
      <div v-if="loading === 'success' && baseCharacterMountsData">
        <p>{{ baseCharacterName }}'s mount collection</p>
        <p>Total mounts owned : {{ baseCharacterMountsData.length }}</p>
        <CompareMountList :character-mounts="baseCharacterMountsData" />
      </div>
      <pre
        v-if="
          loading === 'error' ||
          (baseCharacterName && baseCharacterMountsData === undefined)
        "
      >
        The character named {{ baseCharacterName }} was not found.
      </pre>
    </div>
    <div class="right" v-if="baseCharacterMountsData">
      <div class="search">
        <SelectRegion @region="regionSelected" />
        <SelectRealm :region-choosed="regionChoosed" @realm="realmSelected" />
        <input
          type="text"
          v-model="comparedCharacterSearch"
          placeholder="Character's name"
          @change="comparedSearch"
        />
        <button @click="comparedSearch">Search</button>
      </div>
      <span v-if="loading === 'pending' && comparedCharacterName">
        Loading...
      </span>
      <div v-if="loading === 'success' && comparedCharacterMountsData">
        <p>{{ comparedCharacterName }}'s mount collection</p>
        <p>Total mounts owned : {{ comparedCharacterMountsData.length }}</p>
        <CompareMountList :character-mounts="comparedCharacterMountsData" />
      </div>
      <pre
        v-if="
          loading === 'error' ||
          (comparedCharacterName && comparedCharacterMountsData === undefined)
        "
      >
        The character named {{ comparedCharacterName }} was not found.
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
.compare {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.left,
.right {
  width: 100%;
  &--half {
    width: 75%;
    margin: auto;
    @media screen and (max-width: 1440px) {
      width: 90%;
    }
  }
}

.search {
  display: flex;
  width: 100%;
  gap: 1rem;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
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
