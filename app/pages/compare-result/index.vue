<script setup lang="ts">
import { useRoute } from "#app";
import { authClient } from "~~/server/lib/auth-client";

const route = useRoute();
const router = useRouter();
const session = authClient.useSession();

const props = defineProps(["openBaseDiff", "openComparedDiff"]);

const {
  data: comparedMountsLink,
  execute: comparedGo,
  clear: comparedClear,
} = await useLazyFetch("/api/character-mounts", {
  query: {
    region: route.query.cregion,
    realm: route.query.crealm,
    character: route.query.ccharacter,
  },
  immediate: false,
});

const { data: comparedCharRender, execute: comparedRenderGo } =
  await useLazyFetch("/api/character-render", {
    query: {
      region: route.query.cregion,
      realm: route.query.crealm,
      character: route.query.ccharacter,
    },
    immediate: false,
  });

const {
  data: characterMounts,
  execute: baseGo,
  status: loading,
  clear: baseClear,
} = await useLazyFetch("/api/character-mounts/", {
  query: {
    region: route.query.region,
    realm: route.query.realm,
    character: route.query.character,
  },
});

const { data: characterRender, execute: renderGo } = await useLazyFetch(
  "/api/character-render",
  {
    query: {
      region: route.query.region,
      realm: route.query.realm,
      character: route.query.character,
    },
    immediate: false,
  },
);

const comparedMounts = ref();

let baseMountsChoosed = (character: any[]) => {
  characterMounts.value = character;
};

let comparedMountsChoosed;

if (!comparedMounts.value && route.query.ccharacter) {
  await comparedGo();
  await comparedRenderGo();
  comparedMounts.value = comparedMountsLink.value;
} else if (
  !comparedMounts.value &&
  !route.query.cregion &&
  !route.query.crealm &&
  !route.query.ccharacter
) {
  comparedMountsChoosed = (character: any[]) => {
    comparedMounts.value = character;
  };
}

const baseRealm = ref<string>();
const baseRealmChoosed = (realm: string) => {
  baseRealm.value = realm;
};

const comparedRealm = ref<string>();
const comparedRealmChoosed = (realm: string) => {
  comparedRealm.value = realm;
};

const baseRegion = ref<string>();
const baseRegionChoosed = (region: string) => {
  baseRegion.value = region;
};

const comparedRegion = ref<string>();
const comparedRegionChoosed = (region: string) => {
  comparedRegion.value = region;
};

const baseCharacterName = ref<string>();
const baseCharacterChoosed = (character: string) => {
  baseCharacterName.value = character;
};

const comparedCharacterName = ref<string>();
const comparedCharacterChoosed = (character: string) => {
  comparedCharacterName.value = character;
};

// const baseAvatar = ref<string>();
// const baseAvatarChoosed = (avatar: string) => {
//   baseAvatar.value = avatar;
// };

const comparedAvatar = ref<string>();
const comparedAvatarChoosed = (avatar: string) => {
  comparedAvatar.value = avatar;
};

const baseOpenAccordionDiff = ref<number>();
const baseOpenAccordionDiffValue = (value: number) => {
  baseOpenAccordionDiff.value = value;
};

const baseClosedAccordionDiff = ref<number>();
const baseClosedAccordionDiffValue = (value: number) => {
  baseClosedAccordionDiff.value = value;
};

const comparedOpenAccordionDiff = ref<number>();
const comparedOpenAccordionDiffValue = (value: number) => {
  comparedOpenAccordionDiff.value = value;
};

const compareClosedAccordionDiff = ref<number>();
const comparedAccordionDiffValue = (value: number) => {
  compareClosedAccordionDiff.value = value;
};

const firstAvatar = ref<string>();
const showLeft = ref(true);
const showRight = ref(true);
onMounted(async () => {
  await baseGo();
  await renderGo();
  firstAvatar.value = await characterRender.value[0].value;
  if (comparedCharRender.value) {
    comparedAvatar.value = await comparedCharRender.value[0].value;
  }
  if (!route.query.cregion && !route.query.crealm && !route.query.ccharacter) {
    showRight.value = false;
  }

  console.log();
});

watch(
  () => comparedCharacterName.value,
  () => {
    if (
      comparedRegion.value &&
      comparedRealm.value &&
      comparedCharacterName.value
    ) {
      router.push({
        path: `${route.fullPath}`,
        query: {
          region: route.query.region,
          realm: route.query.realm,
          character: route.query.character,
          cregion: comparedRegion.value,
          crealm: comparedRealm.value,
          ccharacter: comparedCharacterName.value,
        },
      });
      comparedGo();
      showRight.value = true;
    }
  },
);
watch(
  () => baseCharacterName.value,
  () => {
    if (baseRegion.value && baseRealm.value && baseCharacterName.value) {
      router.push({
        path: `${route.fullPath}`,
        query: {
          region: baseRegion.value,
          realm: baseRealm.value,
          character: baseCharacterName.value,
          cregion: route.query.cregion,
          crealm: route.query.crealm,
          ccharacter: route.query.ccharacter,
        },
      });
      // let url = new URL(window?.location.href);
      // url.searchParams.set("region", baseRegion.value!);
      // url.searchParams.set("realm", baseRealm.value!);
      // url.searchParams.set("character", baseCharacterName.value!);
      // history.pushState({}, "", url.href);
      baseGo();
      showLeft.value = true;
    }
  },
);

watch(
  () => showRight.value,
  () => {
    console.log("Right:", showRight.value);

    if (showRight.value === false) {
      let url = new URL(window?.location.href);
      url.searchParams.delete("cregion");
      url.searchParams.delete("crealm");
      url.searchParams.delete("ccharacter");
      history.pushState({}, "", url.href);
      comparedClear();
    }
  },
);

watch(
  () => showLeft.value,
  () => {
    console.log("Left:", showLeft.value);

    if (showLeft.value === false) {
      let url = new URL(window?.location.href);
      url.searchParams.delete("region");
      url.searchParams.delete("realm");
      url.searchParams.delete("character");
      history.pushState({}, "", url.href);
      baseClear();
    }
  },
);

watch(
  () => route.fullPath,
  async () => {
    if (route.query.region && route.query.realm && route.query.character) {
      baseGo();
      renderGo();
    } else if (
      route.query.cregion &&
      route.query.crealm &&
      route.query.ccharacter
    ) {
      await comparedGo();
      await comparedRenderGo();
    }
  },
);

watch(
  () => baseClosedAccordionDiff.value,
  () => {
    const diffMountOwned =
      compareClosedAccordionDiff.value! - baseClosedAccordionDiff.value!;

    console.log(
      diffMountOwned,
      compareClosedAccordionDiff.value,
      baseClosedAccordionDiff.value,
    );
  },
);
</script>

<template>
  <Comparison
    :open-base-diff="openBaseDiff"
    :open-compared-diff="openComparedDiff"
  />
</template>

<style scoped lang="scss"></style>
