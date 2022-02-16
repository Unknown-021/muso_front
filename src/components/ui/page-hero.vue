<template>
  <section class="page-hero">
    <div class="page-hero__title-wrap">
      <h1 class="title">
        <slot name="title" />
      </h1>
      <div class="page-hero__action">
        <slot name="action" />
      </div>
    </div>
    <p class="page-hero__text">
      <slot />
    </p>
  </section>
</template>

<script>
export default {
  name: 'page-hero'
}
</script>

<style lang="scss">
.page-hero {
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  padding-bottom: 18px;
  color: var(--overlay-2-color);
  &__title-wrap {
    display: flex;
    align-items: center;
  }
  &__action {
    margin-left: auto;
    display: flex;
    padding-left: 20px;
  }
  &__text {
    margin-top: 7px;
    line-height: 1.4;
  }
}
</style>