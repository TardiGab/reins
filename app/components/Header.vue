<script setup lang="ts">
import { authClient } from "~~/server/lib/auth-client";
const session = authClient.useSession();
</script>

<template>
  <header>
    <h1>Reins</h1>
    <button
      v-if="!session?.data"
      @click="() => authClient.signIn.social({ provider: 'battlenet' })"
    >
      Connexion avec Battlenet
    </button>
    <div>
      <p v-if="session.data">Bonjour, {{ session.data?.user.name }}</p>
      <button v-if="session.data" @click="() => authClient.signOut()">
        Se déconnecter
      </button>
    </div>
  </header>
</template>
