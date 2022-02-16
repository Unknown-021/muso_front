import { paginated, mergeParams } from 'helpers/pagination-new';

const state = () => ({
    albumTitle: '',
    collaboratorsName: '',
    creditsTitle: '',
    data: [],
    group: ''
});

export default {
  namespaced: true,
  state,
  getters: {
      data: state => state.data,
      albumTitle: state => state.albumTitle,
      collaboratorsName: state => state.collaboratorsName,
      creditsTitle: state => state.creditsTitle
  },
  mutations: {
      setData(state, data) {
          state.data = data;
      },
      pushData(state, data) {
        state.data = state.data.concat(data);
      },
      setAlbumTitle(state, data) {
          state.albumTitle = data;
      },
      setGroup(state, data) {
        state.group = data;
      },
      setCollaboratorsName(state, data) {
        state.collaboratorsName = data;
      },
      setCreditsTitle(state, data) {
        state.creditsTitle = data;
      }
  },
  actions: {
    async getGroupingData({ commit, state }, { id, profileId, params, group, pagination }) {
      if (pagination.page === 1) {
        commit('setData', []);
      }
      const response = paginated(await this.http.get(`/analytics/${profileId}/${group}/${id}/tracks`, {
        params: {
          ...mergeParams(params, pagination)
        }
      }));

      commit('setAlbumTitle', response.data[0].albumTitle);
      commit('pushData', response.data);
      return response;
    }
  }
};