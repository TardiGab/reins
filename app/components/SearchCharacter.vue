<script setup lang="ts">
const { data: realmsIndexEu } = await useFetch("/api/realms-eu");
const { data: realmsIndexUs } = await useFetch("/api/realms-us");
const { data: realmsIndexKr } = await useFetch("/api/realms-kr");
const { data: realmsIndexTw } = await useFetch("/api/realms-tw");
// const { data: realmsIndexCn } = await useFetch("/api/realms-cn");

// console.log(realmsIndexCn.value);
</script>

<template>
  <form action="" method="post">
    <select name="realms" id="realmsIndex">
      <option value="#">EU</option>
      <option :value="realm.slug" v-for="realm in realmsIndexEu">
        {{ realm.name }}
      </option>
      <option value="#">NA</option>
      <option :value="realm.slug" v-for="realm in realmsIndexUs">
        {{ realm.name }}
      </option>
      <option value="#">KR</option>
      <option :value="realm.slug" v-for="realm in realmsIndexKr">
        {{ realm.name }}
      </option>
      <option value="#">TW</option>
      <option :value="realm.slug" v-for="realm in realmsIndexTw">
        {{ realm.name }}
      </option>
      <!-- <option value="#">CN</option>
      <option :value="realm.slug" v-for="realm in realmsIndexCn">
        {{ realm.name }}
      </option> -->
    </select>
    <input type="text" />
    <button type="submit">Search</button>
  </form>
</template>
