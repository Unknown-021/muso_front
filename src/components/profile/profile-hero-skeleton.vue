<template>
  <div class="profile-hs mt-md-0">
    <skeleton class="profile-hs__img img rounded" />

    <div class="profile-hs__body-mobile d-flex d-md-none flex-column">
      <skeleton class="xxlong doubleHeight o8 mb-10" />
      <skeleton class="o8" />
    </div>

    <div class="profile-hs__details-mobile">
      <skeleton class="fullWidth thin o8 mb-10" />
      <skeleton class="xxlong thin o8" />
    </div>

    <div class="profile-hs__body d-none d-md-flex flex-column">
      <skeleton class="profile-hs__title xxlong fullHeight o8 mt-10 mb-15" />
      <skeleton class="xlong o8 mb-10" />
      <skeleton class="o8 thin mb-5" style="width: 515px;" />
      <skeleton class="o8 thin xxlong" />
      <!-- <div class="d-flex mt-15">
        <skeleton class="mr-20" v-for="meta in 3" :key="meta" />
      </div> -->
    </div>
  </div>
</template>

<script>
import Skeleton from "components/ui/skeleton";

export default {
  name: 'profile-hero-skeleton',
  components: {
    Skeleton
  }
};
</script>

<style lang="scss">
.profile-hs {
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
    flex-wrap: wrap;
    padding-bottom: 5px;
  }
  &__img[class] {
    width: 112px;
    height: 112px;
    margin-right: 24px;
    @media (min-width: 768px) {
      width: 132px;
      height: 132px;
      margin-right: 28px;
    }
  }
  &__body-mobile {
    width: 0;
    flex-grow: 1;
    @media (min-width: 768px) {
      display: none;
    }
  }
  &__title {
    width: 345px;
    height: 40px;
  }
  &__details-mobile {
    margin-top: 20px;
    width: 100%;
    @media (min-width: 768px) {
      display: none;
    }
  }
}
</style>