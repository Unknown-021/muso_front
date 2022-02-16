export const BaseTableCell = {
  functional: true,
  props: {
    cell: {
      type: Object,
      required: true
    }
  },
  render(h, { props, data }) {
    const { cell } = props;
    
    return (<cell.component attrs={cell.props} {...data} />);
  }
};
