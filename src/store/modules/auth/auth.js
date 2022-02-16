import { reset } from './auth.utils';

const ACCESS_TOKEN_KEY = 'auth.accessToken';
const USER_EMAIL_KEY = 'auth.userEmail';
const SECONDS_IN_DAY = 24 * 60 * 60;
const SESSION_DURATION = 3 * 30 * SECONDS_IN_DAY;

const state = () => ({
  accessToken: '',
  userEmail: ''
});

const getters = {
  accessToken: state => state.accessToken,
  isUserLoggedIn: state => Boolean(state.accessToken),
  userEmail: state => state.userEmail,
};

const mutations = {
  initAccessToken(state, accessToken) {
    state.accessToken = accessToken;
  },
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
    const cookieOptions = {
      path: '/',
      maxAge: SESSION_DURATION
    };
    if (accessToken) {
      this.cookie.set(ACCESS_TOKEN_KEY, accessToken, cookieOptions);
    } else {
      this.cookie.delete(ACCESS_TOKEN_KEY, cookieOptions);
    }
  },
  initUserEmail(state, userEmail) {
    state.userEmail = userEmail;
  },
  setUserEmail(state, userEmail) {
    state.userEmail = userEmail;
    const cookieOptions = {
      path: '/',
      maxAge: 15 * 60 // 15 mins
    };
    if (userEmail) {
      this.cookie.set(USER_EMAIL_KEY, userEmail, cookieOptions);
    } else {
      this.cookie.delete(USER_EMAIL_KEY, cookieOptions);
    }
  }
};

const actions = {
  async init({ commit }) {
    const accessToken = this.cookie.get(ACCESS_TOKEN_KEY) || '';
    commit('initAccessToken', accessToken);
    const userEmail = this.cookie.get(USER_EMAIL_KEY) || '';
    commit('initUserEmail', userEmail);
  },
  async login({ dispatch }, payload) {
    await dispatch('_authorize', { action: 'login', payload });
  },
  async loginWithFacebook({ dispatch }, payload) {
    await dispatch('_authorize', { action: 'loginWithFacebook', payload });
  },
  async loginWithApple({ dispatch }, payload) {
    await dispatch('_authorize', { action: 'loginWithApple', payload });
  },
  async loginWithToken({ dispatch }, payload) {
    await dispatch('_authorize', { action: 'loginWithToken', payload });
  },
  async _authorize({ commit, dispatch }, { action, payload }) {
    try {
      const { data } = await this.models.auth[action](payload);
      commit('setAccessToken', data.accessToken);
      await dispatch('restoreSession');
    } catch (error) {
      // Some users have broken accounts: user object in PostgressDB isn't linked to Neptune DB professional edge.
      // In this case we will get "Profile not found" error. When it happens we want to logout user.
      await dispatch('logout');
      throw error;
    }
  },
  async restoreSession({ commit, dispatch }) {
    reset(commit, ['user', 'notification', 'genre']);
    return Promise.all([
      dispatch('user/getDetails', {}, { root: true }),
      // dispatch('artist/getMainTypes', {}, { root: true })
    ]);
  },
  // Here are the requests which should be performed only on the client side.
  // For example notification data. In this way we can speed up log in process
  // by postponing some requests for later.
  async restoreSessionClient({ dispatch }) {
    return Promise.all([
      dispatch('notification/getList', {}, { root: true })
    ]);
  },
  async checkEmail(context, payload) {
    const { data } = await this.models.auth.checkEmail(payload);
    return data;
  },
  async forgotPassword(context, payload) {
    await this.models.auth.forgotPassword(payload);
  },
  async resetPassword({ dispatch }, payload) {
    await dispatch('_authorize', { action: 'resetPassword', payload });
  },
  logout({ commit }) {
    commit('setAccessToken', '');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
