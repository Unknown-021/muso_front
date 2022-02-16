<template>
  <div class="apps-list">
    <ul class="apps-list__inner">
      <template v-for="appName in apps">
        <li :key="appName" class="apps-list__item">
          <base-logo-round :name="appName" width="32" />
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import BaseLogoRound from 'components/ui/base-logo-round/base-logo-round.vue';

export default {
  name: 'apps-list',
  components: {
    BaseLogoRound
  },
  props: {
    apps: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
:root {
  --apps-list-column-gap: 5px;
}
.apps-list {
  display: inline-flex;
  max-width: 148px;
  padding: 4px;
  border-radius: 8px;
  background-color: var(--base-3-color);
  list-style: none;
  &__inner {
    margin: 0;
    margin-right: -5px;
    margin-bottom: -5px;
    display: inline-flex;
    flex-wrap: wrap;
    padding: 0;
  }
  &__item {
    margin-right: 4px;
    margin-bottom: 4px;
    display: flex;
  }
}
</style>