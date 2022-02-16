const state = () => ({
  isAlbumSidebarVisible: false,
  isNotificationsVisible: false
});

export default {
  namespaced: true,
  state,
  getters: {
    isAlbumSidebarVisible: (state) => state.isAlbumSidebarVisible,
    isNotificationsVisible: (state) => state.isNotificationsVisible
  },
  mutations: {
    defineAlbumSidebarVisibility(state, { album }) {
      if (album?.id) {
        state.isAlbumSidebarVisible = album.isCollaborator;
      }
    },
    showNotificationsPanel(state) {
      state.isNotificationsVisible = true;
    },
    hideNotificationsPanel(state) {
      state.isNotificationsVisible = false;
    }
  }
};
