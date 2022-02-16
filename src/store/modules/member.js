import MemberModel from 'models/member';

const state = () => ({
  loading: false,
  memberList: [],
});

export default {
  namespaced: true,
  state,
  getters: {
    loading(state) {
      return state.loading;
    },
    memberList(state) {
      return state.memberList;
    }
  },
  mutations: {
    setLoading(state, isLoaded) {
      state.loading = isLoaded;
    },
    setMemberList(state, data) {
      state.memberList = data;
    },
  },
  actions: {
    async getList({ commit }, { query }) {
      commit('setLoading', true);
      try {
        const { data } = await MemberModel.getList(query);
        commit('setMemberList', data);
      } finally {
        commit('setLoading', false);
      }
    }
  },
};