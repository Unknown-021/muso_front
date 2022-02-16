<template>
  <playlists-table
    v-if="!pagination.noDataLeft || data.length"
    :data="data"
    :loading="pagination.loading"
    :row-skeleton-count="pagination.skeletonCount"
    :disable-infinite-scroll="pagination.noDataLeft"
    @load-more="pagination.nextPage"
    :activity-type="activityType"
  />
  <div v-else-if="!pagination.loading" class="zero-static zero-static--light zero-state__table--activity">
    <base-icon name="list"/>
    <span class="zero-static__text">No Data Available</span>
  </div>
</template>

<script>
import ActivityView from './activity-view.vue';
import PlaylistsTable from './playlists-table';
import BaseIcon from 'components/ui/base-icon/base-icon.vue';

export default {
  name: 'activity-master-table',
  components: {
    ActivityView,
    PlaylistsTable,
    BaseIcon
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    groupBy: {
      type: String,
      default: 'all'
    },
    searchQuery: {
      type: String,
      default: ''
    },
    pagination: {
      type: Object,
      required: true
    },
    activityType: {
      type: String,
      required: true
    }
  }
}
</script>
