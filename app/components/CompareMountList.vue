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
  baseDiff?: number;
  comparedDiff?: number;
}>();

const emit = defineEmits(["unlocked-amount-O", "unlocked-amount"]);

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
</script>

<template>
  <div class="mounts-wrapper">
    <div class="mounts-container">
      <div class="expansion">
        <OpenAccordion
          :title="mountsGlobal[0]?.name"
          :unlocked-amount="categoryOwnedMountsArray[0]?.unlockedAmount"
          :amount="categoryOwnedMountsArray[0]?.amount"
          :compared-diff="props.openComparedDiff"
          :base-diff="props.openBaseDiff"
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
                  <a
                    :href="`https://wowhead.com/ptr-2/mount/${mount.ID}`"
                    target="_blank"
                    class="mount-item__link"
                  >
                    <img
                      :src="`https://wow.zamimg.com/images/wow/icons/medium/${mount.icon?.toLowerCase()}.jpg`"
                      class="mount-item__icon"
                    />
                    <span>{{ mount.name }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </OpenAccordion>
        <div
          v-for="(expansion, index) in mountsGlobal.slice(1)"
          :key="expansion.name"
          class="expansion"
        >
          <Accordion
            :title="expansion.name"
            :unlocked-amount="
              categoryOwnedMountsArray[index + 1]?.unlockedAmount
            "
            :amount="categoryOwnedMountsArray[index + 1]?.amount"
            :base-diff="props.baseDiff"
            :compared-diff="props.comparedDiff"
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
                    <a
                      :href="`https://wowhead.com/ptr-2/mount/${mount.ID}`"
                      target="_blank"
                      class="mount-item__link"
                    >
                      <img
                        :src="`https://wow.zamimg.com/images/wow/icons/medium/${mount.icon?.toLowerCase()}.jpg`"
                        class="mount-item__icon"
                      />
                      <span>{{ mount.name }}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mounts-wrapper {
  width: calc(50vw - 2rem);
  height: 80vh;
}
</style>
