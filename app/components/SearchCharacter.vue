<script setup lang="ts">
const { data: accessToken } = await useFetch("/api/access-token");

const regionChoosed = ref<string>("");
const regionSelected = (region: string) => {
  regionChoosed.value = region;
};

const realmChoosed = ref<string>("");
const realmSelected = (realm: string) => {
  realmChoosed.value = realm;
};

const character = ref<string>();

const {
  data: characterMounts,
  execute,
  status,
} = await useLazyFetch("/api/character-mounts", {
  query: {
    region: regionChoosed,
    realm: realmChoosed,
    character: character,
    accessToken: accessToken.value.access_token,
  },
  watch: false,
  immediate: false,
});

const search = async () => {
  await execute();
  console.log(characterMounts.value);
};
</script>

<template>
  <div class="search">
    <SelectRegion @region="regionSelected" />
    <SelectRealm :region-choosed="regionChoosed" @realm="realmSelected" />
    <input
      type="text"
      v-model="character"
      placeholder="Character's name"
      @change="search"
    />
    <button @click="search">Search</button>
  </div>
  <pre v-if="status === 'pending'">Loading...</pre>
  <pre v-else>{{ characterMounts }}</pre>
</template>

<style scoped lang="scss"></style>
