import { taggableRole } from 'store/modules/credits.utils';
import { normalizeRoles } from './credits.utils';
import { normalizeCollaborators } from './profile.utils';

const state = () => ({
  topArtists: [],
  artistDetails: null,
  albums: [],
  credits: [],
  roles: [],
  collaborators: [],
  mainArtistTypes: []
});

export default {
  namespaced: true,
  state,
  getters: {
    top: state => state.topArtists,
    artistDetails: state => state.artistDetails,
    topArtists: state => state.topArtists,
    albums: state => state.albums,
    credits: state => state.credits,
    roles: state => state.roles,
    collaborators: state => state.collaborators,
    mainArtistTypes: state => state.mainArtistTypes,
    getRole: state => {
      return roleId => state.mainArtistTypes.find(item => item.id === roleId) || null;
    },
    getRoleByTag: state => {
      return tag => state.mainArtistTypes.find(item => item.tag === tag) || null;
    }
  },
  mutations: {
    setTopArtists(state, data) {
      state.topArtists = data;
    },
    setArtistDetails(state, data) {
      state.artistDetails = data;
    },
    setAlbums(state, data) {
      state.albums = data;
    },
    appendAlbums(state, data) {
      state.albums = state.albums.concat(data);
    },
    setCredits(state, data) {
      state.credits = data;
    },
    appendCredits(state, data) {
      state.credits = state.credits.concat(data);
    },
    setRoles(state, data) {
      state.roles = data;
    },
    setCollaborators(state, data) {
      state.collaborators = data;
    },
    appendCollaborators(state, data) {
      state.collaborators = state.collaborators.concat(data);
    },
    setMainArtistTypes(state, data) {
      state.mainArtistTypes = data;
    },
    cleanDetails(state) {
      state.artistDetails = null;
    }
  },
  actions: {
    async getTop({ commit }) {
      const { data } = await this.models.artist.getTop();
      commit('setTopArtists', data);
    },
    async getDetails({ commit, dispatch }, { id }) {
      commit('setArtistDetails', null);

      const { data } = await this.models.artist.getDetails(id);
      // TODO: remove later
      data.socialAccounts = [];
      await dispatch('socialAccount/getSocialAccounts', data.socialAccounts, { root: true });
      commit('setArtistDetails', data);
    },
    async getAlbums({ commit }, { id, pagination }) {
      if (pagination.page === 1) {
        commit('setAlbums', []);
      }
      const { data } = await this.models.artist.getAlbums(id, pagination.query);
      commit('appendAlbums', data);
    },
    async getCredits({ commit }, { id, pagination, params }) {
      if (pagination.page === 1) {
        commit('setCredits', []);
      }
      const response = await this.models.artist.getCredits(id, {
        ...params,
        ...pagination.query
      });
      commit('appendCredits', response.data);
      return response;
    },
    async getRoles({ commit }, { id }) {
      commit('setRoles', []);
      const { data } = await this.models.artist.getRoles(id);
      commit('setRoles', normalizeRoles(data));
    },
    async getCollaborators({ commit }, { id, pagination }) {
      if (pagination.page === 1) {
        commit('setCollaborators', []);
      }
      const { data } = await this.models.artist.getCollaborators(id, pagination.query);
      commit('appendCollaborators', normalizeCollaborators(data));
    },
    // async getMainTypes({ commit }) {
    //   const response = await this.http.get('/associations', {
    //     params: {
    //       parent: 'Artists',
    //       limit: 3
    //     }
    //   });
    //   commit('setMainArtistTypes', response.data.map(taggableRole));
    // }
  },
};
