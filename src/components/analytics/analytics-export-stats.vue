<template>
  <action-button class="action-btn--share" @click="openShareModal" variant="primary" icon="export">
    Share Analytics
  </action-button>
</template>

<script>
import ActionButton from 'components/ui/action-button.vue';

export default {
  name: 'analytics-export-stats',
  components: {
    ActionButton
  },
  data() {
    return {
    }
  },
  computed: {

  },
  methods: {
    async openShareModal() {
      this.$modal.open({
        name: 'share-tile',
        props: {
        }
      });
    },

  }
}
</script>

<style lang="scss">
  .action-btn--share {
    display: flex;
    align-self: flex-end;
    padding: 8px 16px;
    line-height: 19.6px;
  }
</style>
