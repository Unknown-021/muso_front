import credits from './credits';
import { normalizeCreditsResponse } from './credits.utils';

export default {
  ...credits,
  actions: {
    async getCredits({ commit }, { id, clear = true }) {
      if (clear) {
        commit('setCredits', []);
      }
      const { data } = await this.models.album.getCredits(id);
      commit('setCredits', normalizeCreditsResponse(data));
    },
    async update({ dispatch }, { id, payload }) {
      // Maybe ask backend developer to return fresh album credits data as a response
      // to "put" request instead of doing new request
      await this.http.put(`/album/${id}/songs/collaborators`, payload);
      await dispatch('getCredits', { id, clear: false });
      await dispatch('collection/getSongs', { id, cache: false }, { root: true });
    },
    async addCollaborators({ dispatch }, payload) {
      return dispatch('performCollaboratorsAction', {
        method: 'post',
        payload
      });
    },
    async updateCollaborators({ dispatch }, payload) {
      return dispatch('performCollaboratorsAction', {
        method: 'put',
        payload
      });
    },
    async deleteCollaborators({ dispatch }, payload) {
      return dispatch('performCollaboratorsAction', {
        method: 'delete',
        payload
      });
    },
    async performCollaboratorsAction({ dispatch }, { method, payload }) {
      const { albumId, songIds = [], ...data } = payload;
      await this.http.request({
        url: `/album/${albumId}/collaborators`,
        method,
        data: {
          songIds,
          ...data
        }
      });
      await dispatch('collection/getFullInfo', { id: albumId }, { root: true });
    },
  }
}
