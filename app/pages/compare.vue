<script setup lang="ts">
useSeoMeta({
  title: "Reins | Compare Mount Collections",
  description:
    "Search for your friend's character and realm to compare your World of Warcraft mount collections side by side.",
  ogSiteName: "Reins",
  ogTitle: "Reins | Compare Mount Collections",
  ogDescription:
    "Search for your friend's character and realm to compare your World of Warcraft mount collections side by side.",
  ogImage: "/images/logo.png",
  ogImageAlt: "Reins - WoW Mount Tracker",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "Reins | Compare Mount Collections",
  twitterDescription:
    "Search for your friend's character and realm to compare your World of Warcraft mount collections side by side.",
  twitterImage: "/images/logo.png",
  twitterImageAlt: "Reins - WoW Mount Tracker",
});
</script>

<template>
  <main class="compare">
    <div class="compare-text">
      <h1 class="compare-h1">Check your friends' mount collection!</h1>
      <p class="compare-p">
        Search for your friend's character's realm and enter their name to view
        their mount collection. If you've linked your Battle.net account to
        Reins, you can choose one of your own characters to be compared with.
      </p>
    </div>

    <SearchCharacter />
  </main>
</template>

<style lang="scss">
.compare {
  min-height: 55vh;
}

.compare-text {
  margin: 4rem 0;
}

.compare-h1 {
  @include gradient-heading($h2-size);
}

.compare-p {
  font-size: $main-size;
  line-height: 140%;
  max-width: 60ch;
  text-align: center;
  margin: auto;
}
</style>
