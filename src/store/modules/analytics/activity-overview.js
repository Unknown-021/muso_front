import {mergeParams, paginated} from "../../../helpers/pagination-new";

const state = () => ({
  playlistData: [],
  playlistTracks: [],
  playlistTrackId: [],
  chartData: [],
  chartTracks: [],
  chartTrackId: [],
  playlistTrackDetails: '',
  chartTrackDetails: '',
});

export default {
  namespaced: true,
  state,
  getters: {
    playlistData: state => state.playlistData,
    playlistTracks: state => state.playlistTracks,
    playlistTrackId: state => state.playlistTrackId,
    chartData: state => state.chartData,
    chartTracks: state => state.chartTracks,
    chartTrackId: state => state.chartTrackId,
    playlistTrackDetails: state => state.playlistTrackDetails,
    chartTrackDetails: state => state.chartTrackDetails,
    demoProfileId: state => state.demoProfileId
  },
  mutations: {
    setPlaylistData(state, data) {
      state.playlistData = data;
    },
    setChartData(state, data) {
      state.chartData = data;
    },
    setplaylistTrackId(state, data) {
      state.playlistTrackId = data;
    },
    setchartTrackId(state, data) {
      state.chartTrackId = data;
    },
    pushPlaylistTracksData(state, data) {
      state.playlistTracks = state.playlistTracks.concat(data);
    },
    pushChartTracksData(state, data) {
      state.chartTracks = state.chartTracks.concat(data);
    },
    pushPlaylistData(state, data) {
      state.playlistData = state.playlistData.concat(data);
    },
    pushChartData(state, data) {
      state.chartData = state.chartData.concat(data);
    },
    clearPlaylistTracks(state) {
      state.playlistTracks = [];
    },
    clearChartTracks(state) {
      state.chartTracks = [];
    },
    unselectTrack(state) {
      state.playlistTrackId = [];
      state.playlistData = [];
    },
    setplaylistTrackDetails(state, data) {
      state.playlistTrackDetails = data;
    },
    setchartTrackDetails(state, data) {
      state.chartTrackDetails = data;
    },
    clearPlaylistData(state) {
      state.playlistData = [];
    }
  },
  actions: {
    async getRecentActivity({dispatch}, {params}) {
      const payload = {
        params: {
          ...params,
          limit: 5
        }
      };
      return Promise.all([
        dispatch('getPlaylistActivity', payload),
        dispatch('getChartActivity', payload)
      ]);
    },
    async getPlaylistActivity({commit}, {id, trackId, type, params, pagination}) {
      if (pagination.page === 1) {
        commit('setPlaylistData', []);
      }

      const response = paginated(await this.http.get(`/analytics/${id}/track/${trackId}/activity/${type}`, {
        params: {
          ...mergeParams(params, pagination)
        }}));
      commit('pushPlaylistData', response.data.items);
      return response;
    },
    async getChartActivity({commit}, {id, trackId, type, params, pagination}) {
      if (pagination.page === 1) {
        commit('setChartData', []);
      }

      const response = paginated(await this.http.get(`/analytics/${id}/track/${trackId}/activity/${type}`, {
        params: {
          ...mergeParams(params, pagination)
        }}));
      commit('pushChartData', response.data.items);
      return response;
    },
    async getChartTracks({commit}, {id, params, pagination}) {
      commit('setPlaylistData', []);
      commit('setChartData', []);
      if (pagination.page === 1) {
        // commit('clearTrackList');
        // commit('unselectTrack');
      }
      const response = paginated(await this.http.get(`/analytics/${id}/profile/tracks`, {
        params: {
          ...mergeParams(params, pagination),
        }}))
      commit('pushChartTracksData', response.data);
      return response;
    },
    async getPlaylistTracks({commit}, {id, params, pagination}) {
      commit('setPlaylistData', []);
      commit('setChartData', []);
      if (pagination.page === 1) {
        // commit('clearTrackList');
        // commit('unselectTrack');
      }
      const response = paginated(await this.http.get(`/analytics/${id}/profile/tracks`, {
        params: {
          ...mergeParams(params, pagination),
        }}))
      commit('pushPlaylistTracksData', response.data);
      return response;
    }
  }
}
