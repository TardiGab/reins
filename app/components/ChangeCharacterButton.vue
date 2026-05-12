<script lang="ts" setup>
const props = defineProps<{
  label: string;
}>();
</script>

<template>
  <button>
    <span>
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<style scoped lang="scss">
span {
  color: $yellow;
}
</style>
