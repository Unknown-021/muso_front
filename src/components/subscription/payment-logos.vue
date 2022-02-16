<template>
  <div class="payment-logos">
    <template v-for="item in brands">
      <img
        :key="item.key"
        :src="item.src"
        :srcset="item.srcset.join(', ')"
        :sizes="sizes"
        :alt="`We accept ${item.name}`"
        class="payment-logo"
        :data-active="value === 'unknown' || item.key === value"
      />
    </template>
  </div>
</template>

<script>
// TODO: Refactor later
const brands = [{
  key: 'visa',
  name: 'Visa',
  src: 'images/logos/visa@80w.png',
  srcset: [
    'images/logos/visa@80w.png 80w',
    'images/logos/visa@120w.png 120w',
  ]
}, {
  key: 'mastercard',
  name: 'MasterCard',
  src: 'images/logos/mastercard@80w.png',
  srcset: [
    'images/logos/mastercard@80w.png 80w',
    'images/logos/mastercard@120w.png 120w',
  ]
}, {
  key: 'amex',
  name: 'AmericanExpress',
  src: 'images/logos/american-express@80w.png',
  srcset: [
    'images/logos/american-express@80w.png 80w',
    'images/logos/american-express@120w.png 120w',
  ]
}];

export default {
  name: 'payment-logos',
  props: {
    value: {
      type: String,
      default: 'unknown'
    },
    sizes: {
      type: String,
      default: '40px'
    },
  },
  computed: {
    brands() {
      return brands;
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract.scss";

.payment-logos {
  display: flex;
  align-items: center;
  --payment-logo-height: 24px;
  --payment-logo-gap: 8px;
  @media #{$tablet} {
    --payment-logo-gap: 6px;
    --payment-logo-height: 16px;
  }
  > * {
    margin-right: var(--payment-logo-gap);
    height: var(--payment-logo-height);
    &:last-child {
      margin-right: 0;
    }
  }
}
.payment-logo {
  height: var(--payment-logo-height);
  transition: opacity 150ms ease-in-out;
  &:not([data-active]) {
    opacity: 0.4;
  }
}
</style>