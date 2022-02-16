<template>
  <activity-view
    v-if="activity.length && chartTrackId.length"
    :data="activity"
    :loading="paginationActivity.loading"
    :disable-infinite-scroll="paginationActivity.noDataLeft"
    @load-more="paginationActivity.nextPage"
    :pagination="paginationActivity"
    :activity-type="activityType"
  />
  <div v-else-if="isLoading" class="activity-view__skeleton">
    <div class="activity-view__skeleton-container" v-for="item in 7" >
<!--      <p class="activity-view__skeleton-date skeleton-loader"></p>-->
      <div class="activity-view__skeleton-wrapper">
        <div class="activity-view__skeleton-icon skeleton-loader" />
        <div class="activity-view__skeleton-card skeleton-loader" />
      </div>
    </div>
  </div>
  <div v-else class="zero-static zero-static--light zero-state__table--activity">
    <base-icon name="arrows-up-down"/>
    <span class="zero-static__text">Select a track to view activity</span>
  </div>
</template>

<script>
import ActivityView from 'components/analytics/activity-view.vue';
import { Pagination } from "../../helpers/pagination-new";
import BaseIcon from 'components/ui/base-icon/base-icon.vue';

export default {
  name: 'chart-activity-view',
  components: {
    ActivityView,
    BaseIcon
  },
  props: {
    groupBy: {
      type: String,
      default: 'all'
    },
    profileId: {
      type: String,
      default: undefined
    },
    timePeriod: {
      type: String,
      required: true
    },
    activityType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      paginationActivity: new Pagination({
        getData: this.getPlaylistsActivity
      }),
      isLoading: false
    }
  },
  watch: {
    chartTrackId(val) {
     if(val.length) {
       this.fetchActivity();
     }
    },
    groupBy() {
      if (this.chartTrackId.length) {
        this.fetchActivity()
      }
    },
    timePeriod() {
      if (this.chartTrackId.length) {
        this.fetchActivity()
      }
    }
  },
  computed: {
    activity() {
      return this.$store.getters['analytics/activityOverview/chartData']
    },
    chartTrackId() {
      return this.$store.getters['analytics/activityOverview/chartTrackId'];
    },
  },
  methods: {
    async fetchActivity() {
      this.isLoading = true;
      this.paginationActivity.reset();
      return this.paginationActivity.nextPage().then( () => this.isLoading = false )
    },
    getPlaylistsActivity() {
      return this.$store.dispatch('analytics/activityOverview/getChartActivity', {
        id: this.profileId,
        trackId: this.chartTrackId,
        type: this.activityType,
        pagination: this.paginationActivity,
        params: {
          event: this.groupBy,
          period: this.timePeriod
        }
      });
    }
  }
}
</script>

<style lang="scss">
.activity-view__skeleton {
  display: flex;
  flex-direction: column;
  margin-top: 38px;
  padding: 0 16px;
  &-card {
    width: 503px;
    height: 76px;
    padding: 16px;
    border-radius: 4px;
    background-color: var(--base-3-color);
    margin: 16px 0;
  }
  &-container {
    display: flex;
    flex-direction: column;
  }
  &-date {
    width: 510px;
    height: 20px;
    align-self: flex-end;
  }
  &-icon {
    width: 25px;
    height: 25px;
    border: 50px;
    border-radius: 50%;
    margin-right: 20px;
  }
  &-wrapper {
    display: flex;
    align-items: center;
  }
  &-date {
    width: 100%;
    height: 20px;
  }
  //&-date::after {
  //  margin-top: 10px;
  //  content: "";
  //  margin-left: 10px;
  //  width: 0;
  //  height: 1px;
  //  flex-grow: 1;
  //  background-color: var(--overlay-4-color);
  //}
}

</style>
