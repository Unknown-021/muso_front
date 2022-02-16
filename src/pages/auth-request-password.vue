<template>
  <div class="auth-page">
    <div class="bg-image-2"></div>

    <div class="auth-card container">
      <router-link class="auth-card__logo-link" to="/">
        <img src="images/MusoM.svg" width="52" height="40" alt="Muso logo" />
      </router-link>

      <fade-height-transition>
        <div v-if="!isPasswordRequested" key="first-step">
          <h1 class="auth-card__title auth-title">Forgot password?</h1>
          <div class="auth-card__inner">
            <p class="auth-card__description">
              Enter the email address you used when you joined and we’ll send you instructions to reset your password.
            </p>

            <form class="auth-form" @submit.prevent="requestNewPassword">
              <form-input v-focus.nested type="text" v-model="userEmail" placeholder="Email address" />
              <brand-button
                class="auth-form__button"
                :disabled="!isValidEmail"
                :loading="isLoading"
              >Continue</brand-button>
            </form>
          </div>
        </div>

        <div
          v-else
          key="second-step"
          class="auth-card__second-step"
        >
          <h1 class="auth-card__title auth-title">Check your email</h1>
          <div class="auth-card__inner">
            <p class="auth-card__description">
              Instructions to reset your password have been sent to you. Please check your email.
            </p>

            <brand-button class="auth-card__back-link" component="router-link" to="/login">
              Back to sign in
            </brand-button>
          </div>
        </div>
      </fade-height-transition>
    </div>
  </div>
</template>

<script>
import FormInput from "components/ui/form-input";
import BrandButton from "components/ui/brand-button";
import FadeHeightTransition from "components/utils/fade-height-transition.vue";
import { isValidEmail } from "helpers/validators";

export default {
  name: 'auth-request-password',
  components: {
    FormInput,
    BrandButton,
    FadeHeightTransition,
  },
  data() {
    return {
      isPasswordRequested: false,
      isLoading: false,
      userEmail: this.$store.getters['auth/userEmail']
    };
  },
  computed: {
    isValidEmail() {
      return isValidEmail(this.userEmail);
    }
  },
  methods: {
    async requestNewPassword() {
      try {
        this.isLoading = true;
        await this.$store.dispatch('auth/forgotPassword', {
          email: this.userEmail
        });
        this.isPasswordRequested = true;
      } catch (error) {
        this.$notify(error.message || 'Something went wrong. Please, try again later', 'error');
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
