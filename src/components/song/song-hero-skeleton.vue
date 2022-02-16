<template>
  <div>
    <div class="song-hero-skeleton">
      <skeleton class="large-img large-img--responsive" />

      <div class="song-hero-skeleton__body">
        <skeleton class="fullHeight xlong o8 mb-15" />
        <skeleton class="o6" />
        <skeleton class="song-hero-skeleton__stats o6 xxlong" />
      </div>
    </div>
    <song-details-skeleton />
  </div>
</template>

<script>
import Skeleton from "components/ui/skeleton";
import HorizontalLine from "components/ui/horizontal-line";
import SongDetailsSkeleton from 'components/song/details-skeleton';

export default {
  name: "song-hero-skeleton",
  components: {
    Skeleton,
    HorizontalLine,
    SongDetailsSkeleton
  },
};
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract";

.song-hero-skeleton {
  display: flex;
  padding-bottom: 23px;
  @media #{$tablet} {
    padding-bottom: 30px;
  }
  &__body {
    margin-left: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__stats {
    margin-top: 30px;
    @media #{$before-tablet} {
      display: none;
    }
  }
}
</style>
