<script setup lang="ts">
interface CharactersMounts {
  mounts: {
    mount: {
      key: { href: string };
      name: string;
      id: number;
    };
  };
}

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
const baseCharacterSearch = ref<string>();

const baseSearch = async () => {
  characterSearch.value = baseCharacterSearch.value;
  baseCharacterName.value = baseCharacterSearch.value;
  if (regionChoosed.value && realmChoosed.value && baseCharacterSearch.value) {
    await navigateTo({
      path: `/search/${regionChoosed.value.toLocaleLowerCase()}/${realmChoosed.value}/${baseCharacterSearch.value}`,
    });
  }
};
</script>

<template>
  <div class="search">
    <div class="search__fields">
      <div class="search__container">
        <SelectRegion @region="regionSelected" class="login__region" />
        <SelectRealm
          :region-choosed="regionChoosed"
          @realm="realmSelected"
          class="login__realm"
          :disabled="!regionChoosed"
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
            v-model="baseCharacterSearch"
            placeholder="Character's name"
            @change="baseSearch"
            class="search__input"
            :disabled="!realmChoosed"
          />
        </div>

        <button @click="baseSearch" class="search__button">
          <span class="search__button--label">Search</span>
        </button>
      </div>
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
  &__fields {
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }
  &__container {
    display: flex;
    width: 100%;
    gap: 1rem;
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
    &:disabled {
      cursor: not-allowed;
      color: $dark-gray;
      &:hover {
        background-color: $button-bg-dark;
      }
      &:active,
      &:focus {
        box-shadow:
          inset 0px 0px 0px 2px $border-container,
          inset 0 0 0 3px black;
        outline: none;
      }
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
    &:disabled {
      cursor: not-allowed;
      filter: grayscale(50%);
      &:hover {
        background-color: $red;
        &::after {
          opacity: 0;
        }
      }
      &:active,
      &:focus {
        box-shadow:
          inset 0px 0px 0px 2px $border-container,
          inset 0 0 0 3px black;
        outline: none;
      }
    }
  }
}

.login {
  &__region,
  &__realm {
    width: 100%;
  }
}
</style>
