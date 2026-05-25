<script setup lang="ts">
useHead({
  title: "Reins | Compare your collection with a friend",
});
</script>

<template>
  <div class="compare-text">
    <h1 class="compare-h1">Check your friends' mount collection!</h1>
    <p class="compare-p">
      Search for your friend's character's realm and enter their name to view
      their mount collection. If you've linked your Battle.net account to Reins,
      you can choose one of your own characters to be compared with.
    </p>
  </div>

  <SearchCharacter />
</template>

<style lang="scss">
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
