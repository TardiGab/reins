<script setup lang="ts">
import type { NuxtError } from "#app";

interface Error extends NuxtError {
  data?: {
    link?: string;
    mountName?: string;
    message?: string;
  };
}

const props = defineProps<{ error: Error }>();

useHead({
  title: `Reins | Oups! ${props.error.statusText}`,
  script: [
    {
      innerHTML: `const whTooltips = {colorLinks: true, iconizeLinks: false, iconSize: false, renameLinks: false};`,
    },
    {
      src: "https://wow.zamimg.com/js/tooltips.js",
      defer: true,
    },
  ],
  link: [
    {
      rel: "stylesheet",
      href: "https://use.typekit.net/wyy1zbc.css",
    },
  ],
});
</script>

<template>
  <Header />
  <div class="error-page">
    <h2 class="error-page__h1">{{ error.status }}</h2>
    <h3 class="error-page__status-text">{{ error.statusText }}</h3>
    <p class="error-page__message">
      {{ error.data?.mountName }} {{ error.data?.message }}
    </p>
    <div class="error-page__links">
      <a
        v-if="error.data?.link"
        :href="error.data.link"
        target="_blank"
        class="error-page__link"
      >
        <span class="error-page__label">Check Wowhead's PTR database</span>
      </a>
      <NuxtLink to="/" class="error-page__link error-page__link--red">
        <span class="error-page__label">Go back home</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.error-page {
  text-align: center;
  max-width: 60ch;
  margin: 0 auto;
  margin-top: 20vh;
  @media screen and (max-width: 500px) {
    padding: 1.5rem;
    margin-top: 10vh;
  }

  &__h1 {
    @include gradient-heading($error-code);
    line-height: 0.8;
    margin-top: auto;
    margin-bottom: 20px;
  }

  &__status-text {
    margin-bottom: 20px;
    @include gradient-heading($h3-size);
    margin-bottom: 2rem;
  }

  &__message {
    font-size: $main-size;
    margin-bottom: 2rem;
    line-height: 1.4;
  }

  &__label {
    position: relative;
    display: inline-block;
    width: 100%;
    text-align: center;
    z-index: 1;
    font-size: 1rem;
    line-height: 1;
  }

  &__links {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
  }

  &__link {
    color: white;
    padding: 0.5rem 2rem;
    font-size: $small;
    transition: all 0.3s ease;
    text-decoration: none;
    position: relative;
    display: block;
    overflow: hidden;
    @include border-radius(0.5rem, true);
    background-color: $button-bg-dark;
    border: solid 2px $border-container;
    &:hover {
      background-color: $button-bg-hover;
    }
    &--red {
      color: $yellow;
      background-image: url("/images/body.webp");
      background-color: $red;
      background-blend-mode: luminosity;
      border: solid 2px #2d0000;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ff0400;
        background: radial-gradient(rgba(182, 3, 0, 0.7), rgba(0, 0, 0, 0));
        opacity: 0;
        z-index: 0;
        transition: all 0.3s ease;
      }
      &:hover {
        background-color: $red;
        &::after {
          opacity: 1;
        }
      }
    }
  }
}
</style>
