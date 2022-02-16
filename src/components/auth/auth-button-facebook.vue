<template>
  <auth-button-base
    logo-src="/images/icons/facebook-logo.svg"
    class="auth-button--facebook"
    :disabled="isLoading || !isScriptReady"
    @click="login"
  >
    <slot>Continue with Facebook</slot>
  </auth-button-base>
</template>

<script>
import AuthButtonBase from './auth-button-base.vue';
import { FacebookAuth } from 'services/facebook';

export default {
  name: 'auth-button-facebook',
  components: {
    AuthButtonBase
  },
  data() {
    return {
      isScriptReady: false,
      isLoading: false,
      loginStatus: null
    };
  },
  async mounted() {
    if (!window.FB) {
      await FacebookAuth.loadScript({ nonce: this.$root.nonce });
    }
    // We have to fetch facebook login status, before user clicks on button
    // otherwise, safari will block facebook login popup when we try to
    // check login status and perform login in the single method
    this.loginStatus = await FacebookAuth.getLoginStatus();
    this.isScriptReady = true;
  },
  methods: {
    async login() {
      if (!this.isScriptReady) return;

      try {
        this.isLoading = true;
        await this.$store.dispatch('auth/loginWithFacebook',{
          accessToken: await this.getAccessToken()
        });
        this.$router.push({ name: 'home' });
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getAccessToken() {
      const result = this.loginStatus.status === 'connected'
        ? this.loginStatus
        : await FacebookAuth.login();

      return result.authResponse.accessToken;
    }
  }
}
</script>

<style lang="scss">
.auth-button {
  &--facebook {
    color: #FFF;
    background-color: #227BEF;
  }
}
</style>