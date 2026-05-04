<script setup lang="ts">
import { authClient } from "~~/server/lib/auth-client";
const session = authClient.useSession();
// const { data: userMounts } = await useFetch("/api/mounts", {
//   key: "user-mounts",
// });

// console.log(userMounts.value);

function logout() {
  authClient.signOut();
  setTimeout(() => {
    window.location.reload();
  }, 100);
}

// async function refreshMounts() {
//   await refreshNuxtData("user-mounts");
// }
</script>

<template>
  <header>
    <h1>Reins</h1>
    <div class="header-content">
      <!-- <form action="" method="post" class="search">
        <input type="text" placeholder="Search mount" class="search__input" />
      </form> -->
      <!-- <button @click="refreshMounts()">Refresh user mounts data</button> -->
      <nav class="nav">
        <NuxtLink to="/compare" class="nav__link">Compare mounts</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  border: 2px solid $border-container;
  background-color: $container-bg;
  box-shadow: inset 0 0 0 1px black;
  padding: 0.5rem;
  padding-left: 2rem;
  border-radius: 1rem;
  width: calc(100% - 3rem);
  margin-bottom: 1rem;
}

h1 {
  padding: 0;
  margin: 0;
}

.header-content {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}

.nav {
  position: relative;
  &::before {
    content: "";
    display: block;
    position: absolute;
    left: -0.5rem;
    top: 50%;
    transform: translateY(-50%);
    height: 150%;
    width: 1px;
    background-color: $yellow;
  }
  &__link {
    color: $yellow;
    padding: 0.5rem 2rem;
    background-image: url("/images/body-background-1.webp");
    background-color: $red;
    background-blend-mode: luminosity;
    border: solid 2px #382d2d;
    border-radius: 0.5rem;
    font-size: $small;
    transition: all 0.3s ease;
    @supports (corner-shape: bevel) {
      corner-shape: bevel;
      border-radius: 0.25rem;
    }
    &:hover {
      background-image: url("/images/body-background-1.webp");
      background-color: hsl(1, 100%, 50%);
      background-blend-mode: hard-light;
    }
    &:active {
      transform: scale(0.9);
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
</style>
