<script setup lang="ts">
// Combobox créé à l'aide de ce tutoriel : https://www.youtube.com/watch?v=KlMIf0_48b8, à mettre en page
const regions = ref(["EU", "US", "KR", "TW"]);

const selectedRegion = ref("");
const searchTerm = ref("");
const showList = ref(false);
const boxContainer = ref(null);
const searchInput = ref(null);

const emit = defineEmits<{
  (e: "region", region: string): void;
}>();

function selectRegion(region: string) {
  selectedRegion.value = region;
  searchTerm.value = "";
  showList.value = false;
  emit("region", region);
}

const filteredRegions = computed(() => {
  return regions.value.filter((region) =>
    region.toLocaleLowerCase().startsWith(searchTerm.value.toLocaleLowerCase()),
  );
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
  <div class="region-choice">
    <div class="region-choice__container" ref="boxContainer">
      <button @click="showList = !showList" class="region-choice__button">
        {{ selectedRegion || "Select a region" }}
      </button>
      <div class="input-container" v-if="showList">
        <input
          type="text"
          v-model="searchTerm"
          ref="searchInput"
          class="region-choice__input"
          placeholder="Select a region"
        />
        <div class="region-list">
          <span
            v-for="region in filteredRegions"
            :key="region"
            @click="selectRegion(region)"
            class="region-list__value"
          >
            {{ region }}
          </span>
        </div>
      </div>
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
    // position: absolute;
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
