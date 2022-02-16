<template>
  <div class="details-container">
    <div class="mobile-only details-column details-column--skel">
      <details-skeleton />
    </div>
    <template v-for="(column, index) in 3">
      <div :key="index" class="details-column details-column--skel">
        <details-skeleton v-for="cell in (index === 0 ? 3 : 2)" :key="cell" />
      </div>
    </template>
  </div>
</template>

<script>
import Skeleton from "components/ui/skeleton";

const DetailsSkeleton = () => (
  <div class="details">
    <div class="details__title">
      <skeleton class="short o8" />
    </div>
    <div class="details__text">
      <skeleton class="middle mr-0" />
    </div>
  </div>
);

export default {
  name: 'song-details-skeleotn',
  components: {
    Skeleton,
    DetailsSkeleton
  },
  methods: {
    detailsClass(column) {
      if (column === 3) {
        return 'mobile-none';
      }
    }
  }
};
</script>
