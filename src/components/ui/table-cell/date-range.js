export default {
  name: 'cell-date-range',
  props: {
    dateStart: {
      type: String,
      default: undefined
    },
    dateEnd: {
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
    return this._v(this.dateRange);
  },
  computed: {
    dateRange() {
      if (!this.dateStart || !this.dateEnd) {
        return '-';
      }
      const dateEndObj = new Date(this.dateEnd);
      const dateStartObj = new Date(this.dateStart);
      return `${this.$date(dateStartObj, this.format)}—${this.$date(dateEndObj, this.format)}`;
    }
  }
};
