import { resetState } from 'store/store.utils';

const state = () => ({
  list: [],
  total: 0,
  loading: false,
  limit: 15
});

export default {
  namespaced: true,
  state,
  getters: {
    list: state => state.list,
    total: state => state.total,
    unreadCount: state => state.unreadCount,
    hasUnread: state => state.list.some(item => !item.read),
    loading: state => state.loading,
    limit: state => state.limit,
    hasMoreToLoad: state => (state.list.length < state.total)
  },
  mutations: {
    reset: resetState(state),
    setList(state, data) {
      state.list = data;
    },
    appendList(state, data) {
      state.list = state.list.concat(data);
    },
    pushItem(state, data) {
      state.total++;
      state.list.unshift(data);
    },
    setTotal(state, total) {
      state.total = total;
    },
    setLoading(state, data) {
      state.loading = data;
    },
    setActionStatus(state, { notificationId, status }) {
      const notification = state.list.find(item => item.id === notificationId);
      if (notification) {
        notification.actionStatus = status;
      }
    },
    markAsRead(state) {
      state.list.forEach(item => (item.read = true));
    }
  },
  actions: {
    async getList({ commit, dispatch }) {
      commit('setList', []);
      const list = await dispatch('_getList');
      commit('setList', list);
    },
    async getMoreList({ commit, dispatch }) {
      const list = await dispatch('_getList');
      commit('appendList', list);
    },
    async _getList({ state, commit }) {
      try {
        commit('setLoading', true);
        const { data } = await this.http.get('https://api-nonproduction.muso.ai/api/m/v2/user/notifications', {
          params: {
            limit: state.limit,
            offset: state.list.length
          }
        });
        commit('setTotal', data.total);
        return data.list;
      } finally {
        commit('setLoading', false);
      }
    },
    async respondInvite({ commit }, payload) {
      await this.http.put('https://api-nonproduction.muso.ai/api/m/v2/collaborator/respond-invite', payload);
      commit('setActionStatus', {
        notificationId: payload.notificationId,
        status: payload.action
      });
    },
    async markAsRead({ commit }) {
      await this.http.put('https://api-nonproduction.muso.ai/api/m/v2/user/notifications');
      commit('markAsRead');
    }
  },
};