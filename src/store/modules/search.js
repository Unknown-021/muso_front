const dataTypes = ['top', 'tracks', 'artists', 'albums', 'professionals'];

export default {
  namespaced: true,
  state: () => ({
    loading: false,
    searchResults: null,
    tracks: [],
    artists: [],
    professionals: [],
    albums: []
  }),
  getters: {
    loading: (state) => state.loading,
    searchResults: (state) => state.searchResults,
    songSearchResults: (state) => state.tracks,
    artistSearchResults: (state) => state.artists,
    profileSearchResults: (state) => state.professionals,
    collectionSearchResults: (state) => state.albums,
    searchResultsCount(state, getters) {
      const countSearchResults = (res, category) => res + category.items.length;
      return state.searchResults === null
        ? -1
        : getters.searchResultsList.reduce(countSearchResults, 0);
    },
    searchResultsList(state) {
      return state.searchResults
        ? transformResultsToList(state.searchResults, dataTypes)
        : [];
    }
  },
  mutations: {
    setLoading(state, isLoaded) {
      state.loading = isLoaded;
    },
    setSearchResults(state, data) {
      state.searchResults = data;
    },
    setSearchDataOfType(state, { data, type }) {
      state[type] = data;
    },
    pushSearchDataOfType(state, { data, type }) {
      state[type] = state[type].concat(data);
    }
  },
  actions: {
    async search({ commit }, { query }) {
      let results = null;
      if (query.keyword) {
        const response = await this.models.search.searchAll(query);
        results = response.data;
      }
      commit('setSearchResults', results);
    },

    searchSongs({ dispatch }, { query }) {
      return dispatch('searchDataOfType', { query, type: 'tracks' });
    },
    searchMoreSongs({ dispatch }, { query }) {
      return dispatch('searchMoreDataOfType', { query, type: 'tracks' });
    },
    searchArtist({ dispatch }, { query }) {
      return dispatch('searchDataOfType', { query, type: 'artists' });
    },
    searchMoreArtists({ dispatch }, { query }) {
      return dispatch('searchMoreDataOfType', { query, type: 'artists' });
    },
    searchProfiles({ dispatch }, { query }) {
      return dispatch('searchDataOfType', { query, type: 'professionals' });
    },
    searchMoreProfiles({ dispatch }, { query }) {
      return dispatch('searchMoreDataOfType', { query, type: 'professionals' });
    },
    searchCollections({ dispatch }, { query }) {
      return dispatch('searchDataOfType', { query, type: 'albums' });
    },
    searchMoreCollections({ dispatch }, { query }) {
      return dispatch('searchMoreDataOfType', { query, type: 'albums' });
    },

    async searchDataOfType({ commit }, { query, type }) {
      commit('setSearchDataOfType', { data: [], type });
      const response = await this.httpNext.post(`/search`, { ...query, type });
      const data = response.data[type].items;
      commit('setSearchDataOfType', { data, type });
    },
    async searchMoreDataOfType({ commit }, { query, type }) {
      const response = await this.httpNext.post(`/search`, { ...query, type });
      const data = response.data[type].items;
      commit('pushSearchDataOfType', { data, type });
    }
  },
};

function transformResultsToList(resultsMap, categories) {
  return categories.map(category => {
    const { items, total } = resultsMap[category];

    return {
      type: category,
      // TODO: remove filtering when backend will fix problem with having null value in "items" array
      items: items.filter(_ => _),
      total
    };
  });
}
