<template>
  <article class="payment-method">
    <h2 class="payment-method__title">Payment method</h2>
    <div class="payment-method__details">
      <payment-details-factory :subscription="subscription" />
      <payment-billing-date class="mt-s" :subscription="subscription" />
    </div>

    <slot name="after" />
  </article>
</template>

<script>
import PaymentDetailsFactory from './payment-details-factory.vue';
import PaymentBillingDate from './payment-billing-date.vue';

export default {
  name: 'payment-method',
  components: {
    PaymentDetailsFactory,
    PaymentBillingDate
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
.payment-method {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  &__title {
    margin-bottom: 20px;
    width: 100%;
    color: var(#F7F7F7);
    font-size: 20px;
    font-weight: 500;
  }
  &__details {
    display: flex;
    flex-direction: column;
  }
  &__last-digits {
    margin-left: 3px;
  }
}
</style>
