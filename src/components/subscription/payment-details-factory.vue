<template>
  <div class="payment-details">
    <template v-if="subscription.isStripeSubscription">
      <payment-logo :value="subscription.card.brand" />
      <span class="payment-details__info">•••• •••• ••••</span>
      <span class="payment-details__last-digits ellipsis">{{ subscription.card.last4 }}</span>
    </template>

    <template v-else-if="subscription.isPaypalSubscription">
      <payment-logo class="payment-details__paypal" value="paypal" />
      <span class="payment-details__info ellipsis">{{ subscription.subscriber.email }}</span>
    </template>
  </div>
</template>

<script>
import PaymentLogo from 'components/subscription/payment-logo';

export default {
  name: 'payment-details-factory',
  components: {
    PaymentLogo
  },
  props: {
    subscription: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
.payment-details {
  display: flex;
  line-height: 1.45;
  font-weight: 500;
  &__last-digits {
    margin-left: 4px;
  }
  &__info {
    margin-left: 12px;
  }
  &__paypal {
    margin-bottom: -2px;
  }
}
</style>
