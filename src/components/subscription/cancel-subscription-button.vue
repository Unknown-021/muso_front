<template>
  <action-button
    @click="cancelSubscription"
  >
    Cancel Membership
  </action-button>
</template>

<script>
import ActionButton from 'components/ui/action-button';

export default {
  name: 'cancel-subscription-button',
  components: {
    ActionButton,
  },
  methods: {
    async cancelSubscription() {
      const reasonsModal = await this.$modal.open({
        name: 'cancel-subscription-reasons',
      });
      reasonsModal.$on('success', this.openCancelModal);
    },
    async openCancelModal(data) {
      const cancelModal = await this.$modal.open({
        name: 'cancel-subscription',
        props: data,
      });
      cancelModal.$on('success', this.openLeaveModal);
    },
    async openLeaveModal() {
      await this.$modal.open({
        name: 'leave-subscription',
      });
    },
  },
};
</script>
