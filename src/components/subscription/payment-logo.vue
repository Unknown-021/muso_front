<template>
  <div class="pmt-logo">
    <img
      :key="item.key"
      :src="item.src"
      :srcset="item.srcset.join(', ')"
      :sizes="sizes"
      :alt="`We accept ${item.name}`"
    />
  </div>
</template>

<script>
const brands = {
  visa: {
    name: 'Visa',
    src: 'images/logos/visa@80w.png',
    srcset: [
      'images/logos/visa@80w.png 80w',
      'images/logos/visa@120w.png 120w',
    ]
  },
  mastercard: {
    name: 'MasterCard',
    src: 'images/logos/mastercard@80w.png',
    srcset: [
      'images/logos/mastercard@80w.png 80w',
      'images/logos/mastercard@120w.png 120w',
    ]
  },
  amex: {
    name: 'AmericanExpress',
    src: 'images/logos/american-express@80w.png',
    srcset: [
      'images/logos/american-express@80w.png 80w',
      'images/logos/american-express@120w.png 120w',
    ]
  },
  paypal: {
    name: 'Paypal',
    src: 'images/logos/paypal@80w.png',
    srcset: [
      'images/logos/paypal@80w.png 80w',
      'images/logos/paypal@120w.png 120w',
    ]
  },
}

export default {
  name: 'payment-logo',
  props: {
    value: {
      type: String,
      default: 'visa'
    },
    sizes: {
      type: String,
      default: '40px'
    },
  },
  computed: {
    item() {
      return brands[this.value];
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract.scss";

.pmt-logo {
  display: flex;
  align-items: center;
  --payment-logo-height: 24px;
  @media #{$tablet} {
    --payment-logo-height: 16px;
  }
  > * {
    height: var(--payment-logo-height);
  }
}
</style>