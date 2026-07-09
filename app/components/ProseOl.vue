<template>
  <ol class="content-ol">
    <slot />
  </ol>
</template>

<style lang="scss" scoped>
.content-ol {
  font-size: $main-size;
  line-height: 140%;
  color: white;
  text-shadow: 1px 1px black;
  margin: 0;
  padding: 0;
  @media screen and (max-width: 780px) {
    padding: 0 0.5rem;
  }
}
</style>
