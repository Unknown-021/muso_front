<template>
  <transition name="notify-fade-slide" mode="out-in">
    <notify-dialog
      v-if="dialog"
      :ref="dialog.id"
      :key="dialog.id"
      :type="dialog.type"
      :duration="dialog.duration || this.duration"
      @close="dialog = null"
    >
      <p>{{ dialog.message }}</p>
    </notify-dialog>
  </transition>
</template>

<script>
import NotifyDialog from './notify-dialog';

export default {
  name: 'notify-container',
  components: {
    NotifyDialog
  },
  props: {
    duration: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      lastId: 0,
      // in the future we can store array of dialogs, so we will be able to show queue of dialogs.
      // for now, there is no such a need.
      dialog: null
    };
  },
  methods: {
    show(options) {
      const id = ++this.lastId;
      this.dialog = {
        ...options,
        id
      };
      return new Promise(resolve => {
        this.$nextTick(() => resolve(this.$refs[id]));
      });
    }
  }
}
</script>

<style lang="scss">
.notify-fade-slide {
  &-enter-active,
  &-leave-active {
    transition-property: opacity, transform;
    transition-duration: 250ms;
    transition-timing-function: ease-in-out;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
