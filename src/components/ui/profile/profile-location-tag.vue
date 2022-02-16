<template>
  <p v-if="location" class="location-tag">
    <img class="location-tag__icon" src="images/icons/location.svg" /> {{ location }}
  </p>
</template>

<script>
export default {
  name: 'profile-location-tag',
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  computed: {
    location() {
      let parts = [];
      const { city, country } = this.profile;

      if (city) {
        parts.push(city);
      }
      if (country) {
        parts.push(country);
      }

      return parts.join(', ');
    },
  }
}
</script>

<style lang="scss">
.location-tag {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #F7F7F7;
  &__icon {
    margin-right: 6px;
    width: 16px;
    height: 16px;
    @media (max-width: 767px) {
      display: none;
    }
  }
}
</style>