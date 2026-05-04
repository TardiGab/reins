<script setup lang="ts">
// Combobox créé à l'aide de ce tutoriel : https://www.youtube.com/watch?v=KlMIf0_48b8, à mettre en page
const regions = ref(["EU", "US", "KR", "TW"]);

const selectedRegion = ref("");
const searchTerm = ref("");
const showList = ref(false);
const boxContainer = ref<HTMLDivElement>();
const searchInput = ref<HTMLInputElement>();
const dropdownHeight = ref();

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
  console.log(dropdownHeight.value.clientHeight);
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
      <div
        class="input-container"
        :class="{ 'input-container--open': showList }"
        ref="dropdownHeight"
      >
        <div class="region-list" v-if="showList">
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
@keyframes height {
  from {
    height: 0;
  }
  to {
    height: auto;
  }
}

.input-container {
  position: relative;
  width: 100%;
  max-height: 1000px;
  height: 0;
  transition: height 0.3s ease;
  z-index: 1;
  &--open {
    border-top: 2px solid $border-container;
    height: 100%;
    padding: 0.5rem 0;
  }
}

.region-choice {
  position: relative;
  width: 100%;
  &__container {
    min-width: 10%;
    width: 100%;
    overflow: hidden;
    position: absolute;
    z-index: 10;
    background-color: #191612;
    border: 2px solid $border-container;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
  }
  &__button {
    width: 100%;
    box-shadow: inset 0 0 0 1px black;
    background-color: #191612;
    border: none;
    color: white;
    text-align: left;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
    &:hover {
      background-color: hsl(27, 16%, 16%);
    }
  }
  &__input {
    background-color: #191612;
    border: 1px solid $border-container;
    color: $dark-gray;
    font-size: $small;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    line-height: 1;
    width: calc(100% - 2rem);
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
  align-items: center;
  gap: 0.5rem;

  &__value {
    padding: 0.25rem;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    text-align: center;
    background: linear-gradient(
      90deg,
      rgba(255, 209, 0, 0) 0%,
      rgba(255, 208, 0, 0) 50%,
      rgba(255, 209, 0, 0) 100%
    );
    text-shadow: 1px 1px black;
    position: relative;
    &:hover {
      background: linear-gradient(
        90deg,
        rgba(255, 209, 0, 0) 0%,
        rgba(255, 208, 0, 0.3) 50%,
        rgba(255, 209, 0, 0) 100%
      );
    }
  }
}
</style>
