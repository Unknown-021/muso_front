<template>
  <transition name="fade-fast" mode="out-in">
    <profile-round-skeleton v-if="loading" :type="type" />

    <article v-else class="profile-round">
      <div class="profile-round__img-wrap" @click="$router.push(userRoute)">
        <profile-avatar class="profile-round__img" :profile="item" avatar-size="large" />
        <div class="profile-round__img-overlay">
          <div class="profile-round__view" />
        </div>
      </div>

      <div class="profile-round__body">
        <div class="profile-round__title-wrap">
          <h3 class="profile-round__title">
            <router-link :to="userRoute">{{ item.name || '-' }}</router-link>
          </h3>
          <img
            v-if="item.isVerified"
            src="/images/icons/verified.svg"
            class="profile-round__verified"
            aria-label="Verified account"
          />
        </div>
        <p v-if="type === 'profile'" class="profile-round__text">
          {{ item.commonCredit || '-' }}
        </p>
      </div>
    </article>
  </transition>
</template>

<script>
import ProfileAvatar from './profile-avatar.vue';
import ProfileRoundSkeleton from './round-skeleton.vue';
import { getUserRoute } from 'components/user/user-info.vue';

export default {
  name: 'profile-round',
  components: {
    ProfileAvatar,
    ProfileRoundSkeleton
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: 'auto' // possible values: auto, professional, artist
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    userRoute() {
      return getUserRoute(this.item, this.type);
    }
  }
};
</script>

<style lang="scss">
.profile-round {
  width: 120px;
  @media (min-width: 768px) {
    width: 130px;
  }
  &__img-wrap {
    position: relative;
    margin-bottom: 11px;
    padding-top: 100%;
    @at-root .profile-round--skeleton & {
      border-radius: 100%;
      background-color: #21201F;
    }
  }
  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    --profile-avatar-initials-font-size: 24px;
    font-weight: 500;
  }
  &__img-overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    cursor: pointer;
    background-color: rgba(4, 3, 2, 0.7);
    opacity: 0;
    transition: opacity 130ms ease-in-out;
    @at-root .profile-round__img-wrap:hover & {
      opacity: 1;
    }
  }
  &__view {
    width: 30px;
    height: 30px;
    background-image: url("images/icons/show.svg");
  }
  &__title-wrap {
    display: flex;
    justify-content: center;
  }
  &__title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    overflow: hidden;
  }
  &__verified {
    flex-shrink: 0;
    margin-top: 2px;
    margin-left: 5px;
    width: 12px;
    height: 14px;
  }
  &__text {
    margin-top: 2px;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    color: #8F8F8F;
  }
}
</style>