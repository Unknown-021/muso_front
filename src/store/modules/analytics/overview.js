import { paginated, mergeParams } from 'helpers/pagination-new';

const state = () => ({
	data: [],
	collaborations: [],
	tracks: []
});

export default {
	namespaced: true,
	state,
	getters: {
		data: state => state.data,
		collaborations: state => state.collaborations,
		tracks: state => state.tracks
	},
	mutations: {
		setData(state, data) {
			state.data = data;
		},
		pushData(state, data) {
			state.data = state.data.concat(data);
		},
		setCollaborationsData(state, data) {
			state.collaborations = data.map(item => ({ ...item, label: item.type.toLowerCase() }));
		},
		setTracksData(state, data) {
			state.tracks = data;
		}
	},
	actions: {
		async getActivity({ commit }, { id, type, params, pagination }) {
			if (pagination.page === 1) {
				commit('setData', []);
			}
			const response = paginated(await this.http.get(`/analytics/${id}/activity/${type}`, {
				params: mergeParams(params, pagination)
			}));
			commit('pushData', response.data);
		},
		async getRecentActivity({ dispatch }, { params }) {
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
		async getCollaborationsActivity({ commit }, { id, params }) {
			const { data } = await this.http.get(`/analytics/${id}/profile/collaborators`, { params });
			commit('setCollaborationsData', data.list);
		},
		async getTracks({ commit }, { id, params }) {
			const { data } = await this.http.get(`/analytics/${id}/profile/tracks`, { params });
			commit('setTracksData', data.list);
		}
	},
};