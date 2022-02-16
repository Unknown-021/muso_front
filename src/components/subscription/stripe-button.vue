<template>
  <div class="stripe-button">
    <div ref="elementRef" class="stripe-button__control">
      <!-- A Stripe Element will be inserted here. -->
    </div>
  </div>
</template>

<script>
import { stripeReady, paymentRequest, createElement, handleSubscription } from 'services/stripe';
import { transitionSafeDestroyed } from 'mixins/transition-safe-destroyed';

export default {
  name: 'stripe-button',
  mixins: [transitionSafeDestroyed],
  props: {
    element: {
      type: String,
      default: ''
    },
    mode: {
      type: String
    }
  },
  data() {
    return {
      el: null
    };
  },
  async mounted() {
    await stripeReady;
    const pr = await paymentRequest(this.paymentRequest);
    this.el = await createElement(this.element, { paymentRequest: pr });
    // Check the availability of the Payment Request API first.
    const result = await pr.canMakePayment();

    if (result) {
      this.el.mount(this.$refs.elementRef);
      pr.on('paymentmethod', this.handleSubscription);
    } else if (this.$refs.elementRef) {
      this.$refs.elementRef.classList.add('hidden');
    }
  },
  removed() {
    this.el?.destroy();
  },
  computed: {
    paymentRequest() {
      return this.$store.getters['payment/paymentRequest'];
    }
  },
  methods: {
    async handleSubscription(event) {
      try {
        const data = await this.getSubscription(event);
        await handleSubscription(data.subscription);
        event.complete('success');
        this.$emit('success', true);
      } catch (error) {
        event.complete('fail');
        this.$handleError(error);
      }
    },
    getSubscription(event) {
      const paymentMethodId = event.paymentMethod.id;

      if (this.mode === 'update') {
        return this.$store.dispatch('payment/updateSubscription', {
          toStripe: true,
          paymentMethodId
        });
      } else {
        return this.$store.dispatch('payment/createStripeSubscription', {
          paymentMethodId
        });
      }
    }
  }
};
</script>

<style lang="scss">
</style>
