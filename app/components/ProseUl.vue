<template>
  <ul class="content-ul">
    <slot />
  </ul>
</template>

<style lang="scss" scoped>
.content-ul {
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
