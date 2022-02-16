<template>
  <div class="details-list-skel">
    <template v-for="index in 4">
      <skeleton :key="index" class="middle thin" />
    </template>
  </div>
</template>

<script>
import Skeleton from 'components/ui/skeleton.vue';

export default {
  name: 'song-details-list-skeleton',
  components: {
    Skeleton
  }
}
</script>

<style lang="scss">
.details-list-skel {
  --skeleton-color: #383838;
  display: flex;
  flex-wrap: wrap;
  padding-top: 5px;
  padding-bottom: 1px;
  margin-bottom: -20px;
  > * {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
</style>