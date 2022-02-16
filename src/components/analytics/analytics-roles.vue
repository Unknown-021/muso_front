<template>
  <div class="roles-container">
    <master-table>
      <template #header>
        <master-header>
          <template #title>Roles</template>
          <template #tags>
            <master-grouping
              :value.sync="group"
              :items="statsProperties"
            />
          </template>
        </master-header>
      </template>

      <div v-if="hasData" class="roles-content">
        <analytics-roles-pie
          :active-index.sync="activeIndex"
          :group="group"
          :period="period"
          :items-chart="credits"
          :loading="isLoading"
          @update:active-index="getTracks"
        />
        <credits-table
          :tracks="tracks"
          :group="group"
          :loading="isLoading"
          :row-skeleton-count="10"
          :demo-profile-id="demoProfileId"
        />
      </div>
      <div v-else class="zero-static zero-static--light zero-state__table">
        <base-icon name="analytics"/>
        <span class="zero-static__text">No Data Available</span>
      </div>
    </master-table>
  </div>
</template>

<script>
import MasterTable from 'components/ui/master-table.vue';
import MasterHeader from 'components/ui/master-header.vue';
import MasterSearch from 'components/ui/master-search.vue';
import MasterGrouping from 'components/ui/master-grouping.vue';
import { statsProperties } from 'store/modules/analytics/constants/stats-property';
import CreditsTable from 'components/analytics/credits-table.vue';
import AnalyticsRolesPie from 'components/analytics/analytics-roles-pie.vue';
import BaseIcon from 'components/ui/base-icon/base-icon.vue';
import { clientFetchData } from 'mixins/client-fetch-data';

export default {
  name: 'analytics-roles',
  mixins: [clientFetchData],
  components: {
    MasterTable,
    MasterHeader,
    MasterSearch,
    MasterGrouping,
    CreditsTable,
    AnalyticsRolesPie,
    BaseIcon
  },
  props: {
    period: {
      type: String,
      required: true
    },
    profileId: {
      type: String,
      required: true
    },
    demoProfileId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      group: 'streams',
      isLoading: false,
      activeIndex: 0
    };
  },
  serverPrefetch() {
    return this.getData();
  },
  clientFetchData() {
    this.getData();
  },
  watch: {
    period() {
      this.resetTrackList()
      this.getData();
    },
    group() {
      this.activeIndex = 0;
      this.resetTrackList()
      this.getData();
    },
    activeIndex() {
      this.resetTrackList()
      this.getData();
    }
  },
  computed: {
    statsProperties() {
      return statsProperties;
    },
    user() {
      return this.$store.getters['user/data'];
    },
    credits() {
      return this.$store.getters['analytics/roles/credits'];
    },
    tracks: {
      get() {
        return (this.isLoading) ? [] : this.$store.getters['analytics/roles/tracks'];
      },
      set(value) {
        this.$store.commit('analytics/roles/setTracks', value);
      }
    },
    hasData() {
      return this.activeCredit?.currentValue;
    },
    activeCredit() {
      return this.credits[this.activeIndex];
    }
  },
  methods: {
    async getData() {
      try {
        this.isLoading = true;
        await this.getCredits();
        if (this.activeCredit) {
          await this.getTracks();
        }
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getCredits() {
      try {
        await this.$store.dispatch('analytics/roles/getCredits', this.getRequestParams());
      } catch (error) {
        this.$handleError(error);
      }
    },
    async getTracks() {
      try {
        const params = this.getRequestParams({
          credit: this.activeCredit?.id
        });
        await this.$store.dispatch('analytics/roles/getTracks', params);
      } catch (error) {
        this.$handleError(error);
      }
    },
    getRequestParams(params) {
      return {
        id: this.profileId,
        params: {
          period: this.period,
          statsProperty: this.group,
          ...params
        }
      }
    },
    resetTrackList() {
      this.tracks = [];
    }
  }
};
</script>

<style lang="scss">
.roles-container {
  margin-top: 20px;
  & .master-table__body {
    padding: 16px 0;
  }
}

.roles-content {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  & .col-master.td {
    font-size: 16px;
  }
}

</style>
