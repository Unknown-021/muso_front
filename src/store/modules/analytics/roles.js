import { createNumbersSorter, invertSorter } from 'helpers/sorters';

const valueSorter = invertSorter(createNumbersSorter('currentValue'));

const state = () => ({
  credits: [],
  tracks: []
});

export default {
  namespaced: true,
  state,
  getters: {
    credits: state => state.credits,
    tracks: state => state.tracks
  },
  mutations: {
    setCredits(state, data) {
      state.credits = data
    },
    setTracks(state, data) {
      state.tracks = data
    }
  },
  actions: {
    async getCredits({ commit }, { id, params }) {
      const { data } = await this.http.get(`/analytics/${id}/profile/credits`, { params });
      const credits = data.list.sort(valueSorter);
      commit('setCredits', credits);
    },
    async getTracks({ commit }, { id, params }) {
      const { data } = await this.http.get(`/analytics/${id}/profile/credit/tracks`, { params });
      commit('setTracks', normalizeTracks(data.slice(0, 10)));
    }
  }
}

// TODO: Ask backend developer always return `currentValue` no matter if track is in progress or not
function normalizeTracks(tracks) {
  return tracks.map(item => ({
    ...item,
    currentValue: item.currentValue || 0
  }));
}
