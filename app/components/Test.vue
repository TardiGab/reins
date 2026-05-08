<script setup lang="ts">
const props = defineProps({
  test: String,
});

console.log(props.test);
</script>

<template>{{ test }}</template>
