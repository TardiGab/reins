<script setup lang="ts">
import { authClient } from "~~/server/lib/auth-client";
const session = authClient.useSession();

function logout() {
  authClient.signOut();
  setTimeout(() => {
    window.location.reload();
  }, 100);
}
</script>

<template>
  <header>
    <h1>Reins</h1>
    <!-- <div v-if="!session?.data">
      <button
        @click="() => authClient.signIn.social({ provider: 'battlenet' })"
      >
        Login with Battlenet
      </button>
    </div>
    <div v-if="session.data">
      <p>Bonjour, {{ session.data?.user.name }}</p>
      <button @click="logout">Logout</button>
    </div> -->
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}
</style>
