<template>
  <p class="payment-date">
    <template v-if="subscription.status === 'suspended'">
      You may continue to use Muso.AI PRO until 
    </template>
    <template v-else>
      Your next billing date is 
    </template>
    <time class="payment-date__date">{{ $date(subscription.nextBillingTime) }}</time>.
  </p>
</template>

<script>
export default {
  name: 'payment-billing-date',
  props: {
    subscription: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.payment-date {
  color: var(--overlay-3-color);
  &__date {
    font-weight: 700;
  }
}
</style>