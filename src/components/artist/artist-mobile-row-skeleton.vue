<script>
import Skeleton from 'components/ui/skeleton.vue';

export default {
  name: 'artist-mobile-row-skeleton',
  functional: true,
  render: (h, context) => (
    <div class="media">
      <Skeleton class="media__small-img rounded" />
      <div class="media__content">
        <Skeleton class="media-skel__mb long thin o6" />
        <Skeleton class="short thin o8" />
      </div>
    </div>
  )
};
</script>
