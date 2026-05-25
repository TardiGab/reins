<script setup lang="ts">
import mountsGlobal from "@/assets/data/mounts.json";
import { authClient } from "~~/server/lib/auth-client";
const { data: userMounts } = await useFetch("/api/mounts");

const session = authClient.useSession();

const userMountsIds = userMounts.value?.map((item: any) => {
  return item.mount.id;
});

const randomMountArray: any = [];

if (session.value.data?.session) {
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
}

let randomMountArrayLength = randomMountArray.length;

function getRandomInInclusive(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.ceil(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

const randomResponse = ref(0);

onMounted(() => {
  randomResponse.value = getRandomInInclusive(0, randomMountArrayLength);
  if (window.$WowheadPower) {
    window.$WowheadPower.refreshLinks();
  }
});

function getRandomMount() {
  randomResponse.value = getRandomInInclusive(0, randomMountArrayLength);
  window.$WowheadPower.refreshLinks();
}

async function pinMount(
  mountName: string,
  mountId: number,
  mountIcon: string,
  userId: string | undefined,
) {
  await $fetch("/api/pin-mount", {
    method: "POST",
    body: {
      mountName: mountName,
      mountId: mountId,
      mountIcon: mountIcon,
      userId: userId,
    },
  });
  await refreshNuxtData("pinned-mounts");
  window.$WowheadPower.refreshLinks();
}
</script>

<template>
  <div class="random-mount">
    <div class="random-mount__heading">
      <h2 class="random-mount__h2">Random mount</h2>
      <button
        class="random-mount__btn"
        @click="getRandomMount"
        :disabled="!session.data?.session"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 20 20"
        >
          <path
            fill="#FFD100"
            d="M15.854 4.146a.5.5 0 0 0-.708.708l1.15 1.148c-3.323.073-5.283 1.902-7.105 3.603l-.032.03C7.277 11.39 5.533 13 2.5 13a.5.5 0 0 0 0 1c3.447 0 5.45-1.87 7.31-3.605l.031-.03c1.838-1.715 3.545-3.29 6.45-3.362l-1.145 1.144a.5.5 0 0 0 .708.707l2-2a.5.5 0 0 0 0-.708zM2.5 6c2.81 0 4.661 1.243 6.256 2.642l-.28.261q-.23.218-.457.425C6.517 8.023 4.92 7 2.5 7a.5.5 0 0 1 0-1m13.795 7.998c-2.696-.059-4.495-1.275-6.051-2.64l.28-.261q.23-.218.457-.425c1.458 1.267 3.008 2.268 5.31 2.325l-1.145-1.143a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.707z"
            stroke-width="0.5"
            stroke="#FFD100"
          />
        </svg>
      </button>
    </div>
    <div class="mount-item" v-if="session.data?.session">
      <a
        :href="`https://wowhead.com/ptr/mount/${randomMountArray[randomResponse].ID}`"
        class="mount-item__link"
        target="_blank"
      >
        <img
          :src="`https://wow.zamimg.com/images/wow/icons/medium/${randomMountArray[randomResponse].icon?.toLowerCase()}.jpg`"
          class="mount-item__icon"
        />
        <span>{{ randomMountArray[randomResponse].name }}</span>
      </a>
      <button
        @click="
          pinMount(
            randomMountArray[randomResponse].name,
            randomMountArray[randomResponse].ID,
            randomMountArray[randomResponse].icon,
            session.data?.user.id,
          )
        "
        class="mount-item__pin-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            fill="#FFD100"
            d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479c-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354"
          />
        </svg>
      </button>
    </div>
    <div v-else class="random-mount--message">
      <span>Please log in to get a random mount suggestion</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.random-mount {
  font-size: $main-size;
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
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      filter: brightness(80%);
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      &:hover {
        filter: none;
      }
    }
  }
  &__h2 {
    color: $yellow;
    font-size: $main-size;
    margin: 0;
    font-weight: 400;
  }
  &--message {
    margin-bottom: 2rem;
    font-size: 1rem;
  }
}
</style>
