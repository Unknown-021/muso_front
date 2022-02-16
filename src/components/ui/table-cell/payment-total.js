export default {
  name: 'cell-payment-total',
  props: {
    status: {
      type: String,
      default: undefined
    },
    amount: {
      type: Number,
      default: undefined
    },
  },
  render(h) {
    // _v method allows to render plain text without having to create wrapper like <div> or </span>
    return this._v(this.paymentTotal);
  },
  computed: {
    paymentTotal() {
      if (!this.amount && !this.status) {
        return '-';
      }
      if (this.status === 'failed') {
        return 'Failed';
      }
      // Handle the currency in case we'll have different currencies
      return `$${this.amount}`;
    }
  }
};
