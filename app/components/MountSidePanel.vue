<script setup lang="ts">
import { authClient } from "~~/server/lib/auth-client";
const session = authClient.useSession();

function logout() {
  authClient.signOut();
  setTimeout(() => {
    window.location.reload();
  }, 100);
}
</script>

<template>
  <div class="side-wrapper">
    <div class="side-container">
      <div class="side-container--top">
        <div class="pinned-mounts">
          <h2 class="pinned-mounts__h2">Pinned mounts</h2>
        </div>
        <div class="random-mount">
          <h2 class="random-mount__h2">Random mount</h2>
        </div>
      </div>
      <div class="side-container--bottom">
        <div v-if="!session?.data">
          <button
            @click="() => authClient.signIn.social({ provider: 'battlenet' })"
            class="login-button"
          >
            Login with Battle.net
          </button>
        </div>
        <div v-if="session.data">
          <p>Hello, {{ session.data?.user.name }}</p>
          <button @click="logout" class="login-button">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.side {
  height: 100%;
  &-wrapper {
    border-radius: 1rem;
    border: 2px solid $border-container;
    overflow: hidden;
    width: 20%;
    position: relative;
  }
  &-container {
    display: flex;
    flex-direction: column;
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
  }
}

.pinned-mounts {
  &__h2 {
    color: $yellow;
    font-size: $main-size;
    margin: 0;
    margin-bottom: 1rem;
    font-weight: 400;
  }
}

.random-mount {
  &__h2 {
    color: $yellow;
    font-size: $main-size;
    margin: 0;
    margin-bottom: 1rem;
    font-weight: 400;
  }
}

.login-button {
  background-color: $blizzard-blue;
  border: none;
  width: 100%;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  padding: 0.5rem 2rem;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 0 2px $blizzard-blue-border inset;
  }
  &:active {
    filter: brightness(80%);
  }
}
</style>
