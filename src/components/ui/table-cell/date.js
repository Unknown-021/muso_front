export default {
  name: 'cell-date',
  props: {
    value: {
      type: String,
      default: undefined
    },
    format: {
      type: String,
      default: 'primary' // primary, short
    }
  },
  render(h) {
    // _v method allows to render plain text without having to create wrapper like <div> or </span>
    return this._v(this.date);
  },
  computed: {
    date() {
      if (!this.value) {
        return '-';
      }
      const dateObj = new Date(this.value);
      return this.$date(dateObj, this.format);
    }
  }
};
