const state = () => ({
  profileId: null,
  initialRoles: []
});

export default {
  namespaced: true,
  state,
  getters: {
    initialRoles: state => state.initialRoles
  },
  mutations: {
    setInitialRoles(state, data) {
      state.initialRoles = data;
    },
    setProfileId(state, data) {
      state.profileId = data;
    }
  },
  actions: {
    async getInitialRoles({ state, commit, dispatch }, { params = {} } = {}) {
      let data = state.initialRoles;

      if (!data.length || state.profileId !== params.profileId) {
        data = await dispatch('getRoles', { params });
        commit('setInitialRoles', data);
        commit('setProfileId', params.profileId);
      }

      return data;
    },
    async getRoles(context, { params }) {
      const { data } = await this.http.get('/associations', { params });
      return data;
    },
  },
};