<template>
  <base-modal ref="modal" :closable="false" modal-class="leave-subscription" v-bind="$attrs" v-on="$listeners">
    <p class="leave-subscription__title">
      We're Sorry to See You Leave
    </p>
    <p class="leave-subscription__content">
      Thank you for your feedback. We really appreciate it and hope to see you back soon.
    </p>
    <action-button variant="primary" @click="close">Done</action-button>
  </base-modal>
</template>

<script>
import BaseModal from 'components/ui/base-modal/base-modal.vue';
import ActionButton from 'components/ui/action-button';

export default {
  name: 'leave-subscription',
  components: {
    BaseModal,
    ActionButton,
  },
  methods: {
    close() {
      return this.$refs.modal.hide();
    },
  },
}
</script>

<style lang="scss">
.leave-subscription {
  width: 370px;
  background: #21201F;
  padding: var(--modal-padding-x);
  text-align: center;
  color: #8F8F8F;
  
  &__title {
    font-weight: 500;
    font-size: 20px;
    color: #FFFFFF;
  }
  &__content {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  & button {
    margin-top: 10px;
    width: 100%;
  }
}
</style>