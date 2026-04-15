<script setup lang="ts">
const { data: realmsIndexEu } = await useFetch("/api/realms-eu");
const { data: realmsIndexUs } = await useFetch("/api/realms-us");
const { data: realmsIndexKr } = await useFetch("/api/realms-kr");
const { data: realmsIndexTw } = await useFetch("/api/realms-tw");
// const { data: realmsIndexCn } = await useFetch("/api/realms-cn");

// console.log(realmsIndexCn.value);

let realmsEuId: number[] = [];
let realmsUsId: number[] = [];

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

<template>
  <div class="combobox-container">
    <div class="box-list">
      <input
        type="text"
        v-model="searchTerm"
        ref="searchInput"
        :placeholder="selectedRegion || 'Region'"
        @click="showList = !showList"
        class=""
      />
      <span>{{ searchTerm || selectedRegion }}</span>
      <div class="region-list" v-show="showList">
        <span
          v-for="region in filteredRegions"
          :key="region"
          @click="selectRegion(region)"
          >{{ region }}</span
        >
      </div>
    </div>
  </div>

  <!-- <form action="" method="post" @submit.prevent>
    <label for="regions">Region</label>
    <input
      list="regions"
      id="regionsIndex"
      v-model="region"
      @change="regionChange"
    />
    <datalist name="regions" id="regions">
      <option value="EU">EU</option>
      <option value="US">US</option>
      <option value="KR">KR</option>
      <option value="TW">TW</option>
    </datalist>
    <label for="realms">Realm</label>
    <input list="realms" id="realmsIndex" v-model="realmSelect" />
    <datalist name="realms" id="realms" v-if="region?.value === 'EU'">
      <option value="" disabled>EU</option>
      <option :value="realm.slug" v-for="realm in realmsIndexEu[0]">
        EU {{ realm.name }}
      </option>
      <option value="" disabled>NA</option>
      <option :value="realm.slug" v-for="realm in realmsIndexUs">
        US {{ realm.name }}
      </option>
      <option value="" disabled>KR</option>
      <option :value="realm.slug" v-for="realm in realmsIndexKr">
        KR {{ realm.name }}
      </option>
      <option value="#" disabled>TW</option>
      <option :value="realm.slug" v-for="realm in realmsIndexTw">
        TW {{ realm.name }}
      </option>
    </datalist>
    <label for="character">Character name</label>
    <input type="text" v-model="character" id="character" name="character" />
    <button
      type="submit"
      @click="console.log([region, realmSelect, character.toLowerCase()])"
    >
      Search
    </button>
  </form> -->
</template>

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
