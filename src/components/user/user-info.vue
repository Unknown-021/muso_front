<template>
  <div
    class="user-info"
    :data-loading="loading"
    :data-disabled="disabled"
    @click="goToProfilePageIfCan"
    v-on="$listeners"
  >
    <base-loader class="user-info__loader" v-if="loading" />
    <div class="user-info__img-wrap">
      <profile-avatar class="user-info__img" :profile="user" :avatar-size="avatarSize" width="44" height="44" />
      <div v-if="$slots['avatar-icon']" class="user-info__avatar-icon">
        <slot name="avatar-icon" />
      </div>
    </div>

    <div class="user-info__content">
      <div class="user-info__title">
        <robust-link :to="userRoute" class="user-info__link">
          {{ user.name || '-' }}
        </robust-link>
        <pro-badge v-if="user.isPro" class="user-info__badge" />
        <img v-else-if="user.isVerified" src="/images/icons/shield-check.svg" class="user-info__check-icon" />
        <slot name="name-after" />
      </div>
      <div v-if="$slots.info" class="user-info__text">
        <slot name="info" />
      </div>
    </div>

    <div v-if="$slots.after" class="user-info__after">
      <slot name="after" />
    </div>
  </div>
</template>

<script>
import ProfileAvatar from 'components/ui/profile/profile-avatar.vue';
import BaseLoader from 'components/ui/loader.vue';
import ProBadge from 'components/ui/pro-badge.vue';
import { isParentElementInteractive } from 'helpers/dom';
import { artistRoute, profileRoute } from 'helpers/routing';
import RobustLink from 'components/ui/robust-link.vue';

const types = ['artist', 'professional', 'auto'];

export const props = {
  user: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    default: 'auto',
    validator: value => types.includes(value)
  },
  navigable: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  avatarSize: {
    type: String,
    default: '',
  }
};

export default {
  name: 'user-info',
  components: {
    ProfileAvatar,
    ProBadge,
    RobustLink,
    BaseLoader
  },
  props,
  computed: {
    userRoute() {
      return getUserRoute(this.user, this.type);
    }
  },
  methods: {
    goToProfilePageIfCan(event) {
      if (!this.userRoute) return;
      if (!this.navigable) return;
      if (isParentElementInteractive(event.target)) return;

      this.$router.push(this.userRoute);
    }
  }
}

export function getUserRoute(user, type = 'auto') {
  if (!user.id) return;
  const targetType = type === 'auto'
    ? user.label || user.type
    : type;
  return routeMap(user, targetType);
}

export function routeMap(user, targetType) {
  if (targetType === 'artist') {
    return artistRoute(user);
  } else if (targetType === 'professional') {
    return profileRoute(user);
  }
}

// const routeMap = {
//   'artist': artistRoute,
//   'Artist': artistRoute,
//   'professional': profileRoute,
// };
</script>

<style lang="scss">
@import "~assets/styles/components/info.abstract";

:root {
  @include info-variables(user);
  --user-avatar-icon-background-color: #151413;
}

.user-info {
  @include info(user);
  &[data-loading] {
    pointer-events: none;
  }
  &__loader {
    position: absolute;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 39px;
    transform: scale(0.5);
    ~ * {
      opacity: 0.6;
    }
  }
  &__img {
    border-radius: 100%;
    @at-root [data-disabled] & {
      opacity: 0.7;
    }
  }
  &__avatar-icon {
    position: absolute;
    right: -5px;
    bottom: -5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    width: 20px;
    height: 20px;
    background-color: var(--user-avatar-icon-background-color);
  }
  &__link,
  &__text,
  &__check-icon,
  &__badge {
    @at-root [data-disabled] & {
      opacity: 0.7;
    }
  }
  &__badge {
    margin-left: 5px;
    font-size: 10px;
  }
  &__check-icon {
    flex-shrink: 0;
    margin-left: 4px;
    width: 11px;
  }
  &__after {
    display: flex;
    align-items: center;
    margin-left: auto; 
    padding-left: 10px;
  }
  // We use these styles outside of this component
  &__dot {
    margin-left: 3px;
    margin-right: 3px;
    font-size: 11px;
    color: #8E8D8D;
  }
  &__status {
    font-size: 12px;
    font-weight: 400;
    color: #595857;
  }
}
</style>
