<template>
  <div class="not-found-page">
    <h1 class="not-found-page__title">Ooop, requested page was not found :(</h1>
  </div>
</template>

<script>
export default {
  name: 'not-found'
}
</script>

<style lang="scss">
.not-found-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  &__title {
    font-family: Inter, sans-serif;
    font-weight: normal;
    font-size: 20px;
  }
}
</style>