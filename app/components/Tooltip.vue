<script lang="ts" setup>
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

let classColor = ref(
  props.profile?.character_class.name.replace(/\s+/g, "").toLocaleLowerCase(),
);
</script>

<template>
  <div class="tooltip container" v-if="profile">
    <div class="tooltip__header">
      <h2 class="tooltip__h2" :class="[classColor]" v-if="left">
        {{ profile.active_title.name }} {{ profile.name }}
      </h2>
      <h2 class="tooltip__h2" :class="[classColor]" v-if="right">
        {{ profile.name }} {{ profile.active_title.name }}
      </h2>
      <h2 class="tooltip__h2" :class="[classColor]" v-if="comma">
        {{ profile.name }}, {{ profile.active_title.name }}
      </h2>
      <div class="tooltip__char-specs">
        <span class="spec">
          Lvl {{ profile.level }} – {{ profile.race.name }} –
          {{ profile.active_spec.name }} {{ profile.character_class.name }} –
          {{ region?.toLocaleUpperCase() }}&nbsp;{{ profile.realm.name }}
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
  overflow: hidden;
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
    font-size: $main-size;
    font-weight: 800;
  }
  &__h3 {
    font-size: $main-size;
    font-weight: 600;
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

// Classes color from https://wowpedia.fandom.com/wiki/Class_colors

.deathknight {
  color: #c41e3a;
}
.demonhunter {
  color: #a330c9;
}
.druid {
  color: #ff7c0a;
}
.evoker {
  color: #33937f;
}
.hunter {
  color: #aad372;
}
.mage {
  color: #3fc7eb;
}
.monk {
  color: #00ff98;
}
.paladin {
  color: #f48cba;
}
.priest {
  color: #ffffff;
}
.rogue {
  color: #fff468;
}
.shaman {
  color: #0070dd;
}
.warlock {
  color: #8788ee;
}
.warrior {
  color: #c69b6d;
}
</style>
