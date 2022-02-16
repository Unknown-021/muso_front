<script>
import Skeleton from 'components/ui/skeleton.vue';

export default {
  name: 'song-mobile-row-skeleton',
  functional: true,
  render: (h, context) => (
    <div class="media">
      <Skeleton class="media__small-img" />
      <div class="media__content">
        <Skeleton class="media-skel__mb long thin o6" />
        <Skeleton class="short thin o8" />
      </div>
    </div>
  )
};
</script>
