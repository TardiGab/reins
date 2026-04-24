<script setup lang="ts">
const searchTerm = ref();
const searchInput = ref<HTMLInputElement>();

const emit = defineEmits<{
  (e: "character", char: string): void;
}>();

function characterSearch(char: string) {
  emit("character", char);
}
</script>

<template>
  <input
    type="text"
    v-model.trim="searchTerm"
    ref="searchInput"
    placeholder="Character's name"
    @change="characterSearch(char)"
  />
</template>

<style lang="scss"></style>
