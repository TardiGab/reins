<script lang="ts" setup>
import { useRoute } from "#app";

const route = useRoute();

interface Profile {
  name: string;
  level: number;
  race: {
    name: string;
  };
  realm: {
    name: string;
  };
  character_class: {
    name: string;
  };
  active_spec: {
    name: string;
  };
  active_title: {
    name: string;
    display_string?: string;
  };
}

const props = defineProps<{
  region?: string;
  profile?: Profile;
  totalOwnedNumber?: number;
  useableNumber?: number;
}>();

let left = ref(false);
let right = ref(false);
let comma = ref(false);

if (props.profile) {
  console.log(props.profile);
}
if (
  props.profile?.active_title.display_string ===
  `{name} ${props.profile?.active_title.name}`
) {
  right.value = true;
} else if (
  props.profile?.active_title.display_string ===
  `{name}, ${props.profile?.active_title.name}`
) {
  comma.value = true;
} else if (
  props.profile?.active_title.display_string ===
  `${props.profile?.active_title.name} {name}`
) {
  left.value = true;
}
</script>

<template>
  <div class="tooltip container" v-if="profile">
    <div class="tooltip__header">
      <h2 class="tooltip__h2" v-if="left">
        {{ profile.active_title.name }} {{ profile.name }}
      </h2>
      <h2 class="tooltip__h2" v-if="right">
        {{ profile.name }} {{ profile.active_title.name }}
      </h2>
      <h2 class="tooltip__h2" v-if="comma">
        {{ profile.name }}, {{ profile.active_title.name }}
      </h2>
      <div class="tooltip__char-specs">
        <span class="spec">
          Lvl {{ profile.level }} – {{ profile.race.name }} –
          {{ profile.active_spec.name }} {{ profile.character_class.name }} –
          {{ region?.toLocaleUpperCase() }} &nbsp; {{ profile.realm.name }}
        </span>
      </div>
    </div>
    <div class="tooltip__stats">
      <span class="stats">Total mounts: {{ totalOwnedNumber }}</span>
      <span class="stats">Useable mounts: {{ useableNumber }}</span>
    </div>
    <div class="tooltip__achievement">
      <h3 class="tooltip__h3">Next mounts achievement:</h3>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tooltip {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 1000;
  border-radius: 1rem;
  border: 2px solid $border-container;
  width: 30vw;
  @supports (corner-shape: bevel) {
    corner-shape: bevel;
    border-radius: $corner-shape-m;
  }
  &__header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  &__h2,
  &__h3 {
    margin: 0;
  }
  &__h2 {
    color: $epic-purple;
    font-size: $main-size;
  }
  &__h3 {
    font-size: $main-size;
  }
  &__stats {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: $heirloom-blue;
  }
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 0;
    margin: 0;
  }
}
</style>
