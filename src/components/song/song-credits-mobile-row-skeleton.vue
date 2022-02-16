<script>
import Skeleton from 'components/ui/skeleton.vue';

export default {
  name: 'song-credits-mobile-row-skeleton',
  functional: true,
  render() {
    return (
      <div class="media media--tall-skel">
        <Skeleton class="media__img" />
        <div class="media__content song-cmrs__content">
          <div class="media__main-info">
            <Skeleton class="media-skel__mb long thin o6" />
            <Skeleton class="middle thin" />
            <Skeleton class="media-skel__text xlong thin o6" />
          </div>
          <div class="media__meta-info">
            <Skeleton class="media-skel__mb short thin o6" />
            <Skeleton class="short thin o8" />
          </div>
        </div>
      </div>
    );
  }
}
</script>

<style lang="scss">
.song-cmrs {
  &__content[class] {
    flex-direction: row;
    padding-top: 3px;
  }
}
</style>