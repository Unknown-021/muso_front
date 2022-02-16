export default {
  functional: true,
  name: 'table-cell-plain',
  props: ['value'],
  render(h, context) {
    // _v method allows to render plain text without having to create wrapper like <div> or </span>
    return context._v(context.props.value);
  }
};
