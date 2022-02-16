<template>
  <div class="activity-container">
  <master-table>
    <template #header>
      <master-header>
        <master-search :value.sync="searchQuery" @input="setSearchQuery" debounce />
        <template #tags>
          <master-grouping :value="groupBy" :items="activityTypes" @update:value="setGroupBy" />
        </template>
      </master-header>
    </template>
    <div v-if="tracks.length || loadingTracks" class="activity-content ">
      <activity-master-table
        class="activity-table"
        :data="tracks"
        :search-query.sync="searchQuery"
        :group-by="groupBy"
        :pagination="paginationTracks"
        activity-type="Playlist"
      />
      <playlist-activity-view :group-by="groupBy" :profile-id="profileId" :time-period="timePeriod" activity-type="playlist" />
    </div>
    <div v-else class="zero-static zero-static--light zero-state__table--activity-p">
      <base-icon name="list"/>
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
import { activityTypes } from 'store/modules/analytics/constants/activity-types.js';
import ActivityMasterTable from 'components/analytics/activity-master-table.vue';
import { Pagination } from 'helpers/pagination-new';
import PlaylistActivityView from 'components/analytics/playlist-activity-view';
import BaseIcon from 'components/ui/base-icon/base-icon.vue';

export default {
  name: 'playlist-activity',
  components: {
    ActivityMasterTable,
    MasterTable,
    MasterHeader,
    MasterSearch,
    MasterGrouping,
    PlaylistActivityView,
    BaseIcon
  },
  props: {
    timePeriod: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      searchQuery: '',
      paginationTracks: new Pagination({
        getData: this.getTracksPlaylist
      }),
      groupBy: this.groupBy || 'all',
      loadingActivity: false,
      loadingTracks: true
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    timePeriod() {
     this.fetchData();
    },
    searchQuery: 'fetchData',
    groupByQuery(value) {
      if (value) {
        this.groupBy = value;
      }
    },
  },
  computed: {
    tracks() {
      return this.$store.getters['analytics/activityOverview/playlistTracks'];
    },
    user() {
      return this.$store.getters['user/data'].id;
    },
    playlistTrackId() {
      return this.$store.getters['analytics/activityOverview/playlistTrackId'];
    },
    activityTypes() {
      return activityTypes;
    },
    profileId() {
      return this.demoProfileId || this.user;
    },
    demoProfileId() {
      return this.$route.params.id;
    }
  },
  methods: {
    setGroupBy(groupBy) {
      this.groupBy = groupBy;
    },
    setSearchQuery(value) {
      this.searchQuery = value;
    },
    async fetchData() {
      this.loadingTracks = true;
      this.paginationTracks.reset();
      this.$store.commit('analytics/activityOverview/clearPlaylistTracks');
      // this.$store.commit('analytics/activityOverview/unselectTrack');
      return Promise.all([
        this.paginationTracks.nextPage(),
      ]).then(() => this.loadingTracks = false);
    },
    getTracksPlaylist() {
      return this.$store.dispatch('analytics/activityOverview/getPlaylistTracks', {
        id: this.profileId,
        pagination: this.paginationTracks,
        params: {
          query: this.searchQuery || undefined,
          period: this.timePeriod,
          statsProperty: "playlists"
        }
      });
    }
  }
}
</script>

<style lang="scss">
.activity-content {
  display: flex;
  margin-top: 0;
  min-height: 548px;
}
.activity-table{
  min-width: 600px;
  padding: 0 16px;
  border-right: 1px solid #22211F;
}
.zero-state__table--activity {
  width: 100%;
  svg {
    path {
      fill: #8F8F8F;
    }
  }
  span {
    color: var(--overlay-3-color);
  }
}

.activity-container .master-table__body {
  padding: 16px 0;
  min-height: 800px;
}
.zero-state__table--activity-p {
  margin-top: 240px;
}
</style>
