<template>
  <div class="paypal-button">
    <div ref="elementRef" class="paypal-button__control" />
  </div>
</template>

<script>
import { paypalReady, createButton } from 'services/paypal';
import { transitionSafeDestroyed } from 'mixins/transition-safe-destroyed';

export default {
  name: 'paypal-button',
  mixins: [transitionSafeDestroyed],
  props: {
    mode: {
      type: String,
    },
  },
  data() {
    return {
      button: null
    };
  },
  async mounted() {
    await paypalReady;

    const style = {
      label: this.mode === 'pay' ? 'pay' : 'paypal'
    };
    this.button = createButton({
      style,
      userId: this.currentUser.id,
      createSubscription: this.createPaypalSubscription,
      onApprove: this.onSuccess,
      onError: error => this.$handleError(error)
    });
    if (this.$refs.elementRef) {
      this.button.render(this.$refs.elementRef);
    }
  },
  removed() {
    if (this.button) {
      this.button.close();
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters['user/data'];
    }
  },
  methods: {
    async createPaypalSubscription() {
      if (this.mode === 'update') {
        return this.$store.dispatch('payment/updateSubscription', { toPaypal: true });
      } else {
        return this.$store.dispatch('payment/createPaypalSubscription');
      }
    },
    async onSuccess() {
      await this.$store.dispatch('payment/updatePaypalSubscription');
      this.$emit('success');
    }
  },
};
</script>

<style lang="scss">
.paypal-button {
  &__control {
    display: flex;
  }
}
</style>
