<template>
  <create-modal class="payment-modal" ref="modal" v-bind="$attrs" v-on="$listeners">
    <payment-card
      class="payment-modal__inner"
      mode="update"
      @success="onSuccess"
      @cancel="hide"
    />
  </create-modal>
</template>

<script>
import CreateModal from 'components/ui/create-modal.vue';
import PaymentCard from './payment-card.vue';

export default {
  name: 'payment-modal',
  components: {
    CreateModal,
    PaymentCard
  },
  methods: {
    getModal() {
      return this.$refs.modal.getModal();
    },
    async onSuccess() {
      this.hide();
      this.$emit('success');
    },
    async hide() {
      await this.getModal().hide();
    }
  }
}
</script>

<style lang="scss">
.payment-modal {
  &__inner {
    padding-bottom: 15px;
  }
}
</style>