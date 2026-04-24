<script setup lang="ts">
import { computed } from "vue";
const { data: realmsIndexEu } = await useFetch("/api/realms-eu");
const { data: realmsIndexUs } = await useFetch("/api/realms-us");
const { data: realmsIndexKr } = await useFetch("/api/realms-kr");
const { data: realmsIndexTw } = await useFetch("/api/realms-tw");
// const { data: realmsIndexCn } = await useFetch("/api/realms-cn");

// console.log(realmsIndexCn.value);

// Combobox créé à l'aide de ce tutoriel : https://www.youtube.com/watch?v=KlMIf0_48b8, à mettre en page
const props = defineProps<{
  regionChoosed?: string;
}>();

interface SelectedRealm {
  name: string;
  slug: string;
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
    return realmsIndexEu.value.filter((realmEu: SelectedRealm) =>
      realmEu.name
        .toLocaleLowerCase()
        .startsWith(searchTerm.value.toLocaleLowerCase()),
    );
  } else if (props.regionChoosed === "US") {
    return realmsIndexUs.value.filter((realmUs: SelectedRealm) =>
      realmUs.name
        .toLocaleLowerCase()
        .startsWith(searchTerm.value.toLocaleLowerCase()),
    );
  } else if (props.regionChoosed === "KR") {
    return realmsIndexKr.value.filter((realmKr: SelectedRealm) =>
      realmKr.name
        .toLocaleLowerCase()
        .startsWith(searchTerm.value.toLocaleLowerCase()),
    );
  } else if (props.regionChoosed === "TW") {
    return realmsIndexTw.value.filter((realmTw: SelectedRealm) =>
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
    <div class="realm-choice__container" ref="boxContainer">
      <button @click="showList = !showList" class="realm-choice__button">
        {{ selectedRealm?.name || "Select a realm" }}
      </button>
      <div v-if="props.regionChoosed === 'EU' && showList" class="realm-choice">
        <input
          type="text"
          v-model="searchTerm"
          ref="searchInput"
          class="realm-choice__input"
          placeholder="Select a realm"
        />
        <div class="realm-list">
          <span
            v-for="realm in filteredRealms"
            :key="realm"
            @click="selectRealm(realm)"
            class="realm-list__value"
          >
            {{ realm.name }}
          </span>
        </div>
      </div>
      <div v-if="props.regionChoosed === 'US' && showList">
        <input
          type="text"
          v-model="searchTerm"
          ref="searchInput"
          class="realm-choice__input"
          placeholder="Select a realm"
        />
        <div class="realm-list">
          <span
            v-for="realm in filteredRealms"
            :key="realm"
            @click="selectRealm(realm)"
            class="realm-list__value"
          >
            {{ realm.name }}
          </span>
        </div>
      </div>
      <div v-if="props.regionChoosed === 'TW' && showList">
        <input
          type="text"
          v-model="searchTerm"
          ref="searchInput"
          class="realm-choice__input"
          placeholder="Select a realm"
        />
        <div class="realm-list">
          <span
            v-for="realm in filteredRealms"
            :key="realm"
            @click="selectRealm(realm)"
            class="realm-list__value"
          >
            {{ realm.name }}
          </span>
        </div>
      </div>
      <div v-if="props.regionChoosed === 'KR' && showList">
        <input
          type="text"
          v-model="searchTerm"
          ref="searchInput"
          class="realm-choice__input"
          placeholder="Select a realm"
        />
        <div class="realm-list">
          <span
            v-for="realm in filteredRealms"
            :key="realm"
            @click="selectRealm(realm)"
            class="realm-list__value"
          >
            {{ realm.name }}
          </span>
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
  &__container {
    min-width: 10%;
    overflow: hidden;
  }
  &__button {
    width: 100%;
  }
  &__input {
    background-color: #191612;
    border: 1px solid $border-container;
    color: $dark-gray;
    font-size: $small;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    line-height: 1;
  }
  &__value {
    position: absolute;
    top: 0.7rem;
    left: 1rem;
    color: $dark-gray;
    font-size: $small;
    line-height: 1;
  }
}
.realm-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  max-height: 50vh;
  overflow-y: scroll;
  &__value {
    padding: 0.25rem;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: $dark-gray;
    }
  }
}
</style>
