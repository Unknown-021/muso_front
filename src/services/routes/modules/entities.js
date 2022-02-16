export const artist = {
  path: 'artist/:id',
  name: 'artist',
  props: (route) => ({
    artistId: route.params.id
  }),
  meta: {
    mainContentClass: false
  }
};

export const profile = {
  path: 'profile/:id',
  name: 'profile',
  meta: {
    mainContentClass: false
  },
  props: (route) => ({
    profileId: route.params.id
  })
};

export const track = {
  path: 'track/:id',
  name: 'song',
  props: (route) => ({
    songId: route.params.id
  })
};

export const album = {
  path: 'album/:id',
  name: 'collection',
  props: (route) => ({
    albumId: route.params.id
  }),
  meta: {
    mainContentClass: false,
    showSidebar: (store) => {
      const album = store.getters['collection/collectionDetails'];
      store.commit('layout/defineAlbumSidebarVisibility', { album });
      return store.getters['layout/isAlbumSidebarVisible'];
    }
  }
};
