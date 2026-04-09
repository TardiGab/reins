<script setup lang="ts">
import { authClient } from "~~/server/lib/auth-client";
const { data: pinnedMounts, refresh } = await useFetch("/api/pinned-mounts");
const session = authClient.useSession();
</script>

<template>
  <div class="pinned-mounts">
    <h2 class="pinned-mounts__h2">Pinned mounts</h2>
    <button @click="() => refresh()">Refresh</button>
    <div v-for="mount in pinnedMounts" v-if="session.data">
      <ul class="pinned-mounts__list">
        <li class="mount-item" v-if="session.data?.user.id === mount.userId">
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
        </li>
      </ul>
    </div>
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
