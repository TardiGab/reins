<script setup lang="ts">
import { random } from "#imports";
import { authClient } from "~~/server/lib/auth-client";

const session = authClient.useSession();

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

const regionChoosed = ref<string>("");
const regionSelected = (region: string) => {
  regionChoosed.value = region;
};

const realmChoosed = ref<string>("");
const realmSelected = (realm: string) => {
  realmChoosed.value = realm;
};

const loggedRegion = ref<string>("");
const loggedRegionSelected = (region: string) => {
  loggedRegion.value = region;
};
const loggedRealm = ref<string>("");
const loggedRealmSelected = (realm: string) => {
  loggedRealm.value = realm;
};
const loggedCharacter = ref<string>("");
const loggedCharacterSelected = (character: string) => {
  loggedCharacter.value = character;
};

const characterSearch = ref<string>();

const baseCharacterName = ref<string>();

const baseCharacterSearch = ref<string>();

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
  if (session.value.data?.user) {
    await navigateTo({
      path: "/compare-result",
      query: {
        region: loggedRegion.value.toLocaleLowerCase(),
        realm: loggedRealm.value,
        character: loggedCharacter.value,
        cregion: regionChoosed.value.toLocaleLowerCase(),
        crealm: realmChoosed.value,
        ccharacter: baseCharacterSearch.value,
      },
    });
  } else {
    await navigateTo({
      path: "/compare-result",
      query: {
        region: regionChoosed.value.toLocaleLowerCase(),
        realm: realmChoosed.value,
        character: baseCharacterSearch.value,
      },
    });
  }
};
let loadingText = ref([
  "Searching saddles...",
  "Looking for Invincible...",
  "Cleaning stable...",
  "Gathering horseshoes...",
  "Fighting Nullaeus...",
]);

let randomLoadingValue = random(0, loadingText.value.length - 1);
</script>

<template>
  <div class="compare">
    <div class="logged-compare" v-if="session.data?.user.name">
      <span class="logged-compare__p">
        <strong>Step 1:</strong> Choose one of your characters to be compared
        with.
      </span>
      <CharactersList
        class="characters-list-component"
        @realm="loggedRealmSelected"
        @region="loggedRegionSelected"
        @character="loggedCharacterSelected"
      />
    </div>
    <div class="search">
      <span class="logged-compare__p" v-if="session.data?.user">
        <strong>Step 2:</strong> Search for your friend's character.
      </span>
      <div class="search__container">
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
    </div>
    <div class="loading" v-if="loading === 'pending' || loading === 'success'">
      <span class="loading__text">{{ loadingText[randomLoadingValue] }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.compare {
  width: 60%;
  margin: auto;
  @media screen and (min-width: 1441px) and (max-width: 1670px) {
    width: 75%;
  }
  @media screen and (max-width: 1440px) {
    width: 90%;
  }
}

.logged-compare {
  max-width: 600px;
  margin: auto;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  &__p {
    font-size: $main-size;
    strong {
      color: $yellow;
    }
  }
  &__p,
  .characters-list-component {
    margin: auto;
  }
  .characters-list-component {
    z-index: 11;
  }
}

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
  gap: 1rem;
  flex-direction: column;
  &__container {
    display: flex;
    width: 100%;
    gap: 1rem;
    @media screen and (max-width: 1024px) {
      flex-direction: column;
    }
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
