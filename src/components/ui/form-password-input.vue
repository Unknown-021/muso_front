<template>
  <form-input
    class="form-password-input"
    :type="passwordShown ? 'text' : 'password'"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <button slot="suffix" class="form-password-input__icon" type="button" @click="toggleVisibility">
      <img v-if="passwordShown" src="images/icons/password-shown.svg" width="30" height="30" />
      <img v-else src="images/icons/password-hidden.svg" width="30" height="30" />
    </button>
  </form-input>
</template>

<script>
import FormInput from "components/ui/form-input";

export default {
  name: "form-password-input",
  components: {
    FormInput,
  },
  data() {
    return {
      passwordShown: false,
    };
  },
  methods: {
    toggleVisibility() {
      this.passwordShown = !this.passwordShown;
    },
  },
};
</script>

<style lang="scss">
.form-password-input {
  &__icon {
    position: relative;
    -webkit-appearance: none;
    border: 0;
    border-radius: 0;
    padding: 0;
    box-shadow: none;
    background-color: transparent;
  }
}
</style>
