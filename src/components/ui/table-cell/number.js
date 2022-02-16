import NumberFilter from 'filters/number';

export default {
  functional: true,
  name: 'table-cell-number',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  render(h, context) {
    const value = NumberFilter(context.props.value, true);
    // _v method allows to render plain text without having to create wrapper like <div> or </span>
    return context._v(value);
  }
};
