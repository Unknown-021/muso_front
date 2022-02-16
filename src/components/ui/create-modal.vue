<template>
  <base-modal
    ref="modal"
    overlay-class="create-modal-overlay"
    modal-class="create-modal"
    :closable="false"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <h2 class="create-modal-title">
      <slot name="title" />
    </h2>

    <slot />
  </base-modal>
</template>

<script>
import BaseModal from 'components/ui/base-modal/base-modal.vue';

export default {
  name: 'create-modal',
  components: {
    BaseModal
  },
  methods: {
    getModal() {
      return this.$refs.modal;
    }
  }
}
</script>

<style lang="scss">
.create-modal {
  border-radius: 0;
  box-sizing: content-box;
  box-shadow: none;
  padding: 0 20px;
  width: 100%;
  max-width: 460px;
  color: #F7F7F7;
  background-color: transparent;
  &-overlay {
    background-color: rgba(4, 3, 2, 0.96);
  }
  &-title {
    margin-bottom: 16px;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.3;
  }
  &-footer {
    margin-top: 50px;
  }
  &-buttons {
    display: flex;
    flex-wrap: wrap;
    margin-right: -22px;
    margin-bottom: -12px;
    > * {
      flex-grow: 1;
      margin-right: 22px;
      margin-bottom: 12px;
    }
  }
}

.create-input {
  border: none;
  border-bottom: 1px solid rgba(39, 38, 37, 0.7);
  padding: 9px 0;
  width: 100%;
  font-size: 44px;
  font-weight: 500;
  line-height: 1.2;
  background-color: transparent;
  &::placeholder {
    color: #595857;
  }
}
</style>