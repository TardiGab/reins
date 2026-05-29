<script setup lang="ts">
import mountsGlobal from "@/assets/data/mounts.json";

interface Mount {
  mount: {
    key: { href: string };
    name: string;
    id: number;
  };
}

const props = defineProps<{
  openBaseDiff?: number;
  openComparedDiff?: number;
  baseDiff?: number[];
  comparedDiff?: number[];
  amount?: number;
  unlockedAmount?: number;
  characterMounts: Mount[];
}>();

const userMountsIds = props.characterMounts?.map((item: any) => {
  return item.mount.id;
});

const emit = defineEmits(["unlocked-amount-o", "unlocked-amount"]);

interface SubCategoryOwnedMounts {
  subcatName: string;
  amount: number;
  unlockedAmount: number;
}

interface CategoryOwnedMounts {
  categoryName: string;
  subCategories: SubCategoryOwnedMounts[];
  amount: number;
  unlockedAmount: number;
}
const ownedMountArray: number[] = [];
let categoryOwnedMountsArray: CategoryOwnedMounts[] = [];
let numberOfMountsUnlocked = 0;
let totalMountNumber: number = 0;

let unlockedAmountByCat: number[] = [];

mountsGlobal.forEach((item, i) => {
  categoryOwnedMountsArray.push({
    categoryName: item.name,
    subCategories: [],
    amount: 0,
    unlockedAmount: 0,
  });

  item?.subcats?.forEach((subcats, index) => {
    if (categoryOwnedMountsArray[i])
      categoryOwnedMountsArray[i].subCategories[index] = {
        subcatName: subcats.name,
        amount: 0,
        unlockedAmount: 0,
      };

    subcats?.items?.forEach((mount) => {
      // console.log(mount);
      if (categoryOwnedMountsArray[i]?.subCategories[index]) {
        categoryOwnedMountsArray[i].subCategories[index].amount += 1;
        categoryOwnedMountsArray[i].amount += 1;
      }
      totalMountNumber += 1;
      if (userMountsIds?.includes(mount.ID)) {
        ownedMountArray.push(mount.ID);
        numberOfMountsUnlocked = numberOfMountsUnlocked + 1;
        if (
          categoryOwnedMountsArray[i] &&
          categoryOwnedMountsArray[i].subCategories[index]
        ) {
          categoryOwnedMountsArray[i].subCategories[index].unlockedAmount += 1;
          categoryOwnedMountsArray[i].unlockedAmount += 1;
        }
      }
    });
  });
});

categoryOwnedMountsArray.forEach((item) => {
  unlockedAmountByCat.push(item.unlockedAmount);
});

emit("unlocked-amount", unlockedAmountByCat);

const baseDiff = ref(props.baseDiff);
const comparedDiff = ref(props.comparedDiff);

onMounted(() => {
  if (window.$WowheadPower) {
    window.$WowheadPower.refreshLinks();
  }
  baseDiff.value = props.baseDiff;
  comparedDiff.value = props.comparedDiff;
});
</script>

<template>
  <div class="mounts-wrapper">
    <div class="mounts-container">
      <div class="expansion">
        <Accordion
          :title="mountsGlobal[0]?.name"
          :unlocked-amount="categoryOwnedMountsArray[0]?.unlockedAmount"
          :amount="categoryOwnedMountsArray[0]?.amount"
          :base-diff="baseDiff?.[0]"
          :compared-diff="comparedDiff?.[0]"
          :open="true"
        >
          <div class="expansion__container">
            <div
              v-for="subcat in mountsGlobal[0]?.subcats"
              :key="subcat.name"
              class="expansion__subcategories"
            >
              <h3 class="expansion__subcat">{{ subcat.name }}</h3>
              <ul class="expansion__subcat-container">
                <li
                  v-for="mount in subcat.items"
                  :key="mount.ID"
                  class="mount-item"
                  :class="{
                    'mount-item__owned': ownedMountArray.includes(mount.ID),
                  }"
                >
                  <NuxtLink
                    :to="{
                      name: 'mount-guide',
                      params: {
                        guide: mount.name?.replace(/\W+/g, '-').toLowerCase(),
                      },
                    }"
                    target="_blank"
                    class="mount-item__link"
                    :data-wowhead="`item=${mount.itemId}`"
                    data-wowhead-domain="ptr-2"
                  >
                    <img
                      :src="`https://wow.zamimg.com/images/wow/icons/medium/${mount.icon?.toLowerCase()}.jpg`"
                      class="mount-item__icon"
                    />
                    <span>{{ mount.name }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </Accordion>
      </div>
      <div
        v-for="(expansion, index) in mountsGlobal.slice(1)"
        :key="expansion.name"
        class="expansion"
      >
        <Accordion
          :title="expansion.name"
          :unlocked-amount="categoryOwnedMountsArray[index + 1]?.unlockedAmount"
          :amount="categoryOwnedMountsArray[index + 1]?.amount"
          :base-diff="props.baseDiff?.[index + 1]"
          :compared-diff="props.comparedDiff?.[index + 1]"
          :open="false"
        >
          <div class="expansion__container">
            <div
              v-for="subcat in expansion.subcats"
              :key="subcat.name"
              class="expansion__subcategories"
            >
              <h3 class="expansion__subcat">{{ subcat.name }}</h3>
              <ul class="expansion__subcat-container">
                <li
                  v-for="mount in subcat.items"
                  :key="mount.ID"
                  class="mount-item"
                  :class="{
                    'mount-item__owned': ownedMountArray.includes(mount.ID),
                  }"
                >
                  <NuxtLink
                    :to="{
                      name: 'mount-guide',
                      params: {
                        guide: mount.name?.replace(/\W+/g, '-').toLowerCase(),
                      },
                    }"
                    target="_blank"
                    class="mount-item__link"
                    :data-wowhead="`item=${mount.itemId}`"
                    data-wowhead-domain="ptr-2"
                  >
                    <img
                      :src="`https://wow.zamimg.com/images/wow/icons/medium/${mount.icon?.toLowerCase()}.jpg`"
                      class="mount-item__icon"
                    />
                    <span>{{ mount.name }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mounts {
  &-wrapper {
    width: calc(50vw - 2rem);
    max-height: 80vh;
    @media screen and (max-width: 780px) {
      width: 100%;
    }
  }
  &-container {
    max-height: calc(70dvh - 2.5rem);
  }
}
</style>
