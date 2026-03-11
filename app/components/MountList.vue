<script setup lang="ts">
import { authClient } from "~~/server/lib/auth-client";
const session = authClient.useSession();

function getMounts() {
  fetch(
    "https://eu.api.blizzard.com/data/wow/mount/index?namespace=static-eu",
    {
      headers: {
        Authorization: `Bearer ${session.value.data?.user.accessToken}`, // Fonctionne avec mon propre token dans la DB
      },
    },
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Mounts data:", data);
    })
    .catch((error) => {
      console.error("Error fetching mounts:", error);
    });
}
</script>

<template>
  <div>
    <button @click="getMounts">Get Mounts</button>
    <!-- <pre>{{ session.data }}</pre> -->
  </div>
</template>
