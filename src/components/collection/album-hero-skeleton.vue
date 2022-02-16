<template>
  <div>
    <div class="album-hero-skel">
      <skeleton class="large-img center" />

      <div class="album-hero-skel__mobile">
        <skeleton class="center o8 xxlong mt-20" style="height: 20px" />
        <skeleton class="xxmiddle o8 thin center" style="margin-top: 12px; margin-bottom: 3px;" />
      </div>

      <div class="album-hero-skel-desktop">
        <skeleton class="fullHeight xxlong o8 mb-15" />
        <skeleton class="xxlong o6 mb-15" />
        <skeleton class="o6" />

        <skeleton class="album-hero-skel-desktop__stats o6 xxlong" />
      </div>
    </div>
  </div>
</template>

<script>
import Skeleton from "components/ui/skeleton";
import HorizontalLine from "components/ui/horizontal-line";

export default {
  name: "album-hero-skeleton",
  components: {
    Skeleton,
    HorizontalLine
  },
};
</script>

<style lang="scss">
.album-hero-skel {
  display: flex;
  @media (max-width: 767px) {
    flex-direction: column;
    padding-top: 13px;
    padding-bottom: 1px;
  }
  &__mobile {
    display: flex;
    flex-direction: column;
    width: 100%;
    @media (min-width: 768px) {
      display: none;
    }
  }
}

.album-hero-skel-desktop {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 30px;
  width: 100%;
  @media (max-width: 767px) {
    display: none;
  }
  &__stats {
    margin-top: 32px;
  }
}
</style>
