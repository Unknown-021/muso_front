<template>
  <div>
    <analytics-summary :summary="summary" :loading="isLoading" />

    <div class="grid grid--half mt-grid">
      <analytics-overview-table :data="tracks" :demo-profile-id="demoProfileId" :loading="isLoading" type="tracks">
        <template #title>
          Discography
        </template>
      </analytics-overview-table>
      <analytics-overview-table :data="collaborations" :demo-profile-id="demoProfileId" :loading="isLoading" type="collaborators">
        <template #title>
          Collaborations
        </template>
      </analytics-overview-table>
    </div>

    <analytics-roles :profile-id="profileId" :period="timePeriod" :demo-profile-id="demoProfileId"></analytics-roles>
  </div>
</template>

<script>
import AnalyticsSummary from 'components/analytics/analytics-summary.vue';
import AnalyticsOverviewTable from 'components/analytics/analytics-overview-table.vue';
import AnalyticsRoles from 'components/analytics/analytics-roles.vue';
import { clientFetchData } from 'mixins/client-fetch-data';

export default {
  name: 'analytics-overview',
  mixins: [clientFetchData],
  components: {
    AnalyticsSummary,
    AnalyticsOverviewTable,
    AnalyticsRoles
  },
  props: {
    timePeriod: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: false
    };
  },
  serverPrefetch() {
    return this.fetchData();
  },
  clientFetchData() {
    this.fetchData();
  },
  watch: {
    timePeriod() {
      this.resetData();
      this.fetchData();
    }
  },
  computed: {
    summary() {
      return this.$store.getters['analytics/summary'].summary;
    },
    collaborations: {
      get() {
        return this.$store.getters['analytics/overview/collaborations'];
      },
      set(value) {
         this.$store.commit('analytics/overview/setCollaborationsData', value);
      }
    },
    tracks: {
      get() {
        return this.$store.getters['analytics/overview/tracks'];
      },
      set(value) {
        this.$store.commit('analytics/overview/setTracksData', value);
      }
    },
    user() {
      return this.$store.getters['user/data'];
    },
    profileId() {
      return this.demoProfileId || this.user.id;
    },
    demoProfileId() {
      return this.$route.params.id;
    }
  },
  methods: {
    async fetchData() {
      try {
        this.resetData();
        this.isLoading = true;
        const params = {
          period: this.timePeriod,
          limit: 5
        };
        const id = this.profileId;
        await Promise.all([
          this.$store.dispatch('analytics/getSummary', {id, params }),
          this.$store.dispatch('analytics/overview/getCollaborationsActivity', { id, params }),
          this.$store.dispatch('analytics/overview/getTracks', { id, params })
        ]);
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.isLoading = false;
      }
    },
    resetData() {
      this.tracks = [];
      this.collaborations = [];
    }
  }
}
</script>
