<script lang="ts" setup>
import achievements from "@/assets/data/mounts-achievements.json";
import { random } from "#imports";

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
  reward?: {
    name: string;
    icon: string;
    id: number;
  };
}

const props = defineProps<{
  faction: string;
  useable: number;
}>();

const nextArray = ref<Achievements[]>([]);
const achievement = ref<Achievements>();
const lie = ref<number>();

achievements.forEach((item) => {
  if (item.side === props.faction || "Both") {
    if (props.useable < item.requirement) {
      nextArray.value.push(item);
    } else if (props.useable > item.requirement) {
      lie.value = random(1, 100);
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
  <div class="achievement" v-if="achievement">
    <h3 class="achievement__h3">Next mounts achievement:</h3>
    <a
      class="achievement__link"
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
        data-disable-wowhead-tooltip="true"
      >
        <img
          :src="`https://wow.zamimg.com/images/wow/icons/medium/${achievement.reward.icon.toLowerCase()}.jpg`"
          class="mount-item__icon"
        />
        <span>{{ achievement?.reward.name }}</span>
      </a>
    </div>
  </div>
  <div class="achievement" v-else>
    <div class="achievement__link lie" v-if="lie === 1">
      <img
        :src="`https://wow.zamimg.com/images/wow/icons/large/inv_misc_celebrationcake_01.jpg`"
        alt="Achievement icon"
        class="achievement__icon"
      />
      <div class="achievement__content">
        <span class="achievement__name">The Mount is A Lie</span>
        <span class="achievement__desc">So GLaD I didn't fell for it.</span>
      </div>
    </div>
    <span v-else>
      This Champion went above and beyond and got all of the mounts related
      achievements. Gratz!
    </span>
  </div>
</template>

<style lang="scss" scoped>
.achievement {
  &__link {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    color: white;
    transition: filter 0.3s ease;
    margin-bottom: 1.5rem;
    &.lie {
      margin-bottom: 0;
    }
    &:hover {
      filter: brightness(80%);
    }
  }

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

  &__h3 {
    margin: 0;
    font-size: $main-size;
    font-weight: 600;
    margin-bottom: 1rem;
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
    color: #a335ee;
    &:hover {
      filter: brightness(80%);
    }
  }
}
</style>
