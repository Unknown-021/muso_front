<template>
  <section class="pymt-card" :data-loading="loadingScripts">
    <transition name="fade-fast" mode="out-in">
      <base-loader v-if="loadingScripts" class="pymt-card__loader" />
    </transition>
    <div class="payment-buttons">
      <paypal-button
        :mode="mode"
        v-on="listeners"
      />
      <stripe-button
        :mode="mode"
        element="paymentRequestButton"
        v-on="listeners"
      />
    </div>
    <p class="lined-text my-lined-text">
      <template v-if="mode === 'pay'">or pay another way</template>
      <template v-else>or</template>
    </p>
    <stripe-card :mode="mode" v-on="listeners" />

    <slot />
  </section>
</template>

<script>
import StripeCard from 'components/subscription/stripe-card';
import StripeButton from 'components/subscription/stripe-button';
import PaypalButton from 'components/subscription/paypal-button';
import BaseLoader from 'components/ui/loader.vue';
import { createInstance } from 'services/stripe';
import { loadScript } from 'services/paypal';

const modes = ['pay', 'update'];

export default {
  name: 'payment-card',
  components: {
    StripeCard,
    StripeButton,
    PaypalButton,
    BaseLoader
  },
  props: {
    mode: {
      type: String,
      validator: value => modes.includes(value)
    }
  },
  data() {
    return {
      loadingScripts: false
    }
  },
  mounted() {
    this.loadScripts();
  },
  computed: {
    listeners() {
      return {
        success: () => this.$emit('success'),
        cancel: () => this.$emit('cancel')
      };
    }
  },
  methods: {
    async loadScripts() {
      try {
        this.loadingScripts = true;
        await Promise.all([
          createInstance(),
          loadScript({ nonce: this.$root.nonce })
        ]);
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.loadingScripts = false;
      }
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract.scss";
@import "~assets/styles/utils/spacing.abstract.scss";

.payment-buttons {
  display: flex;
  flex-direction: column;
  min-height: 40px;
  > * {
    margin-bottom: 5px;
  }
  :last-child {
    margin-bottom: 0;
  }
}

.pymt-card {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 24px 16px;
  width: 100%;
  max-width: 470px;
  border-radius: 8px;
  line-height: 1.2;
  color: var(--overlay-2-color);
  background: #21201F;
  @media #{$tablet} {
    padding: 30px;
  }
  &[data-loading] {
    &::before {
      content: "";
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #21201F;
      opacity: 0.4;
      border-radius: 8px;
    }
  }
  &__loader {
    position: absolute;
    z-index: 2;
    top: 60px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    transform: scale(0.8);
  }
}
</style>
