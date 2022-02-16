<template>
  <div class="profile-cs" data-component="profile-credits-skeleton">
    <div class="profile-cs__controls-mob">
      <skeleton class="short o8" />
      <skeleton class="profile-cs__control o8 ml-auto mr-10" />
      <skeleton class="profile-cs__control o8" />
    </div>
    <div class="profile-cs__filters">
      <skeleton class="profile-cs__filter o8 mr-10" v-for="index in 3" :key="index" />
      <skeleton class="profile-cs__search o8" />
    </div>

    <songs-credits-table :head-loading="true" :loading="true" :data="[]" />
  </div>
</template>

<script>
import Skeleton from "components/ui/skeleton";
import SongsCreditsTable from 'components/song/songs-credits-table.vue';

export default {
  name: "ProfileCreditsSkeleton",
  components: {
    Skeleton,
    SongsCreditsTable
  }
};
</script>

<style lang="scss">
.profile-cs {
  @media (min-width: 768px) {
    padding-top: 5px;
  }
  &__controls-mob {
    display: flex;
    align-items: center;
    margin-bottom: 22px;
    @media (min-width: 768px) {
      display: none;
    }
  }
  &__control {
    width: 24px;
    height: 24px;
  }
  &__filters {
    display: flex;
    margin-bottom: 12px;
    @media (min-width: 768px) {
      margin-bottom: 8px;
    }
  }
  &__filter {
    height: 28px;
  }
  &__search {
    margin-left: auto;
    height: 28px;
    @media (max-width: 767px) {
      display: none;
    }
  }
}
</style>