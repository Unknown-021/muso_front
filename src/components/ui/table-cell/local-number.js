export default {
  functional: true,
  name: 'table-cell-number',
  props: {
    value: {
      type: Number,
      default: 0,
      required: true
    }
  },
  render(h, context) {
    const { value } = context.props;
    // _v method allows to render plain text without having to create wrapper like <div> or </span>
    return context._v(context.parent.$number(value));
  }
};
