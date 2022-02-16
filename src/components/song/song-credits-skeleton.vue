<template>
  <div>
    <modal-section-skeleton v-if="song.artists.length" :row-count="song.artists.length" />
    <modal-section-skeleton :row-count="3" />
  </div>
</template>

<script>
import Skeleton from 'components/ui/skeleton';
import CollaboratorCreditsTable from 'components/collaborator/collaborator-credits-table.vue';

const ModalSectionSkeleton = {
  name: 'modal-section-skeleton',
  functional: true,
  props: {
    rowCount: {
      type: Number,
      required: true
    }
  },
  render: (h, { props }) => {
    return (
      <div class="modal-section">
        <div class="modal-section-title">
          <Skeleton class="long" />
        </div>
        <CollaboratorCreditsTable credits={[]} loading={true} rowSkeletonCount={props.rowCount} />
      </div>
    );
  }
};

export default {
  name: 'song-credits-skeleton',
  components: {
    Skeleton,
    ModalSectionSkeleton
  },
  props: {
    song: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
</style>
