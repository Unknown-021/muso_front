<template>
  <a class="action-btn--link" href="https://z62mz.app.link/yQGa661PGab" target="_blank">
    <action-button class="action-btn--trial mobile-none" variant="primary">
      Start free trial
    </action-button>
  </a>
</template>

<script>
import ActionButton from 'components/ui/action-button.vue';

export default {
  name: 'analytics-start-trial',
  components: {
    ActionButton
  }
}
</script>

<style lang="scss">
  .action-btn--trial {
    display: flex;
    justify-content: center;
    align-self: flex-end;
    align-items: center;
    width: 205px;
    height: 40px;
    font-weight: 500;
    font-size: 12px;
    line-height: 15.6px;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
  .action-btn--link {
    align-self: flex-end;
  }
  .action-btn--link:hover {
    align-self: flex-end;
    text-decoration: none;
  }
</style>
