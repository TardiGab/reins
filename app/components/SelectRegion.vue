<script setup lang="ts">
// Combobox créé à l'aide de ce tutoriel : https://www.youtube.com/watch?v=KlMIf0_48b8, à mettre en page

const selectedRegion = ref("");
const searchTerm = ref("");
const showList = ref(false);
const boxContainer = ref(null);
const searchInput = ref(null);

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

const regions = ref(["EU", "US", "KR", "TW"]);

function selectRegion(region: string) {
  selectedRegion.value = region;
  searchTerm.value = "";
  showList.value = false;
}

const filteredRegions = computed(() => {
  return regions.value.filter((region) =>
    region.toLocaleLowerCase().startsWith(searchTerm.value.toLocaleLowerCase()),
  );
});
</script>

<template></template>

<style scoped>
.combobox-container {
  position: relative;
}
.box-container {
}
.box-list {
  position: absolute;
  z-index: 10;
  width: 100%;
  overflow: hidden;
}
.region-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
