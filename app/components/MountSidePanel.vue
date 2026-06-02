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
        <div class="visiting">
          <div class="visiting__guest" v-if="$route.params.character">
            <p class="visiting__p" v-if="$route.params.character">
              Visiting {{ $route.params.character }}'s stable.
            </p>
            <NuxtLink to="/" class="visiting__link">
              <span class="visiting__link-text">Change character</span>
            </NuxtLink>
          </div>
          <p class="visiting__p" v-else>
            Welcome to your stable, {{ session.data?.user.name }}.
          </p>
        </div>
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
      line-height: 1.4;
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

.visiting {
  padding: 1rem 0;
  &__link {
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
    &-text {
      position: relative;
      z-index: 1;
    }
  }
  &__p {
    font-size: 1rem;
    line-height: 1.4;
    margin: 0;
  }
}
</style>
