<script setup lang="ts">
const regionChoosed = ref<string>("");
const regionSelected = (region: string) => {
  regionChoosed.value = region;
};
</script>

<template>
  <div class="search">
    <SelectRegion @region="regionSelected" />
    <SelectRealm :region-choosed="regionChoosed" />
  </div>
</template>

<style scoped lang="scss">
.search {
  display: flex;
  height: auto;
}
</style>
