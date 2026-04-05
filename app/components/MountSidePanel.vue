<script setup lang="ts">
import { authClient } from "~~/server/lib/auth-client";
const session = authClient.useSession();
const { data: pinnedMounts } = await useFetch("/api/pinned-mounts");
console.log(pinnedMounts.value);

// console.log(pinnedMounts);

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
          <div v-for="mount in pinnedMounts">
            <ul class="pinned-mounts__list">
              <li class="mount-item">
                <a
                  :href="`https://wowhead.com/ptr/mount/${mount.mountId}`"
                  class="mount-item__link"
                >
                  <img
                    :src="`https://wow.zamimg.com/images/wow/icons/medium/${mount.mountIcon?.toLowerCase()}.jpg`"
                    class="mount-item__icon"
                  />
                  <span>{{ mount.mountName }}</span>
                </a>
              </li>
            </ul>
          </div>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 640 640"
            >
              <path
                fill="currentColor"
                d="M512.8 289.6c26.9.2 35.6-7.4 38.9-12.4c12.5-16.3-7.1-47.6-52.8-71.3c17.8-33.6 30.1-63.7 36.3-85.3c3.4-11.8 1.1-19 .5-20.3c-1.7 10.5-15.8 48.5-48.2 100c-25-11.2-56.5-20.1-93.8-23.8c-8.9-16.9-34.9-63.9-60.5-88.9c-16.8-16.5-30.3-22.6-40.8-23.5c-13.8-1.6-22.7 5.8-27.4 11c-17.2 18.5-24.3 48.9-25 84.1c-7.2-12.3-17.2-24.6-28.5-25.9h-.2c-20.7-3.5-38.4 29.2-36 81.3c-38.4 1.4-71 5.8-93 11.2c-9.9 2.4-16.2 7.3-17.8 9.7c1-.4 22.4-9.2 111.6-9.2c5.2 53 29.8 101.8 26 93.2c-9.7 15.4-38.2 62.4-47.3 97.7c-5.9 22.9-4.4 37.6.2 47.1c5.6 12.8 16.4 16.7 23.2 18.3c25 5.7 55.4-3.6 86.7-21.1c-7.5 12.8-13.9 28.5-9.1 39.3c7.3 19.6 44.5 18.7 88.4-9.4c20.2 32.2 40.1 57.9 55.7 74.1c2.6 2.8 5.5 5.2 8.8 7.1c5.1 3.2 8.6 3.4 8.6 3.4c-8.2-6.7-34-38-62.5-91.8c22.2-16 45.7-38.9 67.5-69.3c122.8 4.6 143.3-24.8 148-31.6c14.7-19.9 3.4-57.4-57.3-93.7zM435 395.8c23.8-37.7 30.3-67.8 29.4-92.3c27.9 17.6 47.2 37.6 49.1 58.8c1.1 12.9-8.1 29.1-78.5 33.5m-153.9 55.9c9.8-6.2 19.5-13.1 29.2-20.5c6.7 13.3 13.6 26.1 20.6 38.2c-40.6 21.9-68.8 12.8-49.8-17.7m215-171.3c-10.3-5.3-21.2-10.3-32.4-15c7.9-12.1 15.5-24.4 22.7-36.9c39.1 24.1 45.9 53.2 9.6 51.9zM343.4 462c-5.5-11.4-11-23.5-16.5-36.4c43.2 1.3 62.4-18.7 63.3-20.4c0 .1-25 15.6-62.5 12.2c30.6-25.6 59.1-53.7 85.1-84c8.7-10.2 17-20.6 24.9-31.1c-.4-.3-1.5-3-16.5-12c-51.7 60.3-102.3 98-132.8 115.9c-20.6-11.2-40.8-31.8-55.7-61.5c-20-39.9-30-82.4-31.6-116.1c12.3.9 25.3 2.2 38.8 3.9c-22.3 36.8-14.4 63-13.5 64.2c0-.1-1-29.2 20.1-59.6c9 52.5 24 103.8 44.7 152.8c.9-.4 1.8.9 18.7-8.2c-26.3-74.5-33.8-138.2-34-173.4c20-12.4 48.2-19.8 81.6-17.8c44.6 2.7 86.4 15.2 116.3 30.7c-7.1 10.4-14.9 21.3-23.3 32.5c-20.7-37.7-47.3-43.9-48.9-43.7c.1 0 25.9 14.1 41.5 47.2c-37.5-13.8-76.1-24.4-115.3-31.7c-13.1-2.4-26.2-4.4-39.4-6c-.1.4-1.8 1.8-2.2 20.3c77.9 14.5 136.6 39.9 167.2 57.2c.7 23.6-7 51.6-25.4 79.6c-24.6 37.3-56.4 67.2-84.8 85.4zm27.4-287c-44.6-1.7-73.6 7.4-94.7 20.7c2-52.3 21.3-76.4 38.2-75.3c16.9-4.2 54.9 52.2 56.5 54.6m-130.7 3.1c.5 12.1 1.6 24.6 3.2 37.3c-14.6-.9-28.7-1.3-42.4-1.3c-.1 3.2-.1-51 24.7-49.6h.1c5.8 1.1 10.6 6.9 14.4 13.6m-28.1 162c20.8 39.7 43.3 60.6 65.3 72.3c-46.8 24.8-77.5 20-84.9 4.5c-.2-.2-11.1-15.3 19.7-76.8z"
              />
            </svg>
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
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  &:hover {
    box-shadow: 0 0 0 2px $blizzard-blue-border inset;
  }
  &:active {
    filter: brightness(80%);
  }
}

.mount-item {
  filter: grayscale(100%);
  font-family: "Sentient-Variable";
  font-size: $small;
  transition: all 0.3s;
  padding: 0.5rem;
  box-sizing: border-box;
  span {
    text-shadow: 1px 1px 0 #000;
  }
  &:hover {
    filter: grayscale(0%);
    background-color: #28221c;
    border-radius: 0.5rem;
    box-shadow: inset 0px 0px 0px 2px $border-container;
  }
  &__owned {
    filter: grayscale(0%);
    .mount-item__link {
      color: white;
    }
  }
  &__link {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    color: #595959;
  }
  &__icon {
    position: relative;
    border-radius: 0.25rem;
    border: $border-container solid 2px;
  }
}
</style>
