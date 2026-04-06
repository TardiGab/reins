<script setup lang="ts">
import { ref } from "vue";
import mountsGlobal from "@/assets/data/mounts.json";
import { authClient } from "~~/server/lib/auth-client";
const { data: userMounts, error } = await useFetch("/api/mounts");
const session = authClient.useSession();
const { data: pinnedMounts } = await useFetch("/api/pinned-mounts");

const userMountsIds = userMounts.value?.map((item: any) => {
  return item.mount.id;
});

const randomMountArray: any = [];

mountsGlobal.forEach((category) => {
  category.subcats.forEach((subcats) => {
    subcats.items.forEach((mount) => {
      // IMPORTANT ! Mettre le "?" afin de le rendre optionnel et éviter le crash de l'app
      if (!userMountsIds?.includes(mount.ID)) {
        randomMountArray.push(mount);
      }
    });
  });
});

let randomMountArrayLength = randomMountArray.length;

function getRandomInInclusive(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.ceil(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

let randomResponse = ref(getRandomInInclusive(0, randomMountArrayLength));

function getRandomMount() {
  randomResponse.value = getRandomInInclusive(0, randomMountArrayLength);
}

// async function pinMount(mountName, mountId, mountIcon, userId) {
//   await $fetch("/api/pin-mount", {
//     method: "POST",
//     body: mountName, mountId, mountIcon, userId
//   })
// }
</script>

<template>
  <div class="side-wrapper">
    <div class="side-container">
      <div class="side-container--top">
        <div class="pinned-mounts">
          <h2 class="pinned-mounts__h2">Pinned mounts</h2>
          <div v-for="mount in pinnedMounts" v-if="session.data">
            <ul class="pinned-mounts__list">
              <li
                class="mount-item"
                v-if="session.data?.user.id === mount.user"
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
              </li>
            </ul>
          </div>
          <div v-else><span>Please login to start pinning mounts</span></div>
        </div>
        <div class="random-mount">
          <div class="random-mount__heading">
            <h2 class="random-mount__h2">Random mount</h2>
            <button class="random-mount__btn" @click="getRandomMount">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#FFD100"
                  d="M341.3 28.3v85.3H128c-70.7 0-128 57.3-128 128c0 21.5 5.8 41.4 15.2 59.2L68 263.2c-2.4-6.8-4-13.9-4-21.5c0-35.4 28.7-64 64-64h213.3V263L512 156.3V135zM444 262.8c2.4 6.8 4 13.9 4 21.5c0 35.4-28.6 64-64 64H170.7V263L0 369.7V391l170.7 106.7v-85.3H384c70.7 0 128-57.3 128-128c0-21.5-5.8-41.4-15.2-59.2z"
                />
              </svg>
            </button>
          </div>
          <div class="mount-item">
            <a
              :href="`https://wowhead.com/ptr/mount/${randomMountArray[randomResponse].ID}`"
              class="mount-item__link"
            >
              <img
                :src="`https://wow.zamimg.com/images/wow/icons/medium/${randomMountArray[randomResponse].icon?.toLowerCase()}.jpg`"
                class="mount-item__icon"
              />
              <span>{{ randomMountArray[randomResponse].name }}</span>
            </a>
          </div>
        </div>
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
  &__heading {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  &__btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      filter: brightness(80%);
    }
  }
  &__h2 {
    color: $yellow;
    font-size: $main-size;
    margin: 0;
    font-weight: 400;
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
