<script setup lang="ts">
import { computed } from "vue";
const { data: realmsIndexEu } = await useFetch("/api/realms-eu");
const { data: realmsIndexUs } = await useFetch("/api/realms-us");
const { data: realmsIndexKr } = await useFetch("/api/realms-kr");
const { data: realmsIndexTw } = await useFetch("/api/realms-tw");
// const { data: realmsIndexCn } = await useFetch("/api/realms-cn");

// console.log(realmsIndexCn.value);

const realmsEuArray: string[] = [];

realmsIndexEu.value.forEach((realm: any) => {
  realmsEuArray.push(realm.name);
});

const realmsEu = ref(realmsEuArray);

console.log(realmsEu.value);

// realmsIndexEu.value.forEach((item: any) => {
//   // console.log(item.id);
//   realmsEuId.push(item.id);
// });
// realmsIndexUs.value.forEach((item: any) => {
//   // console.log(item.id);
//   realmsUsId.push(item.id);
// });

// console.log("EU", realmsEuId);
// console.log("US", realmsUsId);

// const character = ref();
// const realmSelect = ref();
// const region = ref();
// const realmName = ref();

// console.log(realmsIndexEu.value);

// function regionChange() {
//   console.log(region.value);
//   // return region.value;
// }

// Combobox créé à l'aide de ce tutoriel : https://www.youtube.com/watch?v=KlMIf0_48b8, à mettre en page
const props = defineProps<{
  regionChoosed?: string;
}>();

// const logRegion = computed(() => {
//   return `La région choisie est ${props.regionChoosed}`;
//   if (!props.regionChoosed) {
//     console.log("En attente d'une region");
//     return "En attente d'une région";
//   } else {
//     return `La région choisie est ${props.regionChoosed}`;
//   }
// });
// console.log(logRegion);

const realms = ref(["EU", "US", "KR", "TW"]);

const selectedRealm = ref("");
const searchTerm = ref("");
const showList = ref(false);
const boxContainer = ref(null);
const searchInput = ref(null);

function selectRealm(realm: string) {
  selectedRealm.value = realm;
  searchTerm.value = "";
  showList.value = false;
}

const filteredRealms = computed(() => {
  if (props.regionChoosed === "EU") {
    return realmsEu.value.filter((realmEu: string) =>
      realmEu.startsWith(searchTerm.value.toLocaleLowerCase()),
    );
  } // else if (props.regionChoosed === "US") {

  // }
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
</script>

<template>
  <div class="realm-choice">
    <div class="realm-choice__container">
      <div v-if="props.regionChoosed === 'EU'" class="realm-list">
        <div
          v-for="realm in filteredRealms"
          :key="realm"
          @click="selectRealm(realm)"
          class="realm-list__value"
        >
          {{ realm }}
        </div>
      </div>
      <div v-if="props.regionChoosed === 'US'">C'est US</div>
      <div v-if="props.regionChoosed === 'TW'">C'est TW</div>
      <div v-if="props.regionChoosed === 'KR'">C'est KR</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-container {
  position: relative;
  &::after {
    content: attr(data-value) "";
    font: inherit;
    min-width: 2px;
    height: auto;
    position: absolute;
    left: 1rem;
    top: 0.5rem;
    z-index: 10;
  }
}

.region-choice {
  position: relative;
  &__container {
    position: absolute;
    z-index: 10;
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
.region-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;

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
