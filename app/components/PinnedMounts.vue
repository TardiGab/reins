<script setup lang="ts">
import { authClient } from "~~/server/lib/auth-client";
const { data: pinnedMounts } = await useFetch("/api/pinned-mounts", {
  key: "pinned-mounts",
});
const session = authClient.useSession();

async function unpinMount(id: number) {
  await $fetch("/api/unpin-mount", {
    method: "POST",
    body: {
      id: id,
    },
  });
  await refreshNuxtData("pinned-mounts");
}
</script>

<template>
  <div class="pinned-mounts">
    <h2 class="pinned-mounts__h2">Pinned mounts</h2>
    <ul class="pinned-mounts__list" v-if="session.data?.user.id">
      <li v-for="mount in pinnedMounts">
        <div v-if="session.data?.user.id === mount.userId" class="mount-item">
          <a
            :href="`https://wowhead.com/ptr/mount/${mount.mountId}`"
            class="mount-item__link"
          >
            <img
              :src="`https://wow.zamimg.com/images/wow/icons/medium/${mount.mountIcon.toLowerCase()}.jpg`"
              class="mount-item__icon"
            />
            <span>{{ mount.mountName }}</span>
          </a>
          <button class="mount-item__pin-btn" @click="unpinMount(mount.id)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#FFD100"
                d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
              />
            </svg>
          </button>
        </div>
      </li>
    </ul>
    <div v-else class="pinned-mounts--not-logged">
      <span>Please login to start pinning mounts</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pinned-mounts {
  &__h2 {
    color: $yellow;
    font-size: $main-size;
    margin: 0;
    margin-bottom: 1rem;
    font-weight: 400;
  }
  &--not-logged {
    margin-bottom: 1rem;
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
  &__pin-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 3rem;
    border: 2px solid $yellow;
    background-color: $dark-brown;
    position: absolute;
    top: -5px;
    left: -5px;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0;
    &:active {
      filter: brightness(80%);
    }
  }
  &:hover {
    filter: grayscale(0%);
    background-color: #28221c;
    border-radius: 0.5rem;
    box-shadow: inset 0px 0px 0px 2px $border-container;
    .mount-item__pin-btn {
      opacity: 100%;
    }
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
