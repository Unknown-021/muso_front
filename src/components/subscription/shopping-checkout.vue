<template>
  <card-section>
    <template #title>Review Your Order</template>
    <template #description>{{ $price(paymentRequest.total.amount) }}/month</template>
    <payment-card mode="pay" @success="handleSuccess">
      <router-link
        class="card-back-nav"
        :to="subscriptionRoute"
        aria-label="Go to shopping cart"
      >
        <base-icon name="arrow-left" width="16" />
      </router-link>
    </payment-card>
  </card-section>
</template>

<script>
import mobileRouter from 'services/mobile-app-router';
import PaymentCard from './payment-card.vue';
import BaseIcon from 'components/ui/base-icon/base-icon';
import CardSection from 'components/ui/card-section.vue';
import { TrackingEvent } from 'config/tracking-event';
import { fbq } from 'services/facebook-pixel/facebook-pixel';
import { shoppingCartPayload } from 'store/modules/payment/payment.events';

export default {
  name: 'shopping-checout',
  components: {
    PaymentCard,
    BaseIcon,
    CardSection
  },
  computed: {
    paymentListeners() {
      return {
        success: this.handleSuccess
      };
    },
    paymentRequest() {
      return this.$store.getters['payment/paymentRequest'];
    },
    subscriptionRoute() {
      return {
        name: 'subscription',
        // We want to keep query since we store there redirection link
        query: this.$route.query
      };
    }
  },
  methods: {
    async handleSuccess() {
      fbq(TrackingEvent.SUBSCRIBE, shoppingCartPayload(this.paymentRequest));

      if ('successRedirect' in this.$route.query) {
        const alert = await this.$notify('Payment complete', 'info', 1500);
        alert.$on('close', () => {
          // Branch.io link doesn't work properly if we perform programatic navigation:
          // user gets redirected to muso website or AppStore/Google Play instead of opening app
          // on specified page. That's why we use here programmatic/manual navigation.
          mobileRouter.push({ name: 'analytics-paid' });
        });
      } else {
        await this.$router.push({ name: 'shopping-success' });
      }
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract";

.card-back-nav {
  position: absolute;
  top: 2px;
  right: 100%;
  margin-right: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transition: transform 150ms ease-in-out;
  @media #{$before-tablet} {
    display: none;
  }
  &:hover {
    transform: translateX(-2px);
  }
}
</style>
