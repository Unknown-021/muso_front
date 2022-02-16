<template>
  <base-hero v-bind="$attrs" v-on="$listeners">
    <template #skeleton>
      <artist-hero-skeleton />
    </template>

    <!-- We do here v-slot="props" because it allows to render hero only after loading -->
    <template v-slot="props">
      <section class="artist-hero">
        <div :class="imgClass">
          <div class="artist-hero__img-shadow" />
          <profile-avatar class="artist-hero__avatar" avatar-size="large" :profile="artist" />
          <img class="artist-hero__avatar-empty" src="/images/default-avatars/profile_default.svg" aria-hidden />
        </div>

        <div class="artist-hero__info">
          <div class="artist-hero__title-wrap">
            <profile-title :profile="artist" />
            <mobile-links-button v-if="socialAccounts.length" class="artist-hero__socials-btn-mob" @click="openSocialsModal" />
          </div>
          <span class="artist-hero__credit tag">Artist</span>
          <profile-location-tag class="artist-hero__location" :profile="artist" />
          <profile-bio v-if="artist.bio" :profile="artist" />
        </div>

        <div class="artist-hero__second-info mobile-none">
          <div class="artist-hero__details h-list">
            <div v-if="socialAccounts.length" class="artist-hero__socials-wrap h-item">
              <social-links class="artist-hero__socials" :links="socialAccounts" />
              <mobile-links-button class="artist-hero__socials-btn" @click="openSocialsModal" />
            </div>
            <div v-if="members.length" class="artist-hero__members h-item">
              <div class="mr-15">Members:</div>
              <template v-for="member in members">
                <member-circle :key="member.id" :member="member" type="profile" />
              </template>
            </div>
            <stats-list :items="statsList" />
          </div>
        </div>

        <social-links-modal
          :show.sync="isOpenSocialsModal"
          :profile="artist"
          :social-accounts="socialAccounts"
        />
      </section>
    </template>
  </base-hero>
</template>

<script>
import BaseHero from 'components/ui/base-hero/base-hero';
import ArtistHeroSkeleton from "./artist-hero-skeleton.vue";
import MemberCircle from "components/ui/shared/member-circle";
import MobileLinksButton from "../../assets/images/icons/links-button-mobile.svg";
import SocialLinksModal from "components/ui/social-links-modal.vue";
import ProfileAvatar from "components/ui/profile/profile-avatar.vue";
import ProfileTitle from "components/ui/profile/profile-title.vue";
import SocialLinks from "components/ui/social-links.vue";
import ProfileBio from "components/ui/profile/profile-bio.vue";
import ProfileLocationTag from "components/ui/profile/profile-location-tag.vue";
import StatsList from 'components/ui/stats-list.vue';

export default {
  name: 'artist-hero',
  components: {
    BaseHero,
    MemberCircle,
    MobileLinksButton,
    SocialLinks,
    SocialLinksModal,
    StatsList,
    ProfileBio,
    ProfileLocationTag,
    ProfileAvatar,
    ProfileTitle,
    ArtistHeroSkeleton
  },
  props: {
    artist: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      isOpenSocialsModal: false
    };
  },
  computed: {
    members() {
      return this.$store.getters['artist/artistDetails'].members || [];
    },
    socialAccounts() {
      return this.$store.getters['socialAccount/socialAccounts'] || [];
    },
    statsList() {
      return [
        { title: 'Albums', value: this.artist.albumCount }
      ];
    },
    imgClass() {
      return {
        'artist-hero__img': true,
        'artist-hero__img--empty': !this.artist.avatarUrl
      }
    }
  },
  methods: {
    openSocialsModal() {
      this.isOpenSocialsModal = true;
    }
  }
};
</script>

<style lang="scss">
.artist-hero {
  display: flex;
  &--skeleton {
    @media (max-width: 767px) {
      padding-bottom: 5px;
    }
  }
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
  &__img {
    grid-area: image;
    @media (max-width: 767px) {
      position: relative;
      margin-left: -15px;
      margin-right: -15px;
      width: 100vw;
      height: 100vw;
      min-height: 300px;
      max-height: 350px;
      overflow: hidden;
    }
    @media (min-width: 768px) {
      margin-right: 28px;
      width: 160px;
      height: 160px;
    }
    &--empty {
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: 767px) {
        background-color: #21201F;
      }
    }
  }
  &__img-shadow {
    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      height: 75%;
      pointer-events: none;
    }
    &::before {
      top: -32%;
      background-image: linear-gradient(0, rgba(12, 11, 9, 0) 3.64%, rgba(12, 11, 9, 0.61) 38.33%, #0C0B09 57.42%);
    }
    &::after {
      bottom: -32%;
      background-image: linear-gradient(180deg, rgba(12, 11, 9, 0) 3.64%, rgba(12, 11, 9, 0.61) 38.33%, #0C0B09 57.42%);
      @at-root .artist-hero__img--empty & {
        display: none;
      }
    }
    @media (min-width: 768px) {
      display: none;
    }
  }
  &__avatar {
    width: 100%;
    height: 100%;
    font-size: 24px;
    font-weight: 500;
    @media (max-width: 767px) {
      border-radius: 0;
      @at-root .artist-hero__img--empty & {
        display: none;
      }
    }
  }
  &__hr-mob {
    margin-top: 17px;
    @media (min-width: 768px) {
      display: none;
    }
  }
  &__avatar-empty {
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
      margin-top: 17px;
      width: 100%;
    }
    @media (min-width: 768px) {
      grid-area: info;
      justify-content: flex-end;
    }
  }
  &__second-info {
    width: 100%;
  }
  &__title-wrap {
    display: flex;
    justify-content: space-between;
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
    @media (max-width: 767px) {
      display: none;
    }
    @media (min-width: 1000px) {
      display: none;
    }
  }
  &__socials-btn-mob {
    flex-shrink: 0;
    margin-left: 20px;
    @media (min-width: 768px) {
      display: none;
    }
  }
}
</style>
