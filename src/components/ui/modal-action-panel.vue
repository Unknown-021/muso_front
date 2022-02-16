<template>
  <div class="modal-action-panel" :data-active="active">
    <slot />

    <transition name="fade-fast">
      <div v-if="active && $slots.buttons" class="modal-action-panel__buttons">
        <slot name="buttons" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'modal-action-panel',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.modal-action-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px var(--modal-padding-x);
  width: 100%;
  min-height: 45px;
  transition: background-color 150ms;
  @media (min-width: 768px) {
    padding-left: calc(var(--modal-padding-x) - 20px);
  }
  &[data-active] {
    background-color: #040302;  
  }
  &__buttons {
    display: flex;
    align-items: center;
    margin-right: -20px;
    > * {
      margin-right: 20px;
    }
  }
}
</style>