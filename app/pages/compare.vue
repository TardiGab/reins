<script></script>

<template>
  <Header />
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
  font-size: $h2-size;
  font-weight: 600;
  background: var(
    --Heading-color,
    linear-gradient(180deg, #ffd100 0%, #dfaa03 100%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 2rem;
}

.compare-p {
  font-size: $main-size;
  line-height: 140%;
  max-width: 60ch;
  text-align: center;
  margin: auto;
}
</style>
