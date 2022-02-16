<template>
  <div class="manage-subscription">
    <div>
      <p class="manage-subscription__title">
        Your account is on the Muso.AI <pro-badge /> Plan
      </p>

      <!-- hidden button for reactivation, just for test (reactivate/cancel flow) -->
      <template v-if="false">
        <plain-button
          variant="primary"
          @click="reactivateSubscription"
        >
          Reactivate Membership
        </plain-button>
      </template>

      <div class="manage-subscription__divider my-xl" />

      <payment-method :subscription="subscription">
        <template v-if="!canceledSubscription" #after>
          <plain-button @click="updateSubscription">
            Update payment info
          </plain-button>
        </template>
      </payment-method>
    </div>
    <div class="manage-subscription__footer">
      <cancel-subscription-button v-if="!canceledSubscription" />
    </div>
  </div>
</template>

<script>
import ProBadge from 'components/ui/pro-badge.vue';
import PaymentMethod from 'components/subscription/payment-method';
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import CancelSubscriptionButton from './cancel-subscription-button';

export default {
  name: 'manage-subscription',
  components: {
    ProBadge,
    PlainButton,
    PaymentMethod,
    CancelSubscriptionButton,
  },
  computed: {
    canceledSubscription() {
      return this.subscription?.status === 'suspended';
    },
    subscription() {
      return this.$store.getters['payment/subscription'];
    },
  },
  methods: {
    async reactivateSubscription() {
      try {
        await this.$store.dispatch('payment/reactivateSubscription');
      } catch (error) {
        this.$handleError(error);
      }
    },
    async getSubscription() {
      try {
        await this.$store.dispatch('payment/getSubscription');
      } catch (error) {
        this.$handleError(error);
      }
    },
    async updateSubscription() {
      const modal = await this.$modal.open({
        name: 'update-payment',
      });
      modal.$on('success', this.getSubscription);
    }
  },
}
</script>

<style lang="scss">
.manage-subscription {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--modal-padding-x);
  &__title {
    font-weight: 500;
  }
  &__divider {
    border-bottom: 1px solid var(--border-color-3);
  }
  &__cancel-button {
    width: 158px;
  }
  &__payment-method {
    display: flex;
    justify-content: space-between;
    & > div {
      display: flex;
      align-items: center;
    }
  }
  &__footer {
    margin-top: auto;
    padding-top: 20px;
  }
}
</style>