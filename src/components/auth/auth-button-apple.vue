<template>
  <auth-button-base
    logo-src="/images/icons/apple-logo.svg"
    class="auth-button--apple"
    :disabled="!isScriptReady"
  >
    <!-- We need this fake input with the id="appleid-signin" in order to download special font-face for apple button -->
    <div class="auth-button__fake-btn" id="appleid-signin" aria-hidden="true" />
    <slot>Continue with Apple</slot>
  </auth-button-base>
</template>

<script>
import AuthButtonBase from './auth-button-base.vue';
import { AppleAuth } from 'services/apple-auth';

export default {
  name: 'auth-button-apple',
  components: {
    AuthButtonBase
  },
  data() {
    return {
      isScriptReady: false
    };
  },
  async mounted() {
    if (!window.AppleID) {
      await AppleAuth.loadScript({ nonce: this.$root.nonce });
      this.init();
    } else {
      window.AppleID.auth.renderButton();
    }
    this.isScriptReady = true;
    document.addEventListener('AppleIDSignInOnSuccess', this.handleSuccess);
    document.addEventListener('AppleIDSignInOnFailure', this.handleError);
  },
  beforeDestroy() {
    document.removeEventListener('AppleIDSignInOnSuccess', this.handleSuccess);
    document.removeEventListener('AppleIDSignInOnFailure', this.handleError);
  },
  methods: {
    init() {
      window.AppleID.auth.init({
        // TODO: Move this settings to separate file
        clientId : 'ai.muso',
        scope : 'name email',
        redirectURI : `https://${window.location.host}/auth/apple`,
        usePopup: true
      });
    },
    async handleSuccess(event) {
      const { authorization } = event.detail;
      try {
        await this.$store.dispatch('auth/loginWithApple', {
          token: authorization.id_token
        });
        this.$router.push({ name: 'home' });
      } catch (error) {
        this.$handleError(error);
      }
    },
    handleError(event) {
      // event.detail.error: user_trigger_new_signin_flow | popup_blocked_by_browser | popup_closed_by_user
      // Do nothing...
    }
  }
}
</script>

<style lang="scss">
.auth-button {
  &__fake-btn {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  &--apple {
    font-family: "applied-button-font-0", Inter;
    font-size: 16.5px;
    letter-spacing: -0.4px;
    color: #0C0B09;
    background-color: #FFF;
  }
  &__icon {
    @at-root .auth-button--apple & {
      margin-top: -1px;
      margin-left: 1px;
      width: 18px;
      height: 18px;
    }
  }
}
</style>