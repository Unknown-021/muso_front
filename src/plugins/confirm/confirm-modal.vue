<template>
  <action-modal
    :show.sync="isShowModal"
    :closable="false"
    :transition-events="transitionEvents"
  >
    <h2 class="action-modal-title">{{ title }}</h2>
    <div class="action-modal-body">
      <p>{{ body }}</p>
    </div>
    <div class="action-modal-footer">
      <action-button :disabled="isLoading" v-bind="okButton.props" @click="_handleOk">
        {{ okText }}
      </action-button>
      <action-button @click="_handleCancel" v-bind="cancelButton.props">
        {{ cancelText }}
      </action-button>
    </div>
  </action-modal>
</template>

<script>
import ActionModal from 'components/ui/base-action-modal/base-action-modal.vue';
import ActionButton from 'components/ui/action-button.vue';

const noop = () => {};

export default {
  name: 'confirm-modal',
  components: {
    ActionModal,
    ActionButton
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    },
    okButton: {
      type: Object,
      default() {
        return {};
      }
      /*
        {
          text: 'Delete',
          props: {
            variant: 'danger'
          },
          handler() {
            return new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      */
    },
    cancelButton: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  data() {
    return {
      isShowModal: true,
      isLoading: false
    };
  },
  computed: {
    okText() {
      return this.okButton.text || 'Ok';
    },
    cancelText() {
      return this.cancelButton.text || 'Cancel';
    },
    transitionEvents() {
      return {
        'after-leave': this._destroy
      };
    }
  },
  methods: {
    async _handleOk() {
      const handler = this.okButton.handler || noop;
      try {
        this.isLoading = true;
        await handler();
        this.hide();
      } finally {
        this.isLoading = false;
      }
    },
    _handleCancel() {
      const handler = this.cancelButton.handler || noop;

      handler();
      this.hide();
    },
    hide() {
      this.isShowModal = false;
    },
    _destroy() {
      this.$destroy();
    }
  }
}
</script>
