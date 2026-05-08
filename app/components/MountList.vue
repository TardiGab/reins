<script setup lang="ts">
import mountsGlobal from "@/assets/data/mounts.json";
import { authClient } from "~~/server/lib/auth-client";
const { data: userMounts } = await useFetch("/api/mounts", {
  key: "user-mounts",
});
const session = authClient.useSession();

const userMountsIds = userMounts.value?.map((item: any) => {
  return item.mount.id;
});
// Un grand merci à M. Schmouker d'avoir implémenté le compte des montures possédées et le compte total des montures par catégories.
// Un grand merci également à M. Terranova de m'avoir aidé à vérifier la présence d'une monture possédée par le joueur dans la liste des montures globales.
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

async function pinMount(
  mountName: string,
  mountId: number,
  mountIcon: string,
  userId: string | undefined,
) {
  await $fetch("/api/pin-mount", {
    method: "POST",
    body: {
      mountName: mountName,
      mountId: mountId,
      mountIcon: mountIcon,
      userId: userId,
    },
  });
  await refreshNuxtData("pinned-mounts");
  window.$WowheadPower.refreshLinks();
}
</script>

<template>
  <div class="mounts-wrapper">
    <div class="mounts-container">
      <div class="expansion">
        <OpenAccordion
          :title="mountsGlobal[0]?.name"
          :unlocked-amount="categoryOwnedMountsArray[0]?.unlockedAmount"
          :amount="categoryOwnedMountsArray[0]?.amount"
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
                    :href="`https://wowhead.com/ptr/mount/${mount.ID}`"
                    target="_blank"
                    class="mount-item__link"
                  >
                    <img
                      :src="`https://wow.zamimg.com/images/wow/icons/medium/${mount.icon?.toLowerCase()}.jpg`"
                      class="mount-item__icon"
                    />
                    <span>{{ mount.name }}</span>
                  </a>
                  <button
                    v-if="
                      !ownedMountArray.includes(mount.ID) && session.data?.user
                    "
                    @click="
                      pinMount(
                        mount.name,
                        mount.ID,
                        mount.icon,
                        session.data?.user.id,
                      )
                    "
                    class="mount-item__pin-btn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="#FFD100"
                        d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479c-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </OpenAccordion>
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
                  <button
                    v-if="
                      !ownedMountArray.includes(mount.ID) && session.data?.user
                    "
                    @click="
                      pinMount(
                        mount.name,
                        mount.ID,
                        mount.icon,
                        session.data?.user.id,
                      )
                    "
                    class="mount-item__pin-btn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="#FFD100"
                        d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479c-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354"
                      />
                    </svg>
                  </button>
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
a {
  text-decoration: none;
}

.mounts-wrapper {
  width: 80%;
}
</style>
