<script setup lang="ts">
import { computed, useRuntimeConfig } from "#imports";

const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(
  () =>
    props.id &&
    ((typeof headings?.anchorLinks === "boolean" &&
      headings?.anchorLinks === true) ||
      (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h4)),
);
</script>

<template>
  <h6 :id="props.id" class="content-h6">
    <a v-if="props.id && generate" :href="`#${props.id}`">
      <slot />
    </a>
    <slot v-else />
  </h6>
</template>

<style lang="scss" scoped>
.content-h6 {
  margin: 0;
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-shadow: 1px 1px black;
  font-weight: 600;
  color: white;
  a {
    margin: 0;
    margin-top: 2rem;
    margin-bottom: 1rem;
    text-shadow: 1px 1px black;
    font-weight: 600;
    color: white;
    transition: all 0.3s ease;
    position: relative;
    &::before {
      content: "#";
      opacity: 0;
      color: $yellow;
      position: absolute;
      left: -1em;
      transition: opacity 0.3s ease;
    }
    &:hover::before {
      opacity: 1;
    }
  }
}
</style>
