<script setup lang="ts">
defineProps<{
  src: string;
  alt?: string;
  size?: number;
  caption?: string;
}>();
</script>

<template>
  <div class="guide-img-wrapper">
    <img :src="src" :alt="alt" :class="`guide-img img-${size || 100}`" />
    <span v-if="caption" class="guide-img__caption">{{ caption }}</span>
  </div>
</template>

<style scoped lang="scss">
.guide-img {
  width: 100%;
  height: auto;
  @include border-radius(0.5rem, true);
  @include container-border();
  &__caption {
    display: block;
    text-align: center;
    margin-top: 0.5rem;
    font-size: $small;
  }
}

.guide-img-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.img-100 {
  width: 100%;
  height: auto;
}
.img-75 {
  width: 75%;
  height: auto;
  margin: 0 auto;
}
.img-50 {
  width: 50%;
  height: auto;
  margin: 0 auto;
}
.img-33 {
  width: 33%;
  height: auto;
  margin: 0 auto;
}
.img-25 {
  width: 25%;
  height: auto;
  margin: 0 auto;
}
</style>
