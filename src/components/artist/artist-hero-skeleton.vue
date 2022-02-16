<template>
  <div class="artist-hero artist-hero--skeleton">
    <div class="artist-hero__img artist-hero__img--empty">
      <div class="artist-hero__img-shadow" />
    </div>

    <div class="artist-hero__info mobile-only">
      <div class="artist-hero__title-wrap">
        <skeleton class="xxlong doubleHeight o8" style="height: 20px;" />
        <skeleton class="short o8" style="height: 20px;" />
      </div>
      <skeleton class="short o6" style="margin-top: 12px;" />
      <skeleton class="o8 thin" style="margin-top: 10px;" />
    </div>

    <div class="artist-hero__second-info mobile-only" style="margin-top: 25px;">
      <skeleton class="fullWidth thin o8 mb-10" />
      <skeleton class="xxlong thin o8" />
    </div>

    <div class="artist-hs__body d-none d-md-flex flex-column">
      <skeleton class="artist-hs__title xxlong fullHeight o8 mt-10 mb-15" />
      <skeleton class="xlong o8 mb-10" />
      <skeleton class="o8 thin mb-5" style="width: 515px;" />
      <skeleton class="o8 thin xxlong" />
      <div class="d-flex mt-15">
        <skeleton class="mr-20" v-for="meta in 3" :key="meta" />
      </div>
    </div>
  </div>
</template>

<script>
import Skeleton from "components/ui/skeleton";

export default {
  name: 'artist-hero-skeleton',
  components: {
    Skeleton
  }
};
</script>

<style lang="scss">
.mobile-only {
  @media (min-width: 768px) {
    display: none !important;
  }
}

.artist-hero {
  &__img {
    @at-root .artist-hero--skeleton & {
      @media (min-width: 768px) {
        border-radius: 100%;
        background-color: #21201f;
      }
    }
  }
}
</style>