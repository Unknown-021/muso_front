<script>
import Skeleton from 'components/ui/skeleton.vue';

export default {
  name: 'collaborator-row-skeleton',
  functional: true,
  render() {
    return (
      <div class="media">
        <Skeleton class="media__avatar-img" />
        <div class="media__content">
          <Skeleton class="middle thin" />
          <Skeleton class="media-skel__text xlong thin o6" />
        </div>
      </div>
    );
  }
}
</script>
