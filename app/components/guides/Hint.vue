<template>
  <div class="hint">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.hint {
  background-color: $container-bg;
  padding: 0.5rem 1rem;
  padding-left: 2.5rem;
  @include border-radius(1rem, true);
  @include container-border();
  position: relative;
  &::before {
    content: "?";
    position: absolute;
    top: 0.5rem;
    left: 1rem;
    font-size: $main-size;
    font-weight: 600;
    color: $yellow;
    text-shadow: 1px 1px black;
    line-height: 1.4;
  }
  p {
    margin: 0;
  }
}
</style>
