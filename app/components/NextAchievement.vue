<script lang="ts" setup>
import achievements from "@/assets/data/mounts-achievements.json";

interface Achievements {
  id: number;
  name: {
    language: string;
    value: string;
  };
  desc: string;
  requirement: number;
  icon: string;
  side: string;
}

const props = defineProps<{
  faction: string;
  useable: number;
}>();

let nextArray = ref<Achievements[]>([]);
let achievement = ref<Achievements>();

achievements.forEach((item) => {
  if (item.side === props.faction || "Both") {
    if (props.useable < item.requirement) {
      nextArray.value.push(item);
    }
  }
});

achievement.value = nextArray.value[0];
</script>

<template>
  <a
    class="achievement"
    :href="`https://www.wowhead.com/achievement=${achievement?.id}`"
    data-disable-wowhead-tooltip="true"
  >
    <img
      :src="`https://wow.zamimg.com/images/wow/icons/large/${achievement?.icon?.toLowerCase()}.jpg`"
      alt="Achievement icon"
      class="achievement__icon"
    />
    <div class="achievement__content">
      <span class="achievement__name">{{ achievement?.name.value }}</span>
      <span class="achievement__desc">{{ achievement?.desc }}</span>
    </div>
  </a>
</template>

<style lang="scss" scoped>
.achievement {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  color: white;
  transition: filter 0.3s ease;
  &__content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  &__name {
    color: $yellow;
    font-size: 1.2rem;
    font-weight: 500;
  }
  &__desc {
    font-size: 0.8rem;
  }
  &__icon {
    border-radius: 0.25rem;
    border: $border-container solid 2px;
    height: 2.5rem;
    width: 2.5rem;

    @supports (corner-shape: bevel) {
      corner-shape: bevel;
      border-radius: $corner-shape-s;
    }
  }
  &:hover {
    filter: brightness(70%);
  }
}
</style>
