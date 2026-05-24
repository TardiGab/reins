<script setup lang="ts">
import { authClient } from "~~/server/lib/auth-client";

const session = authClient.useSession();

watch(
  () => session.value.data?.session,
  () => navigateTo("/"),
);
</script>

<template>
  <div class="login">
    <div class="login__container">
      <h2 class="login__h2">Access your stable</h2>
      <div class="login__oauth">
        <p class="login__desc">
          Link your Battle.net account to Reins and see what are the mounts
          you’re missing!
        </p>
        <LoginButton />
        <p class="login__disclamer">
          We do not have access to your email adress or password. Your
          informations will directly go to Blizzard.
        </p>
      </div>
      <div class="login__divider"><span>Or</span></div>
      <div class="login__guest">
        <h3 class="login__h3">Look up your character as a guest.*</h3>
        <p class="login__disclamer">
          *Some features may be limited to logged-in users.
        </p>
        <LoginSearchCharacter class="login__search" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
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
  &__container {
    max-width: 500px;
    position: relative;
    z-index: 1;
  }
  &__h2 {
    @include gradient-heading($h2-size);
    margin-top: 0;
  }
  &__h3 {
    font-size: $h3-size;
    font-weight: 400;
    text-align: center;
    margin: 1rem 0;
    line-height: 1;
    text-shadow: 1px 1px black;
  }
  &__desc {
    font-size: $main-size;
    text-align: center;
    text-shadow: 1px 1px black;
    line-height: 1.4;
  }
  &__disclamer {
    font-size: $small;
    text-align: center;
    text-shadow: 1px 1px black;
  }
  &__divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 2rem 0;
    width: 100%;
    color: $dark-gray;
    text-shadow: 1px 1px black;
    text-transform: uppercase;
    &::before,
    &::after {
      content: "";
      height: 1px;
      width: 100%;
      background-color: $dark-gray;
      box-shadow: 1px 1px black;
    }
  }
  &__search {
    margin-top: 2rem;
  }
}
</style>
