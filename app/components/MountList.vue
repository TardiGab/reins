<script setup lang="ts">
// console.clear();
import { onMounted, ref } from "vue";
import mountsGlobal from "@/assets/data/mounts.json";
const { data: userMounts, error } = await useFetch("/api/mounts");

// console.log(mountsGlobal);

// const isLogged = document.cookie.get({
//   name: "better-auth.session_token"
// })

// console.log(document.cookie);

// function getCookie(name: any) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return (parts.pop() as any).split(";").shift();
// }

// const cookies = getCookie("better-auth.session_token");

// console.log(cookies);

// Source - https://stackoverflow.com/a/56458070
// Posted by Titian Cernicova-Dragomir, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-20, License - CC BY-SA 4.0
declare global {
  interface Window {
    $WowheadPower: any;
  }
}

onMounted(() => {
  if (window.$WowheadPower) {
    window.$WowheadPower.refreshLinks();
  }
});

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
</script>

<template>
  <div class="mounts-wrapper">
    <div class="mounts-container">
      <div
        v-for="(expansion, index) in mountsGlobal"
        :key="expansion.name"
        class="expansion"
      >
        <Accordion
          :title="expansion.name"
          :unlocked-amount="categoryOwnedMountsArray[index]?.unlockedAmount"
          :amount="categoryOwnedMountsArray[index]?.amount"
        >
          <div class="expansion__container">
            <div
              v-for="subcat in expansion.subcats"
              :key="subcat.name"
              class="expansion__subcategories"
            >
              <h3 class="expansion__subcat">
                {{ subcat.name }}
              </h3>
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

li {
  list-style: none;
  padding: 0;
}

ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0;
}

.mounts-wrapper {
  border-radius: 1rem;
  border: 2px solid $border-container;
  overflow: hidden;
  max-height: calc(85vh - 2rem);
  max-width: calc(95vw - 2rem);
  margin: auto;
  position: relative;
}

.mounts-container {
  padding: 2rem;
  max-height: calc(80vh - 2rem);
  background-color: #1a1512;
  background-image: url("/images/wooden-background-2.webp");
  box-shadow: 0 0 40px 0 #000 inset;
  background-repeat: repeat;
  background-attachment: local;
  overflow-y: scroll;
}

.expansion {
  &__subcat {
    font-family: "Sentient-Variable";
    color: $yellow;
    text-shadow: 1px 1px 0 #000;
    line-height: 100%;
    font-weight: 400;
    padding: 0 1rem;
    &-container {
      padding: 0 1rem;
      margin-bottom: 2rem;
    }
  }
}

.mount-item {
  filter: grayscale(100%);
  font-family: "Sentient-Variable";
  font-size: $small;
  transition: all 0.3s;
  padding: 0.5rem;
  box-sizing: border-box;
  span {
    text-shadow: 1px 1px 0 #000;
  }
  &:hover {
    filter: grayscale(0%);
    background-color: #28221c;
    border-radius: 0.5rem;
    box-shadow: inset 0px 0px 0px 2px $border-container;
  }
  &__owned {
    filter: grayscale(0%);
    .mount-item__link {
      color: white;
    }
  }
  &__link {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    color: #595959;
  }
  &__icon {
    position: relative;
    border-radius: 0.25rem;
    border: $border-container solid 2px;
  }
}
</style>
