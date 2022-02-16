import SocialAccountModel from 'models/social-account';

const state = () => ({
  socialAccounts: []
});

export default {
  namespaced: true,
  state,
  getters: {
    socialAccounts(state) {
      return state.socialAccounts;
    },
  },
  mutations: {
    setSocialAccounts(state, data) {
      state.socialAccounts = data;
    }
  },
  actions: {
    async getSocialAccounts({ commit }, accounts) {
      commit('setSocialAccounts', []);
      const getAccountPromises = accounts.map(item => SocialAccountModel.getSocialAccount(item.id));
      const responses = await Promise.all(getAccountPromises);

      let socialAccounts = responses.map((response, index) => ({
        type: accounts[index].type.toLowerCase(),
        link: response.data.link
      }));
      // Sometimes backend returns social link, thus we need to filter out
      // empty links. Actually, backend developers should fix problem on their side.
      socialAccounts = socialAccounts.filter(item => item.link);

      commit('setSocialAccounts', socialAccounts);
    }
  }
};
