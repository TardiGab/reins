<script setup lang="ts">
import { authClient } from "~~/server/lib/auth-client";

interface PinnedMounts {
  id: number;
  mountName: string;
  mountId: number;
  mountIcon: string;
  userId: string;
}

const { data: pinnedMounts } = await useFetch<PinnedMounts[]>(
  "/api/pinned-mounts",
  {
    key: "pinned-mounts",
  },
);
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

onMounted(() => {
  setTimeout(() => {});
  if (window.$WowheadPower) {
    window.$WowheadPower.refreshLinks();
  }
});
</script>

<template>
  <div class="pinned-mounts">
    <h2 class="pinned-mounts__h2">Pinned mounts</h2>
    <div v-if="session.data?.user.id">
      <div v-if="pinnedMounts?.length === 0" class="pinned-mounts--message">
        <span>You don't have any mounts pinned</span>
      </div>
      <ul class="pinned-mounts__list" v-else>
        <li v-for="mount in pinnedMounts">
          <div
            v-if="session.data?.user.id === mount.userId"
            class="mount-item q4"
          >
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
    </div>
    <div v-else class="pinned-mounts--message">
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
  &--message {
    margin-bottom: 2rem;
  }
  &__list {
    padding: 0;
    margin: 0;
    margin-bottom: 2rem;
    list-style-type: none;
    li {
      margin-bottom: 1rem;
    }
    li:empty {
      display: none;
    }
  }
}
</style>
