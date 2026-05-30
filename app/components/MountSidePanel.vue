<script setup lang="ts">
import { authClient } from "~~/server/lib/auth-client";
const session = authClient.useSession();
</script>

<template>
  <div class="side-wrapper">
    <div class="side-container">
      <div class="side-container--top">
        <PinnedMounts />
        <RandomMount />
      </div>
      <div class="side-container--bottom">
        <p class="side-container__user" v-if="$route.params.character">
          Visiting {{ $route.params.character }}'s stable.
        </p>
        <p class="side-container__user" v-else>
          Welcome to your stable, {{ session.data?.user.name }}.
        </p>
        <LoginButton class="side-container__login" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
li {
  list-style: none;
  padding: 0;
}

.side {
  height: 100%;
  &-wrapper {
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
    background-image: url("/images/body.webp");
    box-shadow:
      inset 0 0 0 2px $border-container,
      inset 0 0 40px 0 #000;
    background-repeat: repeat;
    background-attachment: local;
    overflow: hidden;
    border-radius: 1rem;
    @supports (corner-shape: bevel) {
      corner-shape: bevel;
      border-radius: $corner-shape-m;
    }
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
    }
    &__user {
      font-size: 1rem;
      margin-bottom: 2rem;
    }
    &__login {
      margin-top: 1rem;
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
