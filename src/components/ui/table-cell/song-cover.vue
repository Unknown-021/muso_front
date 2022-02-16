<script>
export default {
  functional: true,
  name: 'table-cell-song-cover',
  props: {
    song: {
      type: Object,
      required: true
    }
  },
  render(h, { data, props }) {
    return <img
      class="song-cover-cell"
      src={props.song.avatarUrl}
      width="40"
      height="40"
      {...data}
    />
  }
};
</script>

<style lang="scss">
.song-cover-cell {
  display: block;
}
</style>
