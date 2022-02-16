<template>
  <div class="auth-page">
    <template v-if="isMobile">
      <download-app-card class="container auth-page__download-app" />
    </template>

    <template v-else>
      <div class="bg-image-1" />
      <auth-login-card class="container" />
    </template>
  </div>
</template>

<script>
import AuthLoginCard from 'components/auth/auth-login-card';
import DownloadAppCard from 'components/ui/download-app-card';
import mobileRouter from 'services/mobile-app-router';

export default {
  name: 'auth-login-page',
  components: {
    AuthLoginCard,
    DownloadAppCard
  },
  data() {
    return {
      isMobile: false
    };
  },
  mounted() {
    this.isMobile = this.$deviceDetector.mobile;
    this.confirmEmailIfCan();
  },
  watch: {
    isUserLoggedIn(value) {
      if (value) {
        this.$store.commit('auth/setUserEmail', '');
      }
    }
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters['auth/isUserLoggedIn'];
    }
  },
  methods: {
    confirmEmailIfCan() {
      const { code } = this.$route.query;
      if (code) {
        this.confirmEmail({ code });
      }
    },
    async confirmEmail({ code }) {
      try {
        await this.$store.models.auth.confirmEmail({ code });

        if (this.$deviceDetector.mobile) {
          mobileRouter.push({ name: 'email-confirmed' });
        } else {
          this.$notify('Your email has been confirmed successfully.', 'info');
        }
      } catch (error) {
        this.$notify(error.message || 'Whoops! Something went wrong.', 'error');
      }
    }
  }
};
</script>

<style scoped lang="scss">
.auth-page {
  &__download-app {
    position: relative;
  }
}
</style>
