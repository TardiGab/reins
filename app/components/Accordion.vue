<script setup lang="ts">
import { ref } from "vue";
import gsap from "gsap";

defineProps({
  title: String,
  unlockedAmount: Number,
  amount: Number,
});

const isOpen = ref(true);

declare global {
  interface Window {
    $WowheadPower: any;
  }
}

onMounted(() => {
  if (window.$WowheadPower) {
    window.$WowheadPower.refreshLinks();
  }
});

// interface ExpansionsWrappers {
//   wrapperHeight: number;
// }

// const expansionsWrapper = document.querySelectorAll(".expansion__wrapper");

// let expansionsWrapperSizes: ExpansionsWrappers[] = [];

// expansionsWrapper.forEach((item) => {
//   let rect = item.getBoundingClientRect();

//   expansionsWrapperSizes.push({
//     wrapperHeight: rect.height,
//   });

//   item.style.height = `${rect.height}px`;
//   // if (!isOpen) {
//   //   gsap.to(item, {
//   //     height: 0,
//   //     ease: "power1.inOut",
//   //   });
//   // } else {
//   //   gsap.to(item, {
//   //     height: rect.height,
//   //     ease: "power1.inOut",
//   //   });
//   // }

//   // console.log(expansionsWrapperSizes);
// });
</script>

<template>
  <button class="expansion-title" @click="() => (isOpen = !isOpen)">
    <slot name="header">
      <h2 class="expansion-title__name">{{ title }}</h2>
      <div class="expansion-title__completion">
        <span>{{ unlockedAmount }} / {{ amount }}</span>
        <div class="icon" v-if="!isOpen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="#FFD100" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
          </svg>
        </div>
        <div class="icon" v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="#FFD100" d="M19 12.998H5v-2h14z" />
          </svg>
        </div>
      </div>
    </slot>
  </button>
  <div
    class="expansion__wrapper"
    :class="{ 'expansion__wrapper--closed': !isOpen }"
  >
    <Transition>
      <slot />
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.expansion {
  &__wrapper {
    max-height: 10000px;
    // transition: all 0.5s ease-in-out;
    overflow: hidden;
    &--closed {
      max-height: 0px;
    }
  }
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #28221c;
    border: 2px solid $border-container;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin-bottom: 2rem;
    width: 100%;
    cursor: pointer;
    &__name,
    span {
      font-family: "Sentient-Variable";
      color: $dark-gray;
      font-weight: 400;
      text-shadow: 1px 1px 0 #000;
      font-size: $main-size;
      padding: 0;
      margin: 0;
    }
    &__completion {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
    }
  }
}
</style>
