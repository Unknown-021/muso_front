<template>
  <button type="button" class="modal-cancel" @click="modalComponent.hide">
    <slot>Cancel</slot>
  </button>
</template>

<script>
export default {
  name: 'base-modal-cancel-button',
  inject: ['modalComponent']
}
</script>
