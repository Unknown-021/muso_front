<template>
  <base-modal
    ref="modal"
    modal-class="action-modal"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </base-modal>
</template>

<script>
import BaseModal from 'components/ui/base-modal/base-modal.vue';

export default {
  name: 'base-action-modal',
  components: {
    BaseModal
  },
  methods: {
    getModal() {
      return this.$refs.modal;
    }
  }
};
</script>

<style lang="scss">
.action-modal {
  max-width: 370px;
  text-align: center;
  background-color: #21201F;
}

.action-modal-title {
  flex-shrink: 0;
  padding: 32px var(--modal-padding-x) 6px;
  font-size: 20px;
  line-height: 1.3;
  font-weight: 500;
  &--small {
    padding-top: 20px;
    padding-bottom: 19px;
    text-align: left;
    font-size: 14px;
    line-height: 1.4;
    font-weight: 400;
  }
}

.action-modal-body {
  flex: 1;
  padding: 5px var(--modal-padding-x) 22px;
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 1.4;
}

.action-modal-footer {
  padding: 0 var(--modal-padding-x) 29px;
  button {
    margin-bottom: 10px;
    width: 100%;
  }
  :last-child {
    margin-bottom: 0;
  }
}
</style>