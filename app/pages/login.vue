<script setup lang="ts">
import { authClient } from "~~/server/lib/auth-client";

const session = authClient.useSession();

watch(
  () => session.value.data?.session,
  () => navigateTo("/"),
);

useHead({
  title: "Reins | Login",
  meta: [
    {
      name: "description",
      content:
        "Link your Battle.net account to Reins and see what mounts you're missing in World of Warcraft!",
    },
  ],
});
</script>

<template>
  <div class="login">
    <div class="login__wrapper">
      <h2 class="login__h2">Access your stable</h2>
      <div class="login__container">
        <div class="login__oauth">
          <h3 class="login__h3">Link your Battle.net account to Reins</h3>
          <p class="login__desc">
            See what are the mounts you’re missing by linking your
            Battle.net account!
          </p>
          <LoginButton class="login__button" />
          <p class="login__disclamer">
            We do not have access to your email address or password. Your
            informations will directly go to Blizzard.
          </p>
        </div>
        <div class="login__divider"><span>Or</span></div>
        <div class="login__guest">
          <h3 class="login__h3">Look up your character as a guest.*</h3>
          <p class="login__disclamer">
            *Some features may be limited to logged-in users.
          </p>
          <LoginSearchCharacter class="login__search" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  height: 80vh;
  margin: auto;
  border: 2px solid $border-container;
  @include border-radius(1rem, true);
  padding: 2rem;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    background-image: url("/images/stable.webp");
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(8px);
    opacity: 0.2;
    width: 100%;
    height: 100%;
  }
  &__wrapper {
    position: relative;
    max-width: 1080px;
    z-index: 1;
  }
  &__container {
    display: flex;
    gap: 5rem;
    @media screen and (max-width: 780px) {
      flex-direction: column;
      gap: 2rem;
    }
  }
  &__h2 {
    @include gradient-heading($h2-size);
    margin-top: 0;
    margin-bottom: 4rem;
    @media screen and (max-width: 780px) {
      margin-bottom: 2rem;
    }
  }
  &__h3 {
    font-size: $h3-size;
    font-weight: 400;
    text-align: center;
    margin: 0;
    margin-bottom: 2rem;
    line-height: 1;
    text-shadow: 1px 1px black;
    @media screen and (max-width: 780px) {
      margin-bottom: 1rem;
    }
  }
  &__oauth,
  &__guest {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    width: 100%;
  }
  &__desc {
    font-size: $main-size;
    text-align: center;
    text-shadow: 1px 1px black;
    line-height: 1.4;
    margin: 0;
    margin-bottom: 1.5rem;
  }
  &__disclamer {
    font-size: $small;
    text-align: center;
    text-shadow: 1px 1px black;
    margin: 0;
    margin-top: 0.5rem;
    line-height: 1.4;
  }
  &__divider {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    color: $dark-gray;
    text-shadow: 1px 1px black;
    text-transform: uppercase;
    @media screen and (max-width: 780px) {
      flex-direction: row;
    }
    &::before,
    &::after {
      content: "";
      height: 100%;
      width: 1px;
      background-color: $dark-gray;
      box-shadow: 1px 1px black;
      @media screen and (max-width: 780px) {
        height: 1px;
        width: 100%;
      }
    }
  }
  &__search {
    margin-top: 2rem;
  }
  &__button {
    font-size: $main-size;
  }
}
</style>
