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

const isOpen = ref(false);

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

onMounted(() => {
  if (window.$WowheadPower) {
    window.$WowheadPower.refreshLinks();
  }
});
</script>

<template>
  <div
    class="expansion__accordion"
    @click="openAccordion"
    @keypress.enter="openAccordion"
    :aria-expanded="isOpen"
    :aria-controls="`expansion-${title?.toLocaleLowerCase().replace(/\s/g, '-')}`"
    role="button"
    tabindex="0"
  >
    <slot name="header">
      <div class="expansion-title">
        <h2 class="expansion-title__name">{{ title }}</h2>
        <div class="expansion-title__completion">
          <!-- Calcul en premier pour s'assurer qu'il n'y ait pas de div vide, au niveau du span cela créée une div vide si la condition n'est pas remplie -->
          <div
            v-if="comparedDiff! - baseDiff! !== 0"
            :class="[
              { 'positive-diff': comparedDiff! > baseDiff! },
              'negative-diff',
            ]"
          >
            <!-- On vérifie la présence de ces valeurs pour éviter NaN sur la vue de gauche -->
            <span v-if="comparedDiff || baseDiff">
              {{ comparedDiff! - baseDiff! }}
            </span>
          </div>
          <span>{{ unlockedAmount }}&nbsp;/&nbsp;{{ amount }}</span>
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
      </div>
      <div
        class="expansion-accordion__bar"
        :style="`width: ${100 - ((props.amount! - props.unlockedAmount!) / props.amount!) * 100}%`"
      ></div>
    </slot>
  </div>
  <div
    class="expansion__wrapper"
    :id="`expansion-${title?.toLocaleLowerCase().replace(/\s/g, '-')}`"
    v-if="isOpen"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.expansion {
  &__wrapper {
    overflow: hidden;
  }
  &__accordion {
    position: relative;
    background-color: hsl(23, 18%, 12%);
    @include container-border();
    padding: 0.5rem 1rem;
    margin-bottom: 2rem;
    width: calc(100% - 2rem);
    cursor: pointer;
    transition: all 0.3s ease;
    color: $dark-gray;
    @include border-radius(0.5rem, true);
    overflow: hidden;
    @supports (corner-shape: bevel) {
      border-radius: $corner-shape-s;
    }
    @media screen and (max-width: 780px) {
      padding: 0.5rem;
      width: calc(100% - 1rem);
      margin-bottom: 1rem;
    }
    &:hover {
      color: $light-gray;
      background-color: hsl(23, 18%, 16%);
    }
    &:active {
      transform: translate(2px, 2px);
    }
    &__bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background-color: $yellow;
      z-index: 1;
    }
  }

  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__name,
    span {
      font-weight: 400;
      text-shadow: 1px 1px 0 #000;
      font-size: $main-size;
      padding: 0;
      margin: 0;
      text-align: left;
    }
    &__bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background-color: $yellow;
      z-index: 1;
    }
    &__completion {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
      @media screen and (max-width: 780px) {
        gap: 0.5rem;
      }
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
  &:empty {
    display: none;
  }
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
