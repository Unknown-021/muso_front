import albums from './user-albums';
import { resetState } from 'store/store.utils';
import { normalizeArtist, normalizeProfile } from './user.utils';

const state = () => ({
  data: null,
  collaboratorsFetched: false,
  collaborators: []
});

const getters = {
  data: state => state.data,
  artists: state => state.data?.artists || [],
  collaborators: state => state.collaborators
};

const mutations = {
  reset: resetState(state),
  setUser(state, data) {
    state.data = data;
  },
  setCollaborators(state, data) {
    state.collaborators = data;
  },
  setCollaboratorsFetched(state, data) {
    state.collaboratorsFetched = data;
  }
};

const actions = {
  async getDetails({ commit }) {
    const { data } = await this.models.user.getProfile();
    const { profileType, fullName, artists, pendingProfiles, pendingArtists, ...userData } = data;
    const user = {
      ...userData,
      // TODO: Remove later "No Name" fallback
      name: fullName || 'No Name',
      label: profileType,
      artists: artists.map(normalizeArtist),
      pendingArtists: pendingArtists.map(normalizeArtist),
      pendingProfiles: pendingProfiles.map(normalizeProfile)
    };
    commit('setUser', user);
  },
  async getCollaborators({ state, commit }) {
    const params = {
      profileId: state.data.id,
      profileType: 'PROFESSIONAL',
      limit: 50
    };
    const response = await this.http.get(`/collaborators`, { params });
    commit('setCollaborators', response.data.items);
  },
  async getCollaboratorsIfNeeded({ state, commit, dispatch }, payload) {
    if (!state.collaboratorsFetched) {
      await dispatch('getCollaborators', payload)
      commit('setCollaboratorsFetched', true);
    }
  }
};

export default {
  namespaced: true,
  modules: {
    albums
  },
  state,
  getters,
  mutations,
  actions
};