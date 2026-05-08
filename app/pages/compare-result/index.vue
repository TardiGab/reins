<script setup lang="ts">
import { authClient } from "~~/server/lib/auth-client";

const route = useRoute();
const session = authClient.useSession();

const comparedCharacterName = ref<string>();
const comparedCharacterChoosed = (character: string) => {
  comparedCharacterName.value = character;
};

const comparedMounts = ref();
const comparedMountsChoosed = (character: []) => {
  comparedMounts.value = character;
};

const comparedRealm = ref<string>();
const comparedRealmChoosed = (realm: string) => {
  comparedRealm.value = realm;
};

const comparedRegion = ref<string>();
const comparedRegionChoosed = (region: string) => {
  comparedRegion.value = region;
};

const comparedAvatar = ref<string>();
const comparedAvatarChoosed = (avatar: string) => {
  comparedAvatar.value = avatar;
};

const {
  data: characterMounts,
  execute: charGo,
  status: loading,
} = await useLazyFetch(`/api/character-mounts/`, {
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

const firstAvatar = ref<string>();

const { data: comparedCharacterRender, execute: comparedRenderGo } =
  await useLazyFetch("/api/character-render", {
    query: {
      region: comparedRegion,
      realm: comparedRealm,
      character: comparedCharacterName,
    },
    immediate: false,
  });

if (comparedCharacterName.value) {
  comparedAvatar.value = await comparedCharacterRender.value[0].value;
  console.log(comparedAvatar.value);
}

onMounted(async () => {
  await charGo();
  await renderGo();
  firstAvatar.value = await characterRender.value[0].value;
});
</script>

<template>
  <Header />
  <div class="comparison">
    <div class="comparison__left">
      <div class="comparison__header" v-if="session.data?.user">
        <div class="comparison__character">
          <img
            src="/images/battlenet.png"
            alt="Battle.net logo"
            class="comparison__profile"
          />
          <span class="comparison__name"> Your mount collection </span>
        </div>
        <button class="comparison__clear">Query again</button>
      </div>
      <div
        class="comparison__header"
        v-if="characterMounts && !session.data?.user"
      >
        <div class="comparison__character">
          <img
            :src="firstAvatar"
            alt="Character profile"
            class="comparison__profile"
          />
          <span class="comparison__name">
            {{ route.query.character }}'s mount collection
          </span>
        </div>
        <button class="comparison__clear">Query again</button>
      </div>
      <MountList v-if="session.data?.user" class="user-mounts" />
      <CompareMountList
        :character-mounts="characterMounts"
        v-if="characterMounts && !session.data?.user"
      />
    </div>
    <div class="comparison__right">
      <div
        class="comparison__header"
        v-if="characterMounts && session.data?.user"
      >
        <div class="comparison__character">
          <img
            :src="firstAvatar"
            alt="Character profile"
            class="comparison__profile"
          />
          <span class="comparison__name">
            {{ route.query.character }}'s mount collection
          </span>
        </div>
        <button class="comparison__clear">Query again</button>
      </div>
      <div
        class="comparison__header"
        v-if="!session.data?.user && comparedCharacterName"
      >
        <div class="comparison__character">
          <img
            :src="comparedAvatar"
            alt="Character profile"
            class="comparison__profile"
          />
          <span class="comparison__name">
            {{ comparedCharacterName }}'s mount collection
          </span>
        </div>
        <button class="comparison__clear">Query again</button>
      </div>
      <div class="comparison__search" v-if="!comparedMounts">
        <h2 class="search-h2">Add a character</h2>
        <CompareSearchCharacter
          @compared-mounts="comparedMountsChoosed"
          @character="comparedCharacterChoosed"
          @realm="comparedRealmChoosed"
          @region="comparedRegionChoosed"
          @avatar="comparedAvatarChoosed"
        />
      </div>
      <CompareMountList
        :character-mounts="characterMounts"
        v-if="characterMounts && session.data?.user"
      />
      <CompareMountList
        :character-mounts="comparedMounts"
        v-if="comparedMounts"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-mounts {
  width: 100% !important;
  height: 80vh !important;
}

.comparison {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  &__left,
  &__right {
    width: 100%;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 2rem);
    margin-bottom: 1rem;
    padding: 0 1rem;
  }
  &__character {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  &__profile {
    border: solid 2px $border-container;
    border-radius: 0.5rem;
    height: 3rem;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    @supports (corner-shape: bevel) {
      corner-shape: bevel;
      border-radius: $corner-shape-s;
    }
  }
  &__name {
    font-family: $main-size;
  }
  &__search {
    padding: 2rem;
    border-radius: 1rem;
    border: 2px solid $border-container;
    background-image: url("/images/wooden-background-2.webp");
    box-shadow: 0 0 40px 0 #000 inset;
    background-repeat: repeat;
    background-attachment: local;
    height: calc(80vh - 4rem);
    @supports (corner-shape: bevel) {
      corner-shape: bevel;
      border-radius: $corner-shape-s;
    }
  }
}
.search-h2 {
  font-size: $h2-size;
  background: linear-gradient(180deg, #ffd100 0%, #dfaa03 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin: 0;
  margin-bottom: 2rem;
}
</style>
