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
    <div class="left">
      <div class="search">
        <SelectRegion @region="regionSelected" />
        <SelectRealm :region-choosed="regionChoosed" @realm="realmSelected" />
        <input
          type="text"
          v-model="baseCharacterSearch"
          placeholder="Character's name"
          @change="baseSearch"
        />
        <button @click="baseSearch">Search</button>
      </div>
      <pre v-if="loading === 'pending' && baseCharacterName">Loading...</pre>
      <div v-if="loading === 'success' && baseCharacterMountsData">
        <p>{{ baseCharacterName }}'s mount collection</p>
        <p>Total mounts owned : {{ baseCharacterMountsData.length }}</p>
        <!-- <pre>{{ baseCharacterMounts }}</pre> -->
        <CompareMountList :character-mounts="baseCharacterMountsData" />
        <ul>
          <li
            v-for="mounts in baseCharacterMountsData"
            :key="mounts.mount.key.href"
          >
            {{ mounts.mount.name }}
          </li>
        </ul>
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
    <div class="right">
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
      <pre v-if="loading === 'pending' && comparedCharacterName">
        Loading...
      </pre>
      <div v-if="loading === 'success' && comparedCharacterMountsData">
        <p>{{ comparedCharacterName }}'s mount collection</p>
        <p>Total mounts owned : {{ comparedCharacterMountsData.length }}</p>
        <CompareMountList :character-mounts="comparedCharacterMountsData" />
        <ul>
          <li
            v-for="mounts in comparedCharacterMountsData"
            :key="mounts.mount.key.href"
          >
            {{ mounts.mount.name }}
          </li>
        </ul>
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
</style>
