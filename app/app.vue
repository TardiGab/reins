<script setup lang="ts">
// const { data, error } = await useFetch("/api/version");
import { authClient } from "~~/server/lib/auth-client";
const session = authClient.useSession();
</script>

<template>
  <!-- <div>
    <h1>Database Version</h1>
    <p v-if="data">{{ data.version }}</p>
    <p v-else-if="error">Error fetching version</p>
  </div> -->
  <div>
    <button
      v-if="!session?.data"
      @click="() => authClient.signIn.social({ provider: 'battlenet' })"
    >
      Connexion avec Battlenet
    </button>
    <div>
      <span v-if="session.data"
        >Connecté en tant que {{ session.data?.user.name }}</span
      >
      <button v-if="session.data" @click="() => authClient.signOut()">
        Se déconnecter
      </button>
    </div>
  </div>
</template>
