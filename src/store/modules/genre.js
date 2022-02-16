import { resetState } from 'store/store.utils';

const state = () => ({
  genres: [],
  initialGenres: []
});

export default {
  namespaced: true,
  state,
  getters: {
    genres: state => state.genres,
    initialGenres: state => state.initialGenres
  },
  mutations: {
    reset: resetState(state),
    setGenres(state, data) {
      state.genres = data;
    },
    setInitialGenres(state, data) {
      state.initialGenres = data;
    }
  },
  actions: {
    async getInitialGenres({ state, commit, dispatch }) {
      if (!state.initialGenres.length) {
        const query = {};
        await dispatch('getGenres', { query });
        commit('setInitialGenres', state.genres);
      }
    },
    async getGenres({ commit, rootState }, { query }) {
      const { data } = await this.http.get('/genres', {
        params: {
          profileId: rootState.user.data?.id,
          ...query
        }
      });
      const empty = item => item.id;
      commit('setGenres', data.list.filter(empty));
    }
  },
};