<template>
  <skeleton-view v-if="loading" />
  <div v-else>
    <div class="t1 mb-20">{{ title }}</div>
    <div class="about mb-10 mb-md-15 mb-xl-20">
      <div class="basic">
        <div class="d-flex align-items-center mb-10">
          <span>Location:</span>
          <a href="#" :class="{ disabled: !location }">{{ location || 'No Location' }}</a>
        </div>
        <div class="d-flex align-items-center">
          <span>Website:</span>
          <a
            :href="website"
            :class="{ disabled: !website }"
            target="_blank"
          >{{ website | URLFilter }}</a>
        </div>
      </div>
      <div class="social">
        <div v-for="socialAccount in socialAccounts" :key="socialAccount.id">
          <div class="d-flex pr-10">
            <component :is="socialAccount.type.toLowerCase()" />
          </div>
          <button class="text" @click="openSocialLink(socialAccount.id)">{{ socialAccount.type }}</button>
        </div>
      </div>
    </div>
    <div class="mb-30 lh-140" v-if="bio">{{ bio }}</div>
  </div>
</template>

<script>
import SkeletonView from "./about-skeleton";
import Facebook from "assets/images/icons/facebook_white.svg";
import Twitter from "assets/images/icons/twitter_white.svg";
import Instagram from "assets/images/icons/instagram_white.svg";
import Spotify from "assets/images/icons/spotify_white.svg";

export default {
  name: "About",
  components: {
    SkeletonView,
    Facebook,
    Twitter,
    Instagram,
    Spotify,
  },
  props: {
    loading: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    location: {
      type: String,
    },
    website: {
      type: String,
    },
    socialAccounts: {
      type: Array,
    },
    bio: {
      type: String,
    },
  },
  methods: {
    openSocialLink(id) {},
  },
};
</script>

<style lang='scss' scoped>
.about {
  display: flex;
  margin-bottom: 30px;

  .basic {
    width: 360px;
    display: flex;
    flex-direction: column;

    span {
      width: 85px;
      font-size: 14px;
      line-height: 20px;

      color: #595857;
    }
    a {
      line-height: 20px;
      color: #f2f2f2;

      &.disabled {
        color: #595857;
        pointer-events: none;
      }
    }
  }
}
.social {
  width: 230px;
  display: flex;
  flex-wrap: wrap;

  > div {
    width: 100px;
    height: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    &:nth-of-type(2n + 1) {
      margin-right: 30px;
    }
  }
}
</style>
