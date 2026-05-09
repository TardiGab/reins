<script setup lang="ts">
import { computed } from "vue";
const { data: realmsIndexEu } = await useLazyFetch<Realms>("/api/realms-eu");
const { data: realmsIndexUs } = await useLazyFetch<Realms>("/api/realms-us");
const { data: realmsIndexKr } = await useLazyFetch<Realms>("/api/realms-kr");
const { data: realmsIndexTw } = await useLazyFetch<Realms>("/api/realms-tw");
// const { data: realmsIndexCn } = await useFetch("/api/realms-cn");

// console.log(realmsIndexCn.value);

// Combobox créé à l'aide de ce tutoriel : https://www.youtube.com/watch?v=KlMIf0_48b8, à mettre en page
const props = defineProps<{
  regionChoosed?: string;
}>();

interface SelectedRealm {
  name: string;
  slug: string;
  id: number;
}

interface Realms {
  realms: SelectedRealm[];
}

const selectedRealm = ref<SelectedRealm>();
const searchTerm = ref("");
const showList = ref(false);
const boxContainer = ref<HTMLDivElement>();
const searchInput = ref<HTMLInputElement>();

const emit = defineEmits<{
  (e: "realm", realm: string): void;
}>();

function selectRealm(realm: SelectedRealm) {
  selectedRealm.value = realm;
  searchTerm.value = "";
  showList.value = false;
  emit("realm", realm.slug);
}

// Fonction de recherche
const filteredRealms = computed(() => {
  if (props.regionChoosed === "EU") {
    return realmsIndexEu.value?.realms.filter((realmEu: SelectedRealm) =>
      realmEu.name
        .toLocaleLowerCase()
        .startsWith(searchTerm.value.toLocaleLowerCase()),
    );
  } else if (props.regionChoosed === "US") {
    return realmsIndexUs.value?.realms.filter((realmUs: SelectedRealm) =>
      realmUs.name
        .toLocaleLowerCase()
        .startsWith(searchTerm.value.toLocaleLowerCase()),
    );
  } else if (props.regionChoosed === "KR") {
    return realmsIndexKr.value?.realms.filter((realmKr: SelectedRealm) =>
      realmKr.name
        .toLocaleLowerCase()
        .startsWith(searchTerm.value.toLocaleLowerCase()),
    );
  } else if (props.regionChoosed === "TW") {
    return realmsIndexTw.value?.realms.filter((realmTw: SelectedRealm) =>
      realmTw.name
        .toLocaleLowerCase()
        .startsWith(searchTerm.value.toLocaleLowerCase()),
    );
  }
});

function closeDropdown(event: any) {
  if (
    !boxContainer.value?.contains(event.target) &&
    !searchInput.value?.contains(event.target)
  ) {
    searchTerm.value = "";
    showList.value = false;
  }
}

const vFocus = {
  mounted: (el: HTMLElement) => el.focus(),
};

onMounted(() => {
  window.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  window.addEventListener("click", closeDropdown);
});

// Reset du serveur sélectionné lorsqu'on change de région
watch(
  () => props.regionChoosed,
  () => {
    if (selectedRealm.value?.name) {
      selectedRealm.value.name = "";
    }
  },
);
</script>

<template>
  <div class="realm-choice">
    <div
      class="realm-choice__container"
      :class="{ 'realm-choice__container--open': showList }"
      ref="boxContainer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m5.84 9.59l5.66 5.66l5.66-5.66l-.71-.7l-4.95 4.95l-4.95-4.95z"
        />
      </svg>
      <button
        @click="showList = !showList"
        class="realm-choice__button"
        :class="{ 'hide-button': showList }"
        :disabled="!props.regionChoosed"
      >
        {{ selectedRealm?.name || "Select a realm" }}
      </button>
      <div v-if="props.regionChoosed === 'EU' && showList">
        <input
          type="text"
          v-model="searchTerm"
          ref="searchInput"
          class="realm-choice__input"
          placeholder="Select a realm"
          v-focus
        />
        <div class="realm-list">
          <div
            class="realm-list__value"
            v-for="realm in filteredRealms"
            :key="realm.id"
            @click="selectRealm(realm)"
          >
            <span class="realm-list__value--span">{{ realm.name }}</span>
          </div>
        </div>
      </div>
      <div v-if="props.regionChoosed === 'US' && showList">
        <input
          type="text"
          v-model="searchTerm"
          ref="searchInput"
          class="realm-choice__input"
          placeholder="Select a realm"
          v-focus
        />
        <div class="realm-list">
          <div
            class="realm-list__value"
            v-for="realm in filteredRealms"
            :key="realm.id"
            @click="selectRealm(realm)"
          >
            <span class="realm-list__value--span">{{ realm.name }}</span>
          </div>
        </div>
      </div>
      <div v-if="props.regionChoosed === 'TW' && showList">
        <input
          type="text"
          v-model="searchTerm"
          ref="searchInput"
          class="realm-choice__input"
          placeholder="Select a realm"
          v-focus
        />
        <div class="realm-list">
          <div
            class="realm-list__value"
            v-for="realm in filteredRealms"
            :key="realm.id"
            @click="selectRealm(realm)"
          >
            <span class="realm-list__value--span">{{ realm.name }}</span>
          </div>
        </div>
      </div>
      <div v-if="props.regionChoosed === 'KR' && showList">
        <input
          type="text"
          v-model="searchTerm"
          ref="searchInput"
          class="realm-choice__input"
          placeholder="Select a realm"
          v-focus
        />
        <div class="realm-list">
          <div
            class="realm-list__value"
            v-for="realm in filteredRealms"
            :key="realm.id"
            @click="selectRealm(realm)"
          >
            <span class="realm-list__value--span">{{ realm.name }}</span>
          </div>
        </div>
      </div>
      <div v-if="!props.regionChoosed && showList">
        <span>Please choose a region before</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.realm-choice {
  position: relative;
  width: 70%;
  font-size: $main-size;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  &__container {
    min-width: 10%;
    width: 100%;
    overflow: hidden;
    z-index: 10;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    svg {
      position: absolute;
      top: 1rem;
      right: 1rem;
      transform: rotate(0deg);
      z-index: 3;
      transition: all 0.3s ease;
      pointer-events: none;
    }
    &--open {
      svg {
        transform: rotate(-180deg);
      }
    }
    @supports (corner-shape: bevel) {
      corner-shape: bevel;
      border-radius: $corner-shape-s;
    }
  }
  &__button {
    background-color: $button-bg-dark;
    border: none;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    @supports (corner-shape: bevel) {
      corner-shape: bevel;
      border-radius: $corner-shape-s;
    }
    width: 100%;
    box-shadow:
      inset 0px 0px 0px 2px $border-container,
      inset 0 0 0 3px black;
    background-color: $button-bg-dark;
    color: white;
    text-align: left;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
    text-shadow: 1px 1px black;
    font-size: $main-size;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    svg {
      transition: all 0.3s ease;
      transform: rotate(0deg);
      pointer-events: all;
    }
    &:hover {
      background-color: $button-bg-hover;
    }
    &--open {
      svg {
        transform: rotate(-180deg);
      }
    }
    &:disabled {
      cursor: not-allowed;
      color: $dark-gray;
      &:hover {
        background-color: $button-bg-dark;
      }
    }
  }
  &__input {
    background-color: #191612;
    border: none;
    color: $dark-gray;
    font-size: $main-size;
    border-radius: 0.5rem;
    padding: 1rem;
    padding-right: 3rem;
    width: calc(100% - 4rem);
    outline: none;
    box-shadow:
      inset 0px 0px 0px 2px $border-container,
      inset 0px 0px 0px 3px black;
    @supports (corner-shape: bevel) {
      corner-shape: bevel;
      border-radius: $corner-shape-s;
    }
  }
}
.realm-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  max-height: 25vh;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: $button-bg-dark;
  padding: 0.5rem;
  box-shadow:
    inset 0px 0px 0px 2px $border-container,
    inset 0px 0px 0px 3px black;
  position: absolute;
  width: calc(100% - 1rem);
  z-index: 10;
  border-radius: 0.5rem;
  @supports (corner-shape: bevel) {
    corner-shape: bevel;
    border-radius: $corner-shape-s;
  }
  &__value {
    padding: 0.25rem;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    text-align: center;
    text-shadow: 1px 1px black;
    position: relative;
    &--span {
      position: relative;
      z-index: 1;
    }
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 0;
      background: linear-gradient(
        90deg,
        rgba(255, 209, 0, 0) 0%,
        rgba(255, 208, 0, 0.3) 50%,
        rgba(255, 209, 0, 0) 100%
      );
      transition: all 0.3s ease;
    }
    &:hover {
      &::after {
        opacity: 1;
      }
    }
  }
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 0.5rem;
    &:hover {
      width: 0.5rem;
    }
  }

  &::-webkit-scrollbar-thumb {
    background: $border-container;
    border-radius: 32px;
    cursor: pointer;

    @supports (corner-shape: bevel) {
      corner-shape: bevel;
    }

    &:hover {
      background: $container-bg;
      width: 0.5rem;
    }
  }
}
.hide-button {
  display: none;
}
</style>
