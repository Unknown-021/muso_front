import { objectSize } from 'helpers/object';
import { generatePaymentSummary } from './payment.utils';

// All prices are multiplied by 100.
// We do it to eliminate possible problems with the floating point in JavaScript.
export const Pricing = {
  PRO_SUBSCRIPTION: 999,
  DISCOVERY_SEAT: 699
};

const DISCOVERY_SEAT_KEY = 'checkout.discoverySeats';
const CHECKOUT_TIMEOUT = 2 * 60 * 60; // 2 hours

const state = () => ({
  country: 'US',
  currency: 'USD',
  discoverySeats: 1,
  subscription: null,
  history: []
});

export default {
  namespaced: true,
  state,
  getters: {
    subscription: state => state.subscription,
    history: state => state.history,
    discoverySeats: state => state.discoverySeats,
    paymentSummary(state) {
      return generatePaymentSummary('Muso.AI', [{
        price: Pricing.PRO_SUBSCRIPTION,
        label: 'Pro Subscription',
        count: 1,
      }, {
        price: Pricing.DISCOVERY_SEAT,
        label: 'Discovery Seats',
        count: state.discoverySeats
      }]);
    },
    paymentRequest(state, getters) {
      return {
        country: state.country,
        currency: state.currency,
        ...getters.paymentSummary
      };
    }
  },
  mutations: {
    setSubscription(state, subscription) {
      state.subscription = objectSize(subscription) ? subscription : null;
    },
    setHistory(state, data) {
      state.history = data;
    },
    initDiscoverySeats(state, data) {
      state.discoverySeats = data;
    },
    setDiscoverySeats(state, data) {
      state.discoverySeats = data;
      const cookieOptions = {
        path: '/',
        maxAge: CHECKOUT_TIMEOUT
      };
      if (data) {
        this.cookie.set(DISCOVERY_SEAT_KEY, data, cookieOptions);
      } else {
        this.cookie.delete(DISCOVERY_SEAT_KEY, cookieOptions);
      }
    }
  },
  actions: {
    async init({ state, commit }) {
      const discoverySeats = this.cookie.get(DISCOVERY_SEAT_KEY) || state.discoverySeats;
      commit('initDiscoverySeats', Number(discoverySeats));
    },
    async createStripeSubscription({ state }, query) {
      const { data } = await this.http.post('payment/stripe/subscription', {
        ...query,
        seatsCount: state.discoverySeats
      });
      return data;
    },
    async createPaypalSubscription({ state, commit }, query) {
      const { data } = await this.http.post('payment/paypal/subscription', {
        ...query,
        seatsCount: state.discoverySeats
      });
      return data;
    },
    async updatePaypalSubscription({ commit }, query) {
      const { data } = await this.http.put('payment/paypal/subscription', query);
      return data;
    },
    async getSubscription({ commit }, query) {
      const { data } = await this.http.get('payment/subscription', query);
      commit('setSubscription', data.subscription);
      return data;
    },
    async getPaymentHistory({ commit }, query) {
      commit('setHistory', []);
      const { data } = await this.http.get('payment/history', query);
      commit('setHistory', data);
    },
    async updateSubscription({ commit }, query) {
      const { data } = await this.http.put('payment/subscription', query);
      return data;
    },
    async cancelSubscription({ dispatch }, { reason }) {
      await this.http.delete('payment/subscription', {
        data: { reason },
      });
      return dispatch('getSubscription');
    },
    async reactivateSubscription({ dispatch }, query) {
      await this.http.put('payment/subscription/reactivate', query);
      return dispatch('getSubscription');
    },
  }
};
