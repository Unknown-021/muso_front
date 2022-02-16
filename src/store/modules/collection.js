import Vue from 'vue';
import credits from './collection-credits';
import { isError, contentDispositionFilename } from 'services/http';
import { blobToFile } from 'helpers/file';
import { ensureTracksNumbers } from './song.utils';
import { normalizeResponse, normalizeSongsResponse } from './album.utils';

const state = () => ({
  collectionTop: [],
  collectionDetails: null,
  albumSongsMap: {}
});

export default {
  namespaced: true,
  modules: {
    credits
  },
  state,
  getters: {
    top: state => state.collectionTop,
    collectionDetails: state => state.collectionDetails,
    albumSongs: state => {
      return albumId => state.albumSongsMap[albumId] || [];
    }
  },
  mutations: {
    setCollectionTop(state, data) {
      state.collectionTop = data;
    },
    setCollectionDetails(state, data) {
      state.collectionDetails = data;
    },
    updateCollectionDetails(state, data) {
      Object.assign(state.collectionDetails, data);
    },
    increaseSongCount(state, albumId) {
      const album = state.collectionDetails;
      if (album?.id === albumId) {
        album.trackCount++;
      }
    },
    decreaseSongCount(state, albumId) {
      const album = state.collectionDetails;
      if (album?.id === albumId) {
        album.trackCount--;
      }
    },
    setAlbumSongsMap(state, { id, songs }) {
      Vue.set(state.albumSongsMap, id, songs);
    },
    addAdmin(state, admin) {
      state.collectionDetails.admins.push({
        isVerified: false,
        profile: admin
      });
    },
    removeAdmin(state, adminId) {
      const indexOf = state.collectionDetails.admins.findIndex(item => {
        return item.profile.id === adminId;
      });
      state.collectionDetails.admins.splice(indexOf, 1);
    },
    updateSong({ albumSongsMap }, song) {
      for (let key in albumSongsMap) {
        const songs = albumSongsMap[key];
        const matchedSong = songs.find(item => item.id === song.id);
        if (matchedSong) {
          Object.assign(matchedSong, song);
          break;
        }
      }
    },
    removeSong(state, { id, songId }) {
      const songs = state.albumSongsMap[id] || [];
      const indexOf = songs.findIndex(item => item.id === songId);
      if (indexOf >= 0) {
        songs.splice(indexOf, 1);
      }
      ensureTracksNumbers(songs, { force: true });
    }
  },
  actions: {
    async getTop({ commit }) {
      const { data } = await this.models.album.getTop();
      commit('setCollectionTop', data);
    },
    async getDetails({ commit }, { id, clear = true }) {
      if (clear) {
        // TODO: Use "null" value instead of empty object
        commit('setCollectionDetails', {});
      }
      const { data } = await this.models.album.getDetails(id);
      commit('setCollectionDetails', normalizeResponse(data));
    },
    async getFullInfo({ dispatch }, { id }) {
      await Promise.all([
        dispatch('getDetails', { id, clear: false }),
        dispatch('credits/getCredits', { id, clear: false }),
        dispatch('getSongs', { id, cache: false })
      ]);
    },
    async getSongs({ state, commit }, { id, cache = true }) {
      const songs = state.albumSongsMap[id];
      if (!songs || !cache) {
        const { data } = await this.models.album.getSongs(id);
        const songs = normalizeSongsResponse(data);
        commit('setAlbumSongsMap', { id, songs });
      }
    },
    async updateSongs(context, { id, songs }) {
      await this.http.put(`/album/${id}/songs`, { songs });
    },
    async createAlbum(context, payload) {
      const { data } = await this.http.post('/album', payload);
      return data;
    },
    async updateInfo({ dispatch }, payload) {
      const { data } = await this.http.put('/album', payload);
      return dispatch('_updateInfo', data);
    },
    async _updateInfo({ commit }, album) {
      commit('updateCollectionDetails', album);
      commit('user/albums/updateAlbum', album, { root: true });
    },
    async uploadCover({ dispatch }, { albumId, image }) {
      const response = await this.http.post('/upload/image', {
        type: 'avatar',
        data: image
      });
      const { data } = await this.http.put('/album', {
        albumId,
        avatarUrl: response.data.url
      });
      return dispatch('_updateInfo', data);
    },
    async deleteAlbum({ commit }, { beforeUpdateStore = noop, albumId }) {
      await this.http.delete('/album', {
        data: { albumId }
      });
      await beforeUpdateStore();
      commit('user/albums/deleteAlbum', albumId, { root: true });
      commit('setCollectionDetails', null);
    },
    async addAdmin({ commit }, { id, profile }) {
      await this.http.post(`/album/${id}/admins`, {
        collaboratorId: profile.id
      });
      commit('addAdmin', profile);
    },
    async removeAdmin({ commit }, { id, profileId }) {
      await this.http.delete(`/album/${id}/admins`, {
        data: {
          collaboratorId: profileId
        }
      });
      commit('removeAdmin', profileId);
    },
    async exportRIN(context, { id }) {
      const url = `${this.http.defaults.baseURL}/album/${id}/rin/download`;
      const res = await fetch(url);
      if (isError(res.status)) {
        throw await res.json();
      }
      blobToFile({
        blob: await res.blob(),
        filename: contentDispositionFilename(res.headers),
        mimeType: 'application/xml'
      });
    }
  }
};

const noop = () => {};
