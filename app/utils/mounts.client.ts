// import { onMounted, ref } from "vue";
import mountsGlobal from "@/assets/data/mounts.json";
const { data: userMounts, error } = await useFetch("/api/mounts");

console.log(userMounts);

// export const getUserMountsIds = () => {
//   const userMountsIds = userMounts.value?.map((item: any) => {
//     return item.mount.id;
//   });
// };

export const userMountsIds = userMounts.value?.map((item: any) => {
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
