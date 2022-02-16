<template>
  <base-hero v-bind="$attrs" v-on="$listeners">
    <template #skeleton>
      <skeleton-view />
    </template>

    <!-- We do here v-slot="props" because it allows to render hero only after loading -->
    <template v-slot="props">
      <section class="profile-hero">
        <profile-avatar class="profile-hero__main-img" :profile="profile" avatar-size="large" width="112" height="112" />

        <div class="profile-hero__info">
          <profile-title class="profile-hero__title" :profile="profile" :full="showFullProfileHero" />
          <span v-if="commonCredits" class="profile-hero__credit tag">{{ commonCredits }}</span>
          <profile-location-tag v-if="full" class="profile-hero__location" :profile="profile" />
        </div>

        <div class="profile-hero__second-info">
          <div class="profile-hero__second-info-container">
            <div>
          <profile-bio v-if="profile.bio && showFullProfileHero" :profile="profile" />

          <div class="profile-hero__details mobile-none h-list">
            <div v-if="socialAccounts.length" class="profile-hero__socials-wrap h-item">
                <social-links class="profile-hero__socials" :links="socialAccounts" />
                <mobile-links-button class="profile-hero__socials-btn" @click="openSocialsModal" />
              </div>
              <div v-if="members.length && showFullProfileHero" class="profile-hero__members h-item">
                <div class="mr-15">Member of:</div>
                <template v-for="member in members">
                  <member-circle :key="member.id" :member="member" type="artist" />
                </template>
              </div>
              <stats-list v-if="full" :items="statsList" />
            </div>
            </div>
              <div v-if="playlist && showPlaylist && !hidePublicPlaylist" class="profile-hero__spotify-playlist">
                <a :href="playlist.spotifyLink" target="_blank"> 
                  <div class="profile-hero__playlist-content">
                    <img :src="playlist.avatarUrl" alt="" class="profile-hero__playlist-cover">
                    <div class="profile-hero__playlist-wrapper">
                      <div>
                        <span class="profile-hero__playlist-title">
                          {{ playlist.title }}
                        </span>
                        <span v-if="!playlistNotExpired && usersProfile" class="profile-hero__playlist-title--expired">(Expired)</span>
                      </div>
                      <img src="images/icons/spotify_title.png" class="profile-hero__playlist-logo">
                    </div>
                    <a class="profile-hero__playlist-icon" :href="playlist.spotifyLink">
                      <img src="images/icons/goto.svg" alt="" class="profile-hero__playlist-icon">
                    </a>
                  </div>
                </a>
              </div>
            </div>
        </div>

        <social-links-modal
          :show.sync="socialLinksModalIsOpen"
          :profile="profile"
          :social-accounts="socialAccounts"
        />
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

export default {
  name: 'profile-hero',
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
    StatsList
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
  beforeDestroy() {
    this.$store.commit('profile/setProfileDetails', {})
  },
  computed: {
    members() {
      return this.$store.getters['profile/members'];
    },
    socialAccounts() {
      return this.$store.getters['socialAccount/socialAccounts'];
    },
    commonCredits() {
      if (!this.profile.commonCredits) {
        return '';
      }

      return this.profile.commonCredits.replace(/,/g, ', ');
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

<style lang="scss" scooped>
.profile-hero {
  display: flex;
  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
  @media (min-width: 768px) {
    display: grid;
    grid-template-areas:
      "image info"
      "image second-info";
    grid-template-columns: max-content minmax(0, 1fr);
  }
  &__main-img {
    grid-area: image;
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
  &__info {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    position: relative;
    @media (max-width: 767px) {
      width: 0;
    }
    @media (min-width: 768px) {
      grid-area: info;
      justify-content: flex-end;
    }
  }
  &__second-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    &-container {
      display: flex;
    }
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
  }
  &__location {
    margin-top: 6px;
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
</style>
