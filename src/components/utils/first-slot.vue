<script>
export default {
  name: 'first-slot',
  // Here we will pass listeners only to first slots child
  render(h) {
    if (!this.$scopedSlots.default) {
      return null;
    }

    const [firstChild] = this.$scopedSlots.default({});
    if (!firstChild) {
      return null;
    }
    return firstChild;
  }
}
</script>