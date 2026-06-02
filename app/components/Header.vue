<script setup lang="ts">
const mobileNav = ref<boolean>(false);

const emit = defineEmits<{
  "nav-opened": [boolean];
}>();
</script>

<template>
  <header class="header">
    <!-- <form action="" method="post" class="search">
      <input type="text" placeholder="Search mount" class="search__input" />
    </form> -->
    <nav class="nav">
      <div class="nav--left">
        <NuxtLink to="/" class="nav__logo">
          <h1>Reins</h1>
        </NuxtLink>
      </div>
      <div class="nav--right">
        <NuxtLink to="/compare" class="nav__link">
          <span class="nav__link--label nav__label">Compare with a friend</span>
        </NuxtLink>
      </div>
      <button
        @click="
          mobileNav = !mobileNav;
          emit('nav-opened', mobileNav);
        "
        class="burger-btn"
        :class="[{ ['burger']: !mobileNav }, { ['cross']: mobileNav }]"
        aria-label="Burger menu"
      >
        <i></i>
        <i></i>
        <i></i>
      </button>
    </nav>
    <Transition name="slide">
      <nav class="nav-mobile" v-if="mobileNav">
        <NuxtLink
          to="/mobile/pinned"
          class="nav__link nav__link--gray"
          @click="
            mobileNav = !mobileNav;
            emit('nav-opened', mobileNav);
          "
        >
          <span class="nav__label">Pinned mounts & Random mount</span>
        </NuxtLink>
        <NuxtLink
          to="/compare"
          class="nav__link"
          @click="
            mobileNav = !mobileNav;
            emit('nav-opened', mobileNav);
          "
        >
          <span class="nav__label">Compare with a friend</span>
        </NuxtLink>
      </nav>
    </Transition>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 1rem;
  z-index: 1000;
  background-color: transparent;
}

.nav {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: $container-bg;
  box-shadow:
    inset 0 0 0 2px $border-container,
    inset 0 0 0 3px black;
  padding: 0.5rem;
  padding-left: 1rem;
  border-radius: 1rem;
  width: calc(100% - 1.5rem);
  margin-bottom: 1rem;
  @supports (corner-shape: bevel) {
    corner-shape: bevel;
    border-radius: $corner-shape-m;
  }
  &__logo {
    color: white;
    font-size: 1rem;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    transition: opacity 0.3s ease;
    h1 {
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      &::before {
        content: "";
        height: 1em;
        width: 1em;
        background-image: url("/images/logo.svg");
        background-size: contain;
        background-repeat: no-repeat;
        display: inline-block;
      }
    }
    img {
      height: 2em;
      width: 2em;
    }
    &:hover {
      opacity: 0.8;
    }
  }
  &--right {
    position: relative;
    @media screen and (max-width: 780px) {
      display: none;
    }
    &::before {
      content: "";
      display: block;
      position: absolute;
      left: -0.5rem;
      top: 50%;
      transform: translateY(-50%);
      height: 80%;
      width: 1px;
      background-color: $yellow;
    }
  }

  &--burger {
    @media screen and (min-width: 781px) {
      display: none;
    }
  }

  &__pinned {
    position: absolute;
    width: 90%;
    height: 90%;
    top: 0;
    left: 0;
    margin: auto;
    z-index: 1000;
  }

  &__link {
    color: $yellow;
    padding: 0.5rem 2rem;
    background-image: url("/images/body.webp");
    background-color: $red;
    background-blend-mode: luminosity;
    border: solid 2px #2d0000;
    font-size: $small;
    transition: all 0.3s ease;
    text-decoration: none;
    position: relative;
    display: block;
    overflow: hidden;
    @include border-radius(0.5rem, true);

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #ff0400;
      background: radial-gradient(rgba(182, 3, 0, 0.7), rgba(0, 0, 0, 0));
      opacity: 0;
      z-index: 0;
      transition: all 0.3s ease;
    }
    &:hover {
      &::after {
        opacity: 1;
      }
    }
    &--gray {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 2rem;
      background-image: url("/images/body.webp");
      background-color: #5f5f5f;
      background-blend-mode: difference;
      border: solid 2px #121212;
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: all 0.3s ease;
      text-decoration: none;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      text-align: center;
      color: white !important;
      margin-bottom: 1rem;
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
    }
  }
  &__label {
    position: relative;
    display: inline-block;
    width: 100%;
    text-align: center;
    z-index: 1;
    font-size: 1rem;
  }
}

.nav-mobile {
  position: absolute;
  z-index: 10000;
  box-shadow:
    inset 0 0 0 2px $border-container,
    inset 0 0 0 3px black;
  background-color: $container-bg;
  padding: 1rem;
  width: calc(100% - 2rem);
  height: 80dvh;
  margin-bottom: 1rem;
  @include border-radius(1rem, true);
  overflow: hidden;
}

.burger-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 1rem;
  height: 0.5rem;
  position: relative;
  @media screen and (min-width: 781px) {
    display: none;
  }
  i {
    transition: all 0.3s ease;
    width: 1.5rem;
    height: 2px;
    background-color: white;
    position: absolute;
    &:first-child {
      top: 8px;
      left: 0;
    }
    &:nth-child(2) {
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
    &:last-child {
      bottom: 8px;
      left: 0;
      margin: 0;
    }
  }
  &.cross {
    transition: all 0.3s ease;
    height: 100%;
    i {
      &:first-child {
        margin: 0;
        transform: translate(0, 7px) rotate(-45deg);
        transform-origin: center;
      }
      &:nth-child(2) {
        margin: 0;
        opacity: 0;
      }
      &:last-child {
        transform-origin: center;
        transform: translate(0, -7px) rotate(45deg);
      }
    }
  }
}

.search {
  position: relative;
  &__input {
    background-color: #191612;
    border: 1px solid $border-container;
    color: $dark-gray;
    font-size: $small;
    border-radius: 0.5rem;
    padding: 0.5rem;
    padding-left: 2rem;
  }
  &::before {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    vertical-align: -0.125em;
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cpath fill='%23808080' d='m229.66 218.34l-50.07-50.06a88.11 88.11 0 1 0-11.31 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32M40 112a72 72 0 1 1 72 72a72.08 72.08 0 0 1-72-72'/%3E%3C/svg%3E");
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
  }
  &:active {
    border-color: $yellow;
  }
  &:focus-visible {
    border-color: $yellow;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(120%);
}
</style>
