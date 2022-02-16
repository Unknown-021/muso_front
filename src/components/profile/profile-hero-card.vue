<template>
  <base-hero v-bind="$attrs" v-on="$listeners">
    <template #skeleton>
      <skeleton-view />
    </template>

    <!-- We do here v-slot="props" because it allows to render hero only after loading -->
    <template v-slot="props">
      <section class="profile-hero-card">
        <div class="profile-hero-card__main-info">
          <profile-avatar class="profile-hero-card__main-img" :profile="profile" avatar-size="large" width="112" height="112" />
          <div class="profile-hero-card__info">
            <profile-title class="profile-hero-card__title" :profile="profile" :full="showFullProfileHero" />
            <div v-if="commonCredits" class="profile-hero-card__credit-container" >
              <span v-for="(tag, index) in commonCredits" :key="index" class="profile-hero-card__credit tag">{{ tag }}</span>
            </div>
            <profile-location-tag v-if="full" class="profile-hero-card__location" :profile="profile" />
          </div>
        </div>
        <div class="profile-hero-card__second-container">
          <div class="profile-hero-card__second-info">
            <div>
              <div class="profile-hero-card__second-credits">Credits: {{ profile.creditCount }}</div>
              <div class="profile-hero-card__second-collaborators">Collaborators: </div>
            </div>
            <div>Popularity:</div>
          </div>
          <div class="profile-hero-card__second-border"/>
          <profile-bio class="profile-hero-card__bio"  :profile="profile" />
          <div class="profile-hero-card__second-border"/>
          <plain-button
            variant="primary"
            class="sources-table__add-btn plain-btn--primary"
          >
          </plain-button>

          <plain-button
            variant="primary"
            class="sources-table__add-btn plain-btn--primary"
          >
          </plain-button>
        </div>
      </section>
    </template>
  </base-hero>
</template>

<script>
import BaseHero from 'components/ui/base-hero/base-hero';
import SkeletonView from './profile-hero-skeleton';
import MemberCircle from 'components/ui/shared/member-circle';
import MobileLinksButton from '../../assets/images/icons/links-button-mobile.svg';
import SocialLinksModal from 'components/ui/social-links-modal.vue';
import ProfileAvatar from 'components/ui/profile/profile-avatar.vue';
import ProfileTitle from 'components/ui/profile/profile-title.vue';
import ProfileLocationTag from 'components/ui/profile/profile-location-tag.vue';
import ProfileBio from 'components/ui/profile/profile-bio.vue';
import SocialLinks from 'components/ui/social-links.vue';
import StatsList from 'components/ui/stats-list.vue';
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';

export default {
  name: 'profile-hero-card',
  components: {
    BaseHero,
    MemberCircle,
    MobileLinksButton,
    SocialLinks,
    SocialLinksModal,
    SkeletonView,
    ProfileAvatar,
    ProfileTitle,
    ProfileBio,
    ProfileLocationTag,
    StatsList,
    PlainButton
  },
  props: {
    profile: {
      type: Object,
      default: undefined
    },
    full: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      socialLinksModalIsOpen: false
    };
  },
  computed: {
    members() {
      return this.$store.getters['profile/members'];
    },
    socialAccounts() {
      return this.$store.getters['socialAccount/socialAccounts'];
    },
    commonCredits() {
      // if (!this.profile.commonCredits) {
      //   return '';
      // }

      // return this.profile.commonCredits.replace(/,/g, ', ');
      // String[] words = s.split("\\W+");
      let credits = 'Songwriter, Artist';
      const words = credits.split(",");
      return words
    },
    statsList() {
      return [
        { title: 'Credits', value: this.profile.creditCount }
      ];
    },
    showFullProfileHero() {
      return (this.$route.name === 'profile')
    },
    playlist() {
      return this.profile.playlist;
    },
    user() {
      return this.$store.getters['user/data'];
    },
    usersProfile() {
      return this.profile?.id === this.user?.id;
    },
    playlistNotExpired() {
      return this.playlist.status === 'completed';
    },
    showPlaylist() {
      return this.$route.name === 'profile';
    },
    hidePublicPlaylist() {
      return (!this.usersProfile && !this.playlistNotExpired);
    }
  },
  methods: {
    openSocialsModal() {
      this.socialLinksModalIsOpen = true;
    }
  }
};
</script>

<style lang="scss">
.profile-hero-card {
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
  @media (min-width: 768px) {

  }
  &__bio {
    padding: 0 16px;
    padding-top: 10px;
    padding-bottom: 12px;
  }
  &__main-img {
    width: 112px;
    height: 112px;
    font-size: 24px;
    font-weight: 500;
    @media (max-width: 767px) {
      margin-right: 24px;
    }
    @media (min-width: 768px) {
      margin-right: 24px;
      width: 132px;
      height: 132px;
    }
  }
  &__hr-mob {
    margin-top: 17px;
    @media (min-width: 768px) {
      display: none;
    }
  }
  &__main-info {
    display: flex;
    height: 200px;
    background: linear-gradient(355.35deg, #1D1B1A 3.55%, #0C0B09 96.01%);
    padding: 0 16px;
    align-items: center;
  }
  &__info {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
    @media (max-width: 767px) {
      width: 0;
    }
    @media (min-width: 768px) {
    }
  }
  &__second-border {
    border-bottom: 1px solid var(--base-4-color);
    margin: 0 16px;
  }
  &__second-container {
    background-color: var(--base-1-color);
    border-radius: 0px 0px 4px 4px;
  }
  &__second-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 16px 24px;
  }
  &__second-collaborators {
    padding-top: 4px;
  }
  &__title {
    @media (max-width: 767px) {
      margin-bottom: 4px;
    }
  }
  &__members {
    @media (max-width: 767px) {
      display: none;
    }
    @media (min-width: 768px) {
      display: flex;
      align-items: center;
    }
  }
  &__members-list {
    display: flex;
    align-items: center;
  }
  &__credit {
    margin-top: 6px;
    &-container {
      display: flex;
      & .tag {
        margin-right: 8px;
      }
      & .tag:last-of-type {
        margin-right: 0;
      }
    }
  }
  &__location {
    margin-top: 12px;
  }
  &__details {
    @media (min-width: 768px) {
      margin-top: 18px;
    }
  }
  &__socials-wrap {
    display: flex;
    @media (max-width: 767px) {
      order: 1;
    }
  }
  &__socials {
    @media (max-width: 999px) {
      display: none;
    }
  }
  &__socials-btn {
    @media (min-width: 1000px) {
      display: none;
    }
  }
  &__spotify-playlist {
    align-self: flex-end;
    width: 343px;
    height: 76px;
    border-radius: 2px;
    background-color: #1D1B1A;
    margin-left: auto;
    & a {
      text-decoration: none;
    }
  }
  &__playlist {
    &-content {
      display: flex;
      padding: 16px;
    }
    &-cover {
      width: 40px;
      height: 40px;
      margin-right: 16px; 
    }
    &-wrapper {
      display: flex;
      flex-direction: column;
    }
    &-logo {
      padding-top: 4px;
      width: 54px;
    }
    &-icon {
      margin-left: auto;
      align-self: center;
    }
    &-title--expired {
      color: var(--error-color)
    }
  }
}
.profile-hero-card__credit.tag {
  padding: 3px 16px;
}
</style>
