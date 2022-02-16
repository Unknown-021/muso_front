<script>
export default {
  name: 'external-slot',
  functional: true,
  props: {
    source: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      default: 'default'
    }
  },
  render(h, { props, data }) {
    const { source, name } = props;
    const children = source.$slots[name] || renderSlot(source.$scopedSlots[name], data.attrs);
    return children;
  }
}

function renderSlot(slot, props) {
  if (slot) {
    return slot(props);
  }
}
</script>