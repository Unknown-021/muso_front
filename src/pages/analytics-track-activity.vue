<template>
  <div class="p-activity">
    <div class="p-analytics__hero">
      <transition name="fade-fast">
        <profile-hero :profile="profile" :full="false" />
      </transition>
      <analytics-start-trial v-if="userIsPro !== 'PRO'" />
      <analytics-export-stats  v-if="userIsPro" />
    </div>
    <breadcrumbNew />
    <base-tabs
      class="p-activity__tabs"
      @change="changeActiveTab"
      :active-tab="activeTab"
    >
      <base-tablist>
        <template v-for="tab in tabs">
          <base-tab :key="tab.key">
            {{ tab.title }}
          </base-tab>
        </template>
        <template #after> </template>
      </base-tablist>
    </base-tabs>

    <div class="p-activity__content">
      <individual-track-chart
        class="mb-m"
        period="all"
        :group="activeTab"
        :chart-data="trendsChart"
        :selected-sources.sync="selectedSources"
        :is-loading="isLoadingChartData"
        :track-details="trackDetails"
        :source-title="tabTitle"
      />
      <sources-master-table :source-type="activeTab" :isLoading="isLoadingTableData" />
    </div>
  </div>
</template>

<script>
import BaseTabs, { BaseTablist, BaseTab } from 'components/ui/base-tabs/base-tabs-new.vue';
import BreadcrumbNew from 'components/breadcrumbNew';
import IndividualTrackChart from 'components/analytics/individual-track-chart.vue';
import { statsPropertiesTabs } from 'store/modules/analytics/constants/stats-property';
import SourcesMasterTable from 'components/analytics/sources-master-table.vue';
import { camelToKebab } from 'helpers/text';
import ProfileHero from "components/profile/profile-hero";
import AnalyticsExportStats from 'components/analytics/analytics-export-stats.vue';
import AnalyticsStartTrial from 'components/analytics/analytics-start-trial.vue';

export default {
  name: 'analytics-track-activity',
  components: {
    BaseTabs,
    BaseTab,
    BaseTablist,
    BreadcrumbNew,
    IndividualTrackChart,
    SourcesMasterTable,
    ProfileHero,
    AnalyticsExportStats,
    AnalyticsStartTrial
  },
  props: {
    trackId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      activeTab: 'streams',
      isLoadingChartData: true,
      isLoadingTableData: true,
      selectedSources: [],
    };
  },
  watch: {
    activeTab() {
      this.fetchData();
    },
    $route() {
      this.resetChartData();
    },
  },
  created() {
    this.fetchSongDetails();
  },
  beforeMount() {
    this.resetTrackSources();
    this.fetchData();
  },
  beforeDestroy() {
    this.$store.commit('analytics/activity/setDemoProfileId', null);
  },
  computed: {
    id() {
      return this.trackId;
    },
    trendsChart() {
      return this.$store.getters['analytics/activity/chartTotal'];
    },
    demoProfile() {
      return this.$store.getters['analytics/activityOverview/demoProfileId'];
    },
    user() {
      return this.$store.getters['user/data'].id;
    },
    tabs() {
      return statsPropertiesTabs.map((item) => ({
        key: item.value,
        title: item.title,
      }));
    },
    trackDetails() {
      return this.$store.getters['analytics/activity/activityDetails'];
    },
    trackSources() {
      return this.$store.getters['analytics/activity/trackSources'];
    },
    activeTabNoramlized() {
      return camelToKebab(this.activeTab);
    },
    tabTitle() {
      const tabTitle = this.tabs.filter( item => item.key === this.activeTab);
      return tabTitle[0].title;
    },
    profile() {
      if (this.profileId) {
        return this.demoProfile.name !== 'undefined' ? this.demoProfile : this.$store.getters['user/data'];
      } else {
        return this.$store.getters['user/data'];
      }
    },
    userIsPro() {
      return this.$store.getters['user/data']?.subscriptionStatus;
    },
    demoProfile() {
      return this.$store.getters['profile/profileDetails']
    },
  },
  methods: {
    async fetchData() {
      this.resetChartData();
      this.resetTrackSources();
      return Promise.all([
        this.getTrendsChart(),
        this.getTrackActivity(),
      ])
    },
    async fetchSongDetails() {
      try {
        await this.$store.dispatch('analytics/activity/getSongDetails', {
          id: this.id,
        });
      } finally {
      }
    },
    async getTrendsChart() {
      this.isLoadingChartData = true;
      this.$store.commit('analytics/activity/setStatsProperty', this.activeTab);
      this.$store.commit('analytics/activity/setSelectedIds', [this.id]);
      try {
        await this.$store.dispatch('analytics/activity/getIndividualChart', {
          id: this.user,
          params: {
            group: 'tracks',
            sources: this.selectedSources,
            period: 'all',
            ids: [this.id],
          },
        });
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.isLoadingChartData = false;
      }
    },
    async getTrackActivity() {
      this.isLoadingTableData = true;
      try {
        await this.$store.dispatch('analytics/activity/getTrackSources', {
          profileId: this.user,
          trackId: this.id,
          sourceType: this.activeTabNoramlized
        });
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.isLoadingTableData = false;
      }
    },
    changeActiveTab(value) {
      this.activeTab = value;
    },
    resetChartData() {
      this.$store.commit('analytics/trends/resetChartData');
    },
    resetTrackSources() {
      this.$store.commit('analytics/activity/setTrackSources', [])
    }
  },
};
</script>

<style lang='scss'>
.p-activity {
  height: calc(100vh - 156px);
  padding-top: 0;
  &__tabs {
    padding-top: 16px;
  }
}
.p-activity__content {
  height: 100%;
  margin-top: 16px;
  display: flex;
}
.p-activity .tab::after {
  left: 1px;
  right: 0px;
}
.p-activity .breadcrumb {
  height: 52px;
  margin: 0;
}
</style>
