import { removeArrayElementById } from 'helpers/array';
import { isAlbumReleased } from '../album.utils';
import { toArtistNames, decreaseArtistsCount } from '../artist.utils';

const state = () => ({
  albumsResult: null
});

const getters = {
  albumsResult: state => state.albumsResult
};

const mutations = {
  setAlbumsResult(state, data) {
    state.albumsResult = data;
  },
  clearAlbums(state) {
    if (state.albumsResult) {
      state.albumsResult.list = [];
    }
  },
  updateAlbum({ albumsResult }, album) {
    if (albumsResult) {
      const oldAlbum = albumsResult.list.find(item => item.id === album.id);
      if (oldAlbum) {
        Object.assign(oldAlbum, album)
      }
    }
  },
  deleteAlbum({ albumsResult }, albumId) {
    if (albumsResult) {
      const album = removeArrayElementById(albumsResult.list, albumId);
      if (album) {
        const artistNames = toArtistNames(album.artist || album.performer);
        const countKey = isAlbumReleased(album) ? 'totalPublishedCount' : 'totalUnpublishedCount';
  
        albumsResult.artists = decreaseArtistsCount(albumsResult.artists, artistNames);
        albumsResult[countKey]--;
      }
    }
  },
  pushAlbumsResult(state, data) {
    state.albumsResult.list = state.albumsResult.list.concat(data.list);
  }
};

const actions = {
  async getAlbums({ commit, dispatch }, { query, clear = true }) {
    if (clear) {
      commit('clearAlbums');
    }
    commit('setAlbumsResult', await dispatch('requestAlbums', { query }));
  },
  async getMoreAlbums({ commit, dispatch }, payload) {
    commit('pushAlbumsResult', await dispatch('requestAlbums', payload));
  },
  async requestAlbums({ rootGetters }, { query }) {
    const { data } = await this.http.get('/albums', {
      params: {
        profileId: rootGetters['user/data'].id,
        ...query
      }
    });
    return data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};