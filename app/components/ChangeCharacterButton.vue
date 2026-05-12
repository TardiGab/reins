<script lang="ts" setup>
const props = defineProps<{
  label: string;
}>();
</script>

<template>
  <button>
    <!-- <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="#FFD100"
        d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"
      />
    </svg> -->
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
