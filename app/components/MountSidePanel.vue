<script setup lang="ts">
import PinnedMounts from "./PinnedMounts.vue";
import RandomMount from "./RandomMount.vue";
</script>

<template>
  <div class="side-wrapper">
    <div class="side-container">
      <div class="side-container--top">
        <PinnedMounts />
        <RandomMount />
      </div>
      <div class="side-container--bottom">
        <LoginButton />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
a {
  text-decoration: none;
}

li {
  list-style: none;
  padding: 0;
}

ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0;
}

.side {
  height: 100%;
  &-wrapper {
    border-radius: 1rem;
    border: 2px solid $border-container;
    overflow: hidden;
    width: 20%;
    min-width: 320px;
    position: relative;
  }
  &-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100% - 4rem);
    justify-content: space-between;
    padding: 2rem;
    background-color: #1a1512;
    background-image: url("/images/wooden-background-2.webp");
    box-shadow: 0 0 40px 0 #000 inset;
    background-repeat: repeat;
    background-attachment: local;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      background-color: transparent;
      width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: white;
      border-radius: 32px;
    }
    &--top {
      width: 100%;
    }
    &--bottom {
      width: 100%;
      position: relative;
      &::before {
        content: "";
        display: block;
        width: 100%;
        position: absolute;
        top: -1rem;
        height: 1px;
        background-color: $yellow;
      }
    }
  }
}
</style>
