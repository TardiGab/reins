<script lang="ts" setup>
const props = defineProps<{
  label: string;
}>();
</script>

<template>
  <button class="change-character">
    <span>
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<style scoped lang="scss">
.change-character {
  color: $yellow;
  padding: 0.5rem 2rem;
  background-image: url("/images/body.webp");
  background-color: #5f5f5f;
  background-blend-mode: difference;
  border: solid 2px #121212;
  border-radius: 0.5rem;
  font-size: $small;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  display: block;
  overflow: hidden;
  cursor: pointer;
  @supports (corner-shape: bevel) {
    corner-shape: bevel;
    border-radius: 0.25rem;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(rgba(131, 145, 172, 0.5), rgba(0, 0, 0, 0));
    opacity: 0;
    z-index: 0;
    transition: all 0.3s ease;
  }
  &:hover {
    &::after {
      opacity: 1;
    }
  }
  span {
    z-index: 1;
    position: relative;
    color: white;
    text-shadow: 1px 1px black;
  }
}
</style>
