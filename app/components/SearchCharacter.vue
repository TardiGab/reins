<script setup lang="ts">
const regionChoosed = ref<string>("");
const regionSelected = (region: string) => {
  regionChoosed.value = region;
};
const realmChoosed = ref<string>("");
const realmSelected = (realm: string) => {
  realmChoosed.value = realm;
};
</script>

<template>
  <div class="search">
    <SelectRegion @region="regionSelected" />
    <SelectRealm :region-choosed="regionChoosed" @realm="realmSelected" />
    <SelectCharacter />
    <button @click="console.log(realmChoosed)">Click</button>
  </div>
</template>

<style scoped lang="scss">
.search {
  display: flex;
  height: auto;
}
</style>
