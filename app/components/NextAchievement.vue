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
  reward: {
    name: string;
    icon: string;
    id: number;
  };
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

onMounted(() => {
  if (window.$WowheadPower) {
    window.$WowheadPower.refreshLinks();
  }
});
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
  <div class="reward" v-if="achievement?.reward">
    <h4 class="reward__h4">Reward:</h4>
    <a
      :href="`https://wowhead.com/ptr-2/mount/${achievement?.reward.id}`"
      class="reward__item"
    >
      <img
        :src="`https://wow.zamimg.com/images/wow/icons/medium/${achievement.reward.icon.toLowerCase()}.jpg`"
        class="mount-item__icon"
      />
      <span>{{ achievement?.reward.name }}</span>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.achievement {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  color: white;
  transition: filter 0.3s ease;
  margin-bottom: 1.5rem;
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
    filter: brightness(80%);
  }
}

.reward {
  &__h4 {
    margin: 0;
    font-size: 1.2rem;
    line-height: 1;
    font-weight: 500;
    margin-bottom: 0.8rem;
  }
  &__item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    transition: filter 0.3s ease;
    &:hover {
      filter: brightness(80%);
    }
  }
}
</style>
