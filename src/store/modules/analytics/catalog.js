import { paginated, mergeParams } from 'helpers/pagination-new';

const state = () => ({
    data: [],
    group: 'tracks'
});

export default {
    namespaced: true,
    state,
    getters: {
        data: state => state.data,
        group: state => state.group
    },
    mutations: {
        setData(state, data) {
            state.data = data;
        },
        pushData(state, data) {
            state.data = state.data.concat(data);
        },
        setGroup(state, data) {
            state.group = data;
        }
    },
    actions: {
        async getCatalog({ commit }, { id, params, pagination }) {
            if (pagination.page === 1) {
                commit('setData', []);
            }
            const response = paginated(await this.http.get(`/analytics/${id}/catalogue`, {
                params: mergeParams(params, pagination)
            }));

            if (params.group === "collaborators") {
                response.data = response.data.map(item => ({...item, label: item.type.toLowerCase()}));
            }
            commit('pushData', response.data);
            return response;
        }
    }
};