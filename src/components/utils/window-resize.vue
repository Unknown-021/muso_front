<script>
export default {
  name: 'window-resize',
  render() {
    const content = this.$scopedSlots.default
      ? this.$scopedSlots.default({})
      : null;

    return content;
  },
  mounted() {
    window.addEventListener('resize', this.handleChange);
  },
  beforeDestroy() {
    window.removeEventListener('reisze', this.handleChange);
  },
  methods: {
    handleChange(event) {
      window.requestAnimationFrame(() => {
        this.$emit('change', event)
      });
    }
  }
}
</script>