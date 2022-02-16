<template>
  <fade-height-transition name="fade-height">
    <div v-if="$slots.result" key="result" class="notif-actions-result">
      <slot name="result" />
    </div>
    <div v-else key="buttons" class="notif-actions" @mouseenter="preventHover" @mouseleave="restoreHover">
      <template v-for="button in buttons">
        <action-button
          :key="button.title"
          :loading="isLoading[button.action]"
          v-bind="button.props"
          @click="handleClick(button)"
        >
          {{ button.title }}
        </action-button>
      </template>
    </div>
  </fade-height-transition>
</template>

<script>
import ActionButton from 'components/ui/action-button.vue';
import FadeHeightTransition from '../utils/fade-height-transition.vue';

export default {
  name: 'notification-actions',
  components: {
    ActionButton,
    FadeHeightTransition
  },
  inject: {
    notificationNode: {
      type: Object,
      required: true
    }
  },
  props: {
    buttons: {
      type: Array,
      required: true
    },
    handler: {
      type: Function,
      default: undefined
    },
    interactive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: {}
    };
  },
  methods: {
    async handleClick(button) {
      const setLoading = (value) => this.$set(this.isLoading, button.action, value);
      const handler = button.handler || this.handler;
      try {
        setLoading(true);
        if (handler) {
          const { action, title } = button;
          await handler({ action, title }, this.notificationNode.notification);
        }
        this.notificationNode.$emit('action-process', {
          action: button.action,
          interactive: this.interactive
        });
      } finally {
        setLoading(false);
      }
    },
    preventHover() {
      this.hoverChange(false);
    },
    restoreHover() {
      this.hoverChange(true);
    },
    hoverChange(value) {
      this.notificationNode.$emit('hoverable-change', value);
    }
  }
}
</script>

<style lang="scss">
.notif-actions,
.notif-actions-result {
  margin-left: var(--notification-actions-offset-left);
}
.notif-actions {
  display: flex;
  margin-top: 15px;
  margin-right: -5px;
  > * {
    margin-right: 5px;
    flex-grow: 1;
  }
}
.notif-actions-result {
  margin-top: 11px;
  color: #595857;
}
</style>