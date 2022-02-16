<template>
  <div class="auth-card">
    <router-link class="auth-card__logo-link" to="/">
      <img src="images/MusoM.svg" width="52" height="40" alt="Muso logo" />
    </router-link>
    <h1 class="auth-card__title auth-title">
      Welcome Back
      <span class="visually-hidden">| Login</span>
    </h1>

    <fade-height-transition>
      <div v-if="isFirstStep" key="first-step" class="auth-card__inner">
        <form class="auth-form" @submit.prevent="checkUserAndProceedToNextStep">
          <form-input
            type="email"
            v-focus.nested
            v-model="emailOrUsername"
            placeholder="Email or username"
            autocorrect="off"
            spellcheck="false"
          />
          <brand-button
            class="auth-form__button"
            :disabled="!isValidEmailOrUsername"
            :loading="isCheckingEmail"
          >
            Continue
          </brand-button>
        </form>

        <p class="auth-card__or-separator">or continue with</p>

        <div class="auth-card__auth-buttons">
          <auth-button-facebook />
          <auth-button-apple />
        </div>

        <p class="auth-card__create-account">
          You can create an account using our <a :href="mobileAppUrl">Muso.AI</a> app
        </p>
      </div>

      <div
        v-else
        key="second-step"
        class="auth-card__second-step auth-card__inner"
      >
        <form class="auth-form" @submit.prevent="login">
          <form-input type="text" :value="emailOrUsername" disabled>
            <template #prefix>
              <button class="auth-form__nav-back-icon" type="button" @click="stepBack">
                <plain-arrow-left />
              </button>
            </template>
          </form-input>

          <form-password-input
            v-focus.nested
            v-model="userPassword"
            class="auth-form__pswd-input"
            placeholder="Password"
          />
          <brand-button
            class="auth-form__button"
            :disabled="!isValidPassword"
            :loading="isLogging"
          >
            Sign in
          </brand-button>
        </form>

        <plain-link component="router-link" to="/password-forgot" class="auth-card__forgot-pswd">
          Forgot your password?
        </plain-link>
      </div>
    </fade-height-transition>
  </div>
</template>

<script>
import SEO from "seo";
import FormInput from "components/ui/form-input";
import FormPasswordInput from "components/ui/form-password-input";
import PlainLink from "components/ui/plain-link";
import BrandButton from "components/ui/brand-button";
import FadeHeightTransition from "components/utils/fade-height-transition.vue";
import AuthButtonFacebook from "components/auth/auth-button-facebook";
import AuthButtonApple from "components/auth/auth-button-apple";
import PlainArrowLeft from "assets/images/icons/plain-arrow-left.svg";
import { isValidEmail, isValidPassword } from "helpers/validators";

export default {
  name: 'auth-login-card',
  components: {
    FormInput,
    FormPasswordInput,
    PlainLink,
    BrandButton,
    AuthButtonFacebook,
    AuthButtonApple,
    FadeHeightTransition,
    PlainArrowLeft
  },
  data() {
    return {
      isLogging: false,
      isCheckingEmail: false,
      isFirstStep: true,
      emailOrUsername: this.$store.getters['auth/userEmail'],
      userPassword: ''
    };
  },
  computed: {
    isValidEmailOrUsername() {
      if (this.emailOrUsername.length < 2) {
        return false;
      }

      if (this.emailOrUsername.includes('@')) {
        return isValidEmail(this.emailOrUsername);
      }

      return true;
    },
    isValidPassword() {
      return isValidPassword(this.userPassword);
    },
    mobileAppUrl() {
      return SEO.mobileAppUrl;
    }
  },
  methods: {
    async checkUserAndProceedToNextStep() {
      try {
        this.isCheckingEmail = true;
        const { exists } = await this.$store.dispatch('auth/checkEmail', {
          email: this.emailOrUsername
        });
        if (exists) {
          this.$store.commit('auth/setUserEmail', this.emailOrUsername);
          this.isFirstStep = false;
        } else {
          this.$notify('We couldn’t find an account matching the email you entered', 'error');
        }
      } finally {
        this.isCheckingEmail = false;
      }
    },
    stepBack() {
      this.userPassword = '';
      this.isFirstStep = true;
    },
    async login() {
      try {
        this.isLogging = true;
        await this.$store.dispatch('auth/login', {
          email: this.emailOrUsername,
          password: this.userPassword
        });
        this.$router.push({ name: 'home' });
      } catch (error) {
        this.$notify(error.message || 'Something went wrong. Please try later again', 'error');
      } finally {
        this.isLogging = false;
      }
    }
  },
  beforeMount() {
    const error = this.$route?.query?.errorMessage;
    if (error) {
      this.$notify(error, 'error');
    }
  },
}
</script>

<style lang="scss">
</style>