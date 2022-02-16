import { normalizeRoles, removeNullAssociations } from './credits.utils';
import { normalizeCollaborators } from './profile.utils';
import { demoProfiles } from './profile.demo';

export default {
  namespaced: true,
  state: () => ({
    profileTop: [],
    profileDetails: null,
    credits: [],
    roles: [],
    albumCredits: [],
    loadingMembers: false,
    members: [],
    collaborators: []
  }),
  getters: {
    top: state => state.profileTop,
    profileDetails: state => state.profileDetails,
    credits: state => state.credits,
    albumCredits: state => state.albumCredits,
    roles: state => state.roles,
    loadingMembers: state => state.loadingMembers,
    members: state => state.members,
    collaborators: state => state.collaborators
  },
  mutations: {
    setProfileTop(state, data) {
      state.profileTop = data;
    },
    setProfileCredits(state, data) {
      state.profileDetails.commonCredits = data;
    },
    setProfileDetails(state, data) {
      state.profileDetails = data;
    },
    setAlbumCredits(state, data) {
      state.albumCredits = data;
    },
    setCredits(state, credits) {
      state.credits = credits;
    },
    appendCredits(state, credits) {
      state.credits = state.credits.concat(credits);
    },
    setRoles(state, data) {
      state.roles = data;
    },
    setLoadingMembers(state, data) {
      state.loadingMembers = data;
    },
    setMembers(state, data) {
      state.members = data;
    },
    setCollaborators(state, data) {
      state.collaborators = data;
    },
    appendCollaborators(state, data) {
      state.collaborators = state.collaborators.concat(data);
    },
    clearMembers(state, data) {
      state.members = data;
    }
  },
  actions: {
    async getTop({ commit }) {
      const { data } = await this.models.profile.getTop();
      commit('setProfileTop', normalizeTopResponse(data));
    },
    async getDetails({ commit, dispatch }, { id }) {
      commit('setProfileDetails', null);
      commit('clearMembers', []);
      const response = await this.models.profile.getDetails(id);
      const availableData = demoProfiles.find(item => item.id === id);
      const data = {
        ...response.data,
        ...availableData,
        // TODO: Remove later
        socialAccounts: []
      };
      commit('setMembers', data.artists)
      await dispatch('socialAccount/getSocialAccounts', data.socialAccounts, { root: true });
      commit('setProfileDetails', data);
    },
    async getRoles({ commit }, { id }) {
      commit('setRoles', []);
      const { data } = await this.models.profile.getParentRoles(id);
      commit('setRoles', normalizeRoles(data));
    },
    async getMembers({ commit }, data) {
      try {
        commit('setLoadingMembers', true);
        const response = await this.models.profile.getArtists({ profileId: data.id })
        commit('setMembers', response.data);
      } finally {
        commit('setLoadingMembers', false);
      }
    },
    async getCollaborators({ commit }, { id, pagination }) {
      if (pagination.page === 1) {
        commit('setCollaborators', []);
      }
      const { data } = await this.models.profile.getCollaborators(id, pagination.query);
      commit('appendCollaborators', normalizeCollaborators(data));
    },
    async getCredits({ commit }, { id, pagination, params }) {
      if (pagination.page === 1) {
        commit('setCredits', []);
      }
      const { data } = await this.models.profile.getCredits(id, {
        ...params,
        ...pagination.query
      });
      commit('appendCredits', data);
    },
    async getAlbumCredits({ commit }, { profileId, albumId }) {
      commit('setAlbumCredits', []);
      const response = await this.http.get(`/profile/${profileId}/collection/${albumId}/credits`);
      const data = response.data.map(mapCreditItem);
      removeNullAssociations(data);
      commit('setAlbumCredits', data);
    }
  },
};

function normalizeTopResponse(data) {
  return data.map(item => {
    const { professional, credit } = item;
    return {
      ...professional,
      credit
    };
  });
}

function mapCreditItem(item) {
  return {
    ...item,
    associations: item.associations.map(mapAssociation)
  };
}

function mapAssociation(item) {
  const { associationId, ...role } = item;
  return {
    ...role,
    id: associationId
  };
}
