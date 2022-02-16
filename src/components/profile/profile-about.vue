<template>
  <about
    :title="'About'"
    :loading="loading"
    :location="location"
    :website="profile.website"
    :socialAccounts="profile.socialAccounts"
    :bio="profile.bio"
  />
</template>

<script>
import About from "components/ui/about";

export default {
  name: "ProfileAbout",
  components: {
    About,
  },
  computed: {
    loading: function () {
      return this.$store.getters["profile/loadingCredits"];
    },
    profile: function () {
      return this.$store.getters["profile/profileDetails"] || {};
    },
    location: function () {
      return `${this.profile.city ? `${this.profile.city}, ` : ''}${this.profile.country ? this.profile.country : ''}`;
    },
  },
};
</script>

<style lang='scss' scoped>
</style>