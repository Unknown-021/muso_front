<template>
  <img
    v-if="profile.avatarUrl"
    :class="avatarClass"
    :src="profile.avatarUrl"
    :alt="imgAlt"
    v-bind="$attrs"
    v-on="$listeners"
  />
  <p v-else-if="avatarSize === 'large'" :class="avatarClass" aria-hidden="true">
    {{ artistInitilas }}
  </p>
  <base-icon v-else-if="avatarSize === 'small'" name="profile-default-small"  />
  <base-icon v-else name="profile-default"  />
</template>

<script>
import BaseIcon from "components/ui/base-icon/base-icon.vue";

export default {
  name: 'profile-avatar',
  components: {
    BaseIcon
  },
  props: {
    profile: {
      type: Object,
      /*
        {
          "id": 549763,
          "type": "PROFESSIONAL",
          "name": "Camila Cabello feat. Swae Lee",
          "avatarUrl": "https://artwork.jaxsta.com/995/Swae_Lee_2019-08.jpg", // can be null
          "isVerified": false,
          "creditCount": 2,
          "commonCredits": "Associated Performer"
        }
      */
      required: true
    },
    alt: {
      type: String
    },
    avatarSize: {
      type: String,
      default: ''
    }
  },
  computed: {
    imgAlt() {
      return this.alt === undefined
        ? `${this.profile.name} avatar`
        : this.alt;
    },
    avatarClass() {
      const avatarType = this.profile.avatarUrl
        ? 'profile-avatar--img'
        : 'profile-avatar--initials';

      return {
        'profile-avatar': true,
        [avatarType]: true
      };
    },
    artistInitilas() {
      const { name } = this.profile;
      const isNameIncludesSpace = name?.includes(' ');

      if (isNameIncludesSpace) {
        const words = name?.split(' ');
        const lastNameIndex = words.length === 3 ? 2 : 1;

        return words[0].charAt(0) + words[lastNameIndex].charAt(0);
      } else {
        return name?.slice(0, 2);
      }
    }
  }
}
</script>

<style lang="scss">
:root {
  --profile-avatar-size: unset;
  --profile-avatar-border: none;
  --profile-avatar-initials-border-color: transparent;
  --profile-avatar-initials-font-size: 12px;
  --profile-avatar-initials-background-color: #21201F;
}

.profile-avatar {
  flex-shrink: 0;
  border-radius: 100%;
  object-fit: cover;
  width: var(--profile-avatar-size);
  height: var(--profile-avatar-size);
  min-width: 30px;
  min-height: 30px;
  &--img {
    border: var(--profile-avatar-border);
    background-color: #1b1a18;
    font-size: 6px;
  }
  &--initials {
    border: 1px solid var(--profile-avatar-initials-border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--profile-avatar-initials-font-size);
    color: #595857;
    background-color: var(--profile-avatar-initials-background-color);
  }
}
</style>