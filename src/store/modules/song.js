import credits from './song-credits';
import { objectAssign } from 'helpers/vue';

const state = () => ({
  songDetails: null
});

export default {
  namespaced: true,
  modules: {
    credits
  },
  state,
  getters: {
    songDetails: (state) => state.songDetails
  },
  mutations: {
    setSongDetails(state, data) {
      state.songDetails = data;
    }
  },
  actions: {
    async getSongDetails({ commit }, { id, clear = true }) {
      // if (clear) {
      //   commit('setSongDetails', null);
      // }
      const { data } = await this.httpNext.get(`/song/${id}`);
      commit('setSongDetails', normalizeResponse(data));
    },
    async getFullInfo({ dispatch }, { id }) {
      await Promise.all([
        dispatch('getDetails', { id, clear: false }),
        dispatch('credits/getCredits', { id, clear: false })
      ]);
    },
    async updateInfo({ commit }, data) {
      const response = await this.http.put('/song', data);
      const song = response.data;
      // Backend return "null" value which will overwrite locally defined track number
      // TODO: Ask backend developer to assign "trackNum" field
      delete song.trackNum;
      commit('collection/updateSong', song, { root: true });
    },
    async createSong({ commit }, { albumId, ...data }) {
      // TOOD: Ask backend developer to return song object, so we don't need to add
      // redundant request to referesh albums songs data
      await this.http.post('/song', {
        collectionId: albumId,
        ...data
      });
      commit('collection/increaseSongCount', albumId, { root: true });
    },
    async deleteSong({ commit }, { songId, albumId }) {
      await this.http.delete('/song', {
        data: { songId }
      });
      return () => {
        commit('collection/decreaseSongCount', albumId, { root: true });
        commit('setSongDetails', null);
        commit('collection/removeSong', { id: albumId, songId }, { root: true });
      };
    }
  },
};

function normalizeResponse(data) {
  const { track, album, ...rest } = data;
  return {
    ...track,
    collection: album,
    ...rest
  };
}
