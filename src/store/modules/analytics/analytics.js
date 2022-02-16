import trends from './trends';
import catalog from './catalog';
import overview from './overview';
import roles from './roles';
import activity from './activity';
import grouping from './grouping';
import activityOverview from './activity-overview';

const state = () => ({
  summary: []
});

export default {
  namespaced: true,
  state,
  modules: {
    trends,
    catalog,
    overview,
    roles,
    activity,
    grouping,
    activityOverview
  },
  getters: {
    summary: state => state.summary
  },
  mutations: {
    setSummary(state, data) {
      [data.summary[2], data.summary[3]] = [data.summary[3], data.summary[2]]
      state.summary = data;
    }
  },
  actions: {
    async getSummary({ commit }, { id, params }) {
      const { data } = await this.http.get(`/analytics/${id}/summary`, { params });
      commit('setSummary', data);
    },
    async getAnalyticsTile({ commit }, { id, params }) {
      const response = await this.httpNext.get(`profile/${id}/generate-report`, { params, responseType: 'blob'});
      return response;
    }
  }
};
