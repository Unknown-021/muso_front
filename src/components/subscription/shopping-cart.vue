<template>
  <card-section>
    <template #title>Review Your Order</template>
    <template #description>&nbsp;</template>

    <div class="pymt-card">
      <p class="title-4">Muso.AI Pro <span class="t-sub">({{ $price(Pricing.PRO_SUBSCRIPTION) }})</span></p>
      <p>Analytics for <span class="c-primary">your</span> profile and artists</p>
      <horizontal-line class="my-l" :broadless="false" />
      <div class="text-section">
        <div>
          <p class="title-4">Discovery Seats <span class="t-sub">({{ $price(Pricing.DISCOVERY_SEAT) }})</span></p>
          <p>View analytics for <span class="c-primary">any</span> profile or artist on Muso.ai</p>
        </div>
        <number-picker class="text-section__end" :value.sync="discoverySeats" :min="0" />
      </div>
      <horizontal-line class="my-l" :broadless="false" />
      <p class="text-section title-4">
        Starting Today <span class="text-section__end">{{ $price(paymentRequest.total.amount) }}/month</span>
      </p>
      <p class="text-section title-4 mt-xs">
        Next Billing Date
        <time class="text-section__end" :datetime="nextBillingDate.toISOString()">
          {{ $date(nextBillingDate, 'primary') }}
        </time>
      </p>
      <brand-button class="mt-xl" @click="next">Continue</brand-button>
    </div>
  </card-section>
</template>

<script>
import CardSection from 'components/ui/card-section.vue';
import HorizontalLine from 'components/ui/horizontal-line.vue';
import NumberPicker from 'components/ui/number-picker.vue';
import BrandButton from 'components/ui/brand-button';
import { Pricing } from 'store/modules/payment/payment';
import { TrackingEvent } from 'config/tracking-event';
import { fbq } from 'services/facebook-pixel/facebook-pixel';
import { shoppingCartPayload } from 'store/modules/payment/payment.events';

export default {
  name: 'shopping-cart',
  components: {
    CardSection,
    HorizontalLine,
    NumberPicker,
    BrandButton
  },
  computed: {
    Pricing() {
      return Pricing;
    },
    discoverySeats: {
      get() {
        return this.$store.getters['payment/discoverySeats'];
      },
      set(value) {
        this.$store.commit('payment/setDiscoverySeats', value);
      }
    },
    paymentRequest() {
      return this.$store.getters['payment/paymentRequest'];
    },
    nextBillingDate() {
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      return date;
    }
  },
  methods: {
    next() {
      fbq(TrackingEvent.ADD_TO_CART, shoppingCartPayload(this.paymentRequest));
      this.$router.push({
        name: 'shopping-checkout',
        // We want to keep query since we store there redirection link
        query: this.$route.query
      });
    }
  }
}
</script>
