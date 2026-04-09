<script setup lang="ts">
import mountsGlobal from "@/assets/data/mounts.json";
const { data: userMounts } = await useFetch("/api/mounts");

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
</script>

<template>
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
        target="_blank"
      >
        <img
          :src="`https://wow.zamimg.com/images/wow/icons/medium/${randomMountArray[randomResponse].icon?.toLowerCase()}.jpg`"
          class="mount-item__icon"
        />
        <span>{{ randomMountArray[randomResponse].name }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
