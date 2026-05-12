<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  title?: string;
  unlockedAmount?: number;
  amount?: number;
  baseDiff?: number;
  comparedDiff?: number;
  open: boolean;
}>();

let isOpen = ref(false);

if (props.open) {
  isOpen.value = true;
}

function openAccordion() {
  isOpen.value = !isOpen.value;
  // Les liens ne se refresh pas instantanément, il faut attendre un peu visiblement
  setTimeout(() => {
    window.$WowheadPower.refreshLinks();
  }, 10);
}

const negativeDiff = ref("negative-diff");
const positive = ref(false);

watch(
  () => props.comparedDiff || props.baseDiff,
  () => {
    if (props.comparedDiff) {
      if (props.comparedDiff! > props.baseDiff!) {
        positive.value = true;
      }
    }
  },
);

onMounted(() => {
  if (window.$WowheadPower) {
    window.$WowheadPower.refreshLinks();
  }
  if (props.comparedDiff) {
    if (props.comparedDiff! > props.baseDiff!) {
      positive.value = true;
    }
  }
});
</script>

<template>
  <button class="expansion-title" @click="openAccordion">
    <slot name="header">
      <h2 class="expansion-title__name">{{ title }}</h2>
      <div class="expansion-title__completion">
        <span
          v-if="
            (comparedDiff && baseDiff && comparedDiff! > baseDiff!) ||
            comparedDiff! < baseDiff!
          "
          :class="[{ 'positive-diff': positive }, negativeDiff]"
        >
          {{ comparedDiff! - baseDiff! }}
        </span>
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
  <div class="expansion__wrapper" v-if="isOpen">
    <Transition>
      <slot />
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.expansion {
  &__wrapper {
    overflow: hidden;
  }
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #28221c;
    border: 2px solid $border-container;
    box-shadow: inset 0 0 0 1px black;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin-bottom: 2rem;
    width: 100%;
    cursor: pointer;
    transition: all 0.3s ease;
    color: $dark-gray;
    @supports (corner-shape: bevel) {
      corner-shape: bevel;
      border-radius: $corner-shape-s;
    }
    &:hover {
      color: $light-gray;
      background-color: hsl(27, 16%, 16%);
    }
    &:active {
      transform: translate(2px, 2px);
    }
    &__name,
    span {
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
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.negative-diff {
  color: $bright-red;
}

.positive-diff {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.125rem;
  color: $bright-green;
  &::before {
    content: "+";
    line-height: 1;
  }
}
</style>
