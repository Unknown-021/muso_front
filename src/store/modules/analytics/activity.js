import { accumulateObjects } from 'helpers/array';

export const streamsAccumulator = accumulateObjects('value');

const state = () => ({
	data: [],
  previousRoute: '',
	songDetails: {},
  chartTotal: [],
  chartSelected: [],
  tracksSources: [],
  trackActivity: [],
  playlistsActivity: [],
  showDropdown: {},
  statsProperty: 'streams',
  selectedIds: [],
  demoProfileId: null
});

export default {
	namespaced: true,
	state,
	getters: {
		data: state => state.data,
    showDropdown: state => state.showDropdown,
    activityDetails: state => state.songDetails,
    selectedIds: state => state.selectedIds,
    statsProperty: state => state.statsProperty,
    demoProfileId: state => state.demoProfileId,
    totalStreams: state => state.chartTotal.reduce(streamsAccumulator, 0),
    chartTotal: state => state.chartTotal,
		totalStreams: state => state.chartTotal.reduce(streamsAccumulator, 0),
    trackSources: state => state.tracksSources,
    playlistsActivity: state => state.playlistsActivity,
    trackSourcesDetails: state => state.tracksSources.map((item) => {
      return {
        ...item,
        trackTitle: state.songDetails?.trackTitle,
        albumTitle: state.songDetails?.album.title
      }
    }),
	},
	mutations: {
		setData(state, data) {
			state.data = data;
		},
		setSongDetails(state, data) {
			state.songDetails = data;
		},
    setChartData(state, { total, selected }) {
      state.chartTotal = total;
      state.chartSelected = selected;
    },
    setTrackSources(state, data) {
      state.tracksSources = data;
    },
    setTrackActivity(state, data) {
      state.playlistsActivity = data;
    },
    setShowDropdown(state, data) {
      state.showDropdown = data;
    },
    setStatsProperty(state, data) {
      state.statsProperty = data;
    },
    setSelectedIds(state, data) {
      state.selectedIds = data;
    },
    setDemoProfileId(state, data) {
      state.demoProfileId = data;
    }
	},
	actions: {
    async getSongDetails({ commit }, { id, clear = true }) {
      if (clear) {
        commit('setSongDetails', null);
      }
      const { data } = await this.httpNext.get(`/song/${id}`);
      commit('setSongDetails', normalizeResponse(data));
    },
    async getIndividualChart({ state, commit }, { id, params }) {
      commit('setChartData', { total: [], selected: [] });
      if (state.demoProfileId) {
        const { data } = await this.http.post(`/analytics/${state.demoProfileId}/line-graph`, {
          ...params,
          ids: state.selectedIds,
          statsProperty: state.statsProperty
        });
        commit('setChartData', data);
        return data;
      } else {
        const { data } = await this.http.post(`/analytics/${id}/line-graph`, {
          ...params,
          ids: state.selectedIds,
          statsProperty: state.statsProperty
        });
        commit('setChartData', data);
        return data;
      }
    },
    async getTrackSources({ commit }, { profileId, trackId, sourceType }) {
      const { data } = await this.http.get(`/analytics/${profileId}/track/${trackId}/${sourceType}-sources`);
      commit('setTrackSources', data);
      return data;
    },
    async submitAdditionalSources({ commit }, { profileId, trackId, params }) {
      const { data } = await this.http.post(`/analytics/${profileId}/track/${trackId}/sources`, params);
      return data;
    },
    async removeSource({ commit }, { profileId, trackId, params }) {
      let data = {
        link: params.link,
        source: params.source
      }
      await this.http.delete(`/analytics/${profileId}/track/${trackId}/sources`, {data});
      return data;
    }
	},
};

function normalizeResponse(data) {
  const { track, album, primaryArtists } = data;
  return {
		trackTitle: track.title,
    album: album,
		artists: primaryArtists
  };
}
