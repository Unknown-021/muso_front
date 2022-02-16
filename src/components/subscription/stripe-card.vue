<template>
  <div class="stripe-card">
    <form id="payment-form" class="payment-form" @submit.prevent="purchase">
      <payment-logos :value="activePaymentBrand" class="mobile-only mb-m" />
      <stripe-input
        type="text"
        v-model="fullName"
        placeholder="Name on Card"
        autocorrect="off"
        spellcheck="false"
        class="mb-stripe-input"
      />
      <stripe-input
        placeholder="Card Number"
        element="cardNumber"
        class="mb-stripe-input"
        @change="activePaymentBrand = $event.brand"
      />
      <div class="payment-form__input-raw">
        <stripe-input
          class="payment-form__input-mini"
          placeholder="Exp.Date"
          element="cardExpiry"
        />
        <stripe-input
          class="payment-form__input-mini"
          placeholder="CVV"
          element="cardCvc"
        />
      </div>

      <template v-if="mode === 'pay'">
        <brand-button
          class="payment-form__button"
          :disabled="!isValidForm"
          :loading="loading"
        >
          Subscribe
        </brand-button>
      </template>

      <template v-else-if="mode === 'update'">
        <div class="payment-form__buttons-group">
          <action-button type="reset" @click="cancel">
            Cancel
          </action-button>
          <action-button variant="primary" :disabled="!isValidForm" :loading="loading">
            Save
          </action-button>
        </div>
      </template>
    </form>
  </div>
</template>

<script>
import BrandButton from "components/ui/brand-button";
import ActionButton from 'components/ui/action-button.vue';
import StripeInput from "components/subscription/stripe-input";
import PaymentLogos from './payment-logos.vue';
import { createPaymentMethod, handleSubscription } from "services/stripe";

export default {
  name: 'stripe-card',
  components: {
    BrandButton,
    ActionButton,
    StripeInput,
    PaymentLogos
  },
  data() {
    return {
      loading: false,
      fullName: null,
      isValidForm: true,
      activePaymentBrand: 'unknown'
    }
  },
  props: {
    mode: {
      type: String,
      default: 'pay'
    },
  },
  methods: {
    async purchase() {
      try {
        this.loading = true;
        const paymentMethod = await createPaymentMethod({
          name: this.fullName,
        });
        let data;
        if (this.mode === 'update') {
          data = await this.$store.dispatch('payment/updateSubscription', {
            toStripe: true,
            paymentMethodId: paymentMethod.id,
          });
        } else {
          data = await this.$store.dispatch('payment/createStripeSubscription', {
            paymentMethodId: paymentMethod.id,
          });
        }
        await handleSubscription(data.subscription);
        this.$emit('success');
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.loading = false;
      }
    },
    cancel() {
      this.$emit('cancel');
    }
  },
}
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract.scss";

.payment-form {
  --action-button-min-width: 120px;
  &__input-mini {
    width: 50%;
    margin-right: 20px;
  }
  &__input-raw {
    display: flex;
    margin-right: -20px;
  }
  &__button {
    margin-top: 30px;
    width: 100%;
    @media #{$before-tablet} {
      margin-top: 44px;
    }
  }
  &__buttons-group {
    margin-top: 40px;
    display: flex;
    justify-content: flex-end;
    button {
      margin-right: 10px;
    }
    :last-child {
      margin-right: 0;
    }
  }
}
</style>