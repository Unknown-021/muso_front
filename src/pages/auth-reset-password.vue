<template>
  <div class="auth-page">
    <div class="bg-image-2" />

    <section class="auth-card container">
      <router-link class="auth-card__logo-link" to="/">
        <img src="images/MusoM.svg" width="52" height="40" alt="Muso logo" />
      </router-link>
      <h1 class="auth-card__title auth-title">Reset password</h1>

      <div class="auth-card__inner">
        <form class="auth-form" @submit.prevent="resetPassword">
          <form-password-input v-focus.nested v-model="userPassword" placeholder="New password" />
          <p v-if="error" class="form-error form-error--mt">{{ error.message }}</p>
          <brand-button
            class="auth-form__button"
            :disabled="!isValidPassword || !resetCode"
            :loading="isLoading"
          >Reset Password</brand-button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import FormPasswordInput from "components/ui/form-password-input";
import BrandButton from "components/ui/brand-button";
import { isValidPassword } from "helpers/validators";
import mobileRouter from 'services/mobile-app-router';

export default {
  name: 'auth-reset-password',
  components: {
    FormPasswordInput,
    BrandButton,
  },
  props: {
    resetCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isLoading: false,
      error: null,
      userPassword: ''
    };
  },
  mounted() {
    if (!this.resetCode) {
      this.$notify('Check out reset password instructions, which we sent to your email address', 'error', 6000);
    } else if (this.$deviceDetector.mobile) {
      mobileRouter.push({ name: 'password-reset', query: this.$route.query });
    }
  },
  computed: {
    isValidPassword() {
      return isValidPassword(this.userPassword);
    }
  },
  methods: {
    async resetPassword() {
      try {
        this.error = null;
        this.isLoading = true;
        await this.$store.dispatch('auth/resetPassword', {
          code: this.resetCode,
          password: this.userPassword,
          password_confirm: this.userPassword
        });
        this.$router.push({ name: 'home' });
        setTimeout(() => {
          this.$notify('Password successfully updated', 'info', 3000);
        }, 600);
      } catch (error) {
        if (error.code === 400) {
          this.error = error;
        } else {
          this.$notify(error.message || 'Something went wrong. Please, try again later', 'error');
        }
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style lang="scss">
.form-error {
  font-size: 12px;
  line-height: 1.3;
  text-align: start;
  color: #FF3B30;
  &--mt {
    margin-top: 5px;
  }
}
</style>
