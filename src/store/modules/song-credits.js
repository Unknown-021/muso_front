import credits from './credits';
import { normalizeCreditsResponse, removeNullAssociations } from 'store/modules/credits.utils';

export default {
  ...credits,
  actions: {
    async getCredits({ commit }, { id, clear = true }) {
      if (clear) {
        commit('setCredits', []);
      }
      const { data } = await this.httpNext.get(`/song/${id}/collaborators`);
      commit('setCredits', normalizeCreditsResponse(data));
    },
    async getCollaborators(context, { id }) {
      const response = await this.http.get(`/song/${id}/credits`);
      return removeNullAssociations(response.data.collaborators);
    },
    async updateCollaborators(context, { id, ...data }) {
      await this.http.put(`/song/${id}/credits`, data);
    }
  }
}
