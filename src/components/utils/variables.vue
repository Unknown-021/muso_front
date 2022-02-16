<script>
export default {
  name: 'variables',
  functional: true,
  render(h, { scopedSlots, data }) {
    const slot = scopedSlots.default;
    if (!slot) {
      return null;
    }

    return slot(data.attrs);
  }
}
</script>