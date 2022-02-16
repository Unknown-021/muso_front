import { paginated, mergeParams } from 'helpers/pagination-new';
import { accumulateObjects } from 'helpers/array';
import { statsPropertyText } from './constants/stats-property';

export const streamsAccumulator = accumulateObjects('value');

const state = () => ({
  data: [],
  chartTotal: [],
  chartSelected: [],
  allTracksData: {
    percentage: 0,
    currentValue: 0,
    prevValue: 0
  },
  totalChange: 0,
  selectedIds: [],
  selectionLimit: 5,
  statsProperty: 'streams'
});

export default {
  namespaced: true,
  state,
  getters: {
    data: state => state.data,
    chartTotal: state => state.chartTotal,
    chartSelected: state => state.chartSelected,
    limitedChartSelected: state => state.chartSelected.slice(0, state.selectionLimit),
    totalStreams: state => state.chartTotal.reduce(streamsAccumulator, 0),
    selectedIds: state => state.selectedIds,
    selectionExceededLimitCount: state => Math.max(state.selectedIds.length - state.selectionLimit, 0),
    statsProperty: state => state.statsProperty,
    statsPropertyText: state => statsPropertyText[state.statsProperty],
    allTracksData: state => state.allTracksData
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },
    pushData(state, data) {
      state.data = state.data.concat(data);
    },
    setChartData(state, { total, selected }) {
      state.chartTotal = total;
      state.chartSelected = selected;
    },
    setTotalChange(state, data) {
      state.totalChange = data;
    },
    setStatsProperty(state, data) {
      state.statsProperty = data;
    },
    setSelectedIds(state, data) {
      state.selectedIds = data;
    },
    setAllTracksData(state, data) {
      state.allTracksData.percentage = data.percentage;
      state.allTracksData.currentValue = data.currentValue;
      state.allTracksData.prevValue = data.prevValue;
    },
    resetChartData(state) {
      state.chartTotal = [];
      state.chartSelected = [];
      state.selectedIds = [];
    }
  },
  actions: {
    async getTrends({ state, commit }, { id, group, params, pagination }) {
      if (pagination.page === 1) {
        commit('setData', []);
      }
      const response = paginated(await this.http.get(`/analytics/${id}/profile/${group}`, {
        params: {
          ...mergeParams(params, pagination),
          statsProperty: state.statsProperty
        }
      }));
      commit('setAllTracksData', response);
      commit('pushData', response.data);
      return response;
    },
    async getTrendsChart({ state, commit }, { id, params }) {
      const { data } = await this.http.post(`/analytics/${id}/line-graph`, {
        ...params,
        ids: state.selectedIds,
        statsProperty: state.statsProperty
      });
      commit('setChartData', data);
      return data
    }
  }
};
