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
    <div v-if="!session?.data">
      <button
        @click="() => authClient.signIn.social({ provider: 'battlenet' })"
      >
        Connexion avec Battlenet
      </button>
    </div>
    <div v-if="session.data">
      <p>Bonjour, {{ session.data?.user.name }}</p>
      <button @click="logout">Se déconnecter</button>
    </div>
  </header>
</template>
