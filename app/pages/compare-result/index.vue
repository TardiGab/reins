<script setup lang="ts">
import { authClient } from "~~/server/lib/auth-client";

const route = useRoute();
const session = authClient.useSession();

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
const {
  data: comparedMounts,
  execute: comparedGo,
  status: comparedLoading,
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
  },
);
const { data: comparedCharacterRender, execute: comparedRenderGo } =
  await useLazyFetch("/api/character-render", {
    query: {
      region: route.query.region,
      realm: route.query.realm,
      character: route.query.character,
    },
  });

const firstAvatar = ref<string>();
const comparedAvatar = ref<string>();

onMounted(async () => {
  charGo();
  renderGo();
  firstAvatar.value = await characterRender.value[0].value;
});

let loadingText = ref([
  "Searching saddles...",
  "Looking for Invincible...",
  "These webs will summon Nerubians, don't stand in 'em!",
  "Cleaning stable...",
  "Gathering horseshoes...",
]);

let randomLoadingValue = random(0, loadingText.value.length - 1);

let region = ref();
let realm = ref();
let character = ref();

if (region.value && realm.value && character.value) {
  console.log(region.value, realm.value, character.value);
}
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
        v-if="comparedMounts && !session.data?.user"
      >
        <div class="comparison__character">
          <img
            :src="comparedAvatar"
            alt="Character profile"
            class="comparison__profile"
          />
          <span class="comparison__name">
            {{ route.query.character }}'s mount collection
          </span>
        </div>
        <button class="comparison__clear">Query again</button>
      </div>
      <div class="comparison__search">
        <CompareSearchCharacter
          @realm="realm"
          @region="region"
          @character="character"
        />
      </div>
      <!-- <CompareMountList
        :character-mounts="characterMounts"
        v-if="characterMounts && session.data?.user"
      />
      <CompareMountList
        :character-mounts="comparedMounts"
        v-if="comparedMounts && !session.data?.user"
      /> -->
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
    box-shadow: inset 0px 0px 0px 3px black;
    border-radius: 0.5rem;
    height: 3rem;
    width: auto;
    @supports (corner-shape: bevel) {
      corner-shape: bevel;
      border-radius: $corner-shape-s;
    }
  }
  &__name {
    font-family: $main-size;
  }
}
</style>
