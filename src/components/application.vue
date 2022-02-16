<template>
  <div id="application">
    <transition name="page-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { clientFetchData } from 'mixins/client-fetch-data';
import * as Socket from 'services/socket';
import { getAuthRedirectRoute } from 'services/router.hooks';

export default {
  name: 'application',
  mixins: [clientFetchData],
  metaInfo: {},
  serverPrefetch() {
    if (this.accessToken) {
      return this.restoreUserSession();
    }
  },
  watch: {
    accessToken: {
      immediate: true,
      async handler(authToken) {
        if (!this.$isServer) {
          // TODO: Uncomment when we migrate notification to v3 API
          // this.handleAuthToken(authToken);
        }
      }
    }
  },
  computed: {
    accessToken() {
      return this.$store.getters['auth/accessToken'];
    }
  },
  methods: {
    async restoreUserSession() {
      try {
        await this.$store.dispatch('auth/restoreSession');
        const redirectRoute = getAuthRedirectRoute(this.$route, this.$store);
        if (redirectRoute) {
          this.$serverRedirect(302, redirectRoute);
        }
      } catch (error) {
        // GET /profile throws 404 if PosgtresDB user isn't linked to the Neptune profile
        if (error.code === 401 || error.code === 404) {
          await this.$store.dispatch('auth/logout');
          this.$serverRedirect(302, { name: 'login' });
        }
        throw error;
      }
    },
    async restoreUserSessionClient() {
      try {
        await this.$store.dispatch('auth/restoreSessionClient');
      } catch (error) {
        this.$handleError(error);
      }
    },
    handleAuthToken(authToken) {
      if (authToken) {
        this.restoreUserSessionClient();
        Socket.init({ authToken });
      } else {
        Socket.destroy();
      }
    }
  }
};
</script>

<style lang="scss">
#application {
  position: relative; // to make application container overlap background-image
  height: 100%;
}

.page-fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 200ms ease-in-out;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>
