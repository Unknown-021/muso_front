<template>
  <div>
    <skeleton class="long" style="margin-bottom: 13px; margin-top: 2px;" />
    <div class="members-section__list no-scrollbar" style="margin-bottom: 18px;">
      <div class="d-flex d-md-none align-items-center" v-for="index in 3" :key="index">
        <skeleton class="p-img rounded mr-15" />
        <div class="d-flex flex-column">
          <skeleton class="long thin mb-10 o8" />
          <skeleton class="thin o8" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Skeleton from "components/ui/skeleton";

export default {
  name: "ProfileMemberOfSkeleton",
  components: {
    Skeleton
  }
};
</script>

<style lang="scss" scoped>
.p-img {
  width: 40px;
  height: 40px;

  @media (min-width: 768px) {
    width: 120px;
    height: 120px;
  }

  @media (min-width: 1280px) {
    width: 150px;
    height: 150px;
  }
}
</style>