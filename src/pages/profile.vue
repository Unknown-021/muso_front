<template>
  <div class="profile-page container">
    <profile-sticky-header :shown="stickyTabs.sticked" :profile="profile" />
    <page-background-image v-if="!isLoadingProfile && profile.avatarUrl" :src="profile.avatarUrl" />

    <div class="main-content">
      <!-- <breadcrumb /> -->
      <profile-hero ref="hero" :profile="profile" :loading="loading" @info-show="stickyTabs.update" />
      <horizontal-line class="profile-hero-hr" />
      <members-section :members="members" item-type="artist" :loading="isLoadingMembers">
        <template #title>Member of</template>
      </members-section>

      <sticky-tabs @change="stickyTabs.setValue">
        <base-tabs v-model="activeTab" class="profile-page__tabs">
          <base-tab-panel tab="Credits" key="credits">
            <profile-credits
              :data="credits.data"
              :loading="credits.isLoading"
              :pagination="credits.pagination"
              :associations="credits.roles"
              :credits-query.sync="credits.params"
              :fetch-data="fetchCreditsWrap"
            >
              <template #title>{{ profile.creditCount }} Credits</template>
              <template #zero-state>
                <div class="zero-state">
                <img class="zero-state__img" src="images/zero-state/half-circle.svg" width="100" height="100" />
                <p class="zero-state__text">No Credits On Muso.AI Yet</p>
              </div>
              </template>
            </profile-credits>
          </base-tab-panel>

          <base-tab-panel tab="Collaborators" key="collaborators">
            <collaborators-section
              class="profile-page__collaborators"
              :collaborators="collaborators.data"
              :pagination="collaborators.pagination"
              :loading="collaborators.isLoading"
              :fetch-data="fetchCollaboratorsWrap"
            />
          </base-tab-panel>
        </base-tabs>
      </sticky-tabs>

      <mobile-footer v-if="isNeedToShowFooter" />
    </div>
  </div>
</template>

<script>
import SEO from "seo";
import Breadcrumb from "components/breadcrumb";
import ProfileHero from "components/profile/profile-hero";
import ProfileCredits from "components/profile/profile-credits";
import PageBackgroundImage from "components/ui/page-background-image";
import BaseTabs, { BaseTabPanel } from "components/ui/base-tabs/base-tabs.vue";
import MembersSection from "components/member/members-section.vue";
import CollaboratorsSection from 'components/collaborator/collaborators-section.vue';
import StickyTabs, { StickyTriggerController } from 'components/ui/sticky-tabs.vue';
import HorizontalLine from "components/ui/horizontal-line";
import MobileFooter from "components/layouts/mobile-footer.vue";
import { clientFetchData } from "mixins/client-fetch-data";
import { FetchCollaborators } from 'mixins/fetch-collaborators.mixin';
import { FetchProfileCredits } from 'components/profile/profile-credits.mixin';
import ProfileStickyHeader from 'components/profile/profile-sticky-header';

export default {
  name: 'profile-page',
  mixins: [clientFetchData],
  components: {
    Breadcrumb,
    ProfileHero,
    ProfileCredits,
    CollaboratorsSection,
    MembersSection,
    PageBackgroundImage,
    BaseTabs,
    BaseTabPanel,
    StickyTabs,
    HorizontalLine,
    MobileFooter,
    ProfileStickyHeader,
  },
  metaInfo() {
    return {
      title: this.title,
      titleTemplate: "%s - Credits",
      meta: [
        { name: "description", content: this.description },
        { property: "og:description", content: this.description },
        { property: "og:url", content: `${this.$root.origin}${this.$route.fullPath }` },
        { property: "og:image", content: this.profileAvatar },
        { property: "al:ios:url", content: `${SEO.iosUrl}/?$deeplink_path=profile/${this.profileId}` },
        { property: "twitter:title", content: `${this.title} - Credits` },
        { property: "twitter:card", content: `${this.$root.origin}/${SEO.summaryImg}` },
        { property: "twitter:description", content: this.description },
        { property: "twitter:image", content: this.profileAvatar },
      ],
    };
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      activeTab: 'credits',
      stickyTabs: new StickyTriggerController(this),
      isLoadingProfile: false,
      credits: new FetchProfileCredits(this),
      collaborators: new FetchCollaborators(this)
    };
  },
  serverPrefetch() {
    return this.fetchData();
  },
  clientFetchData() {
    this.fetchData();
  },
  watch: {
    profileId() {
      this.activeTab = 'credits';
      this.fetchData();
    }
  },
  computed: {
    socialAccounts() {
      return this.$store.getters['socialAccount/socialAccounts'];
    },
    profile() {
      return this.$store.getters["profile/profileDetails"];
    },
    profileAvatar() {
      return this.profile?.avatarUrl;
    },
    title() {
      return this.profile?.name;
    },
    description() {
      return `View credits to ${this.title} on Muso.AI`;
    },
    loading() {
      return this.isLoadingProfile || this.credits.isLoading || this.collaborators.isLoading || this.isLoadingMembers;
    },
    isLoadingMembers() {
      return this.$store.getters['profile/loadingMembers'];
    },
    members() {
      return this.$store.getters['profile/members'];
    },
    isNeedToShowFooter() {
      if (this.loading) {
        return false;
      }

      if (this.activeTab === 'credits') {
        return this.credits.isNoMoreData;
      } else if (this.activeTab === 'collaborators') {
        return this.collaborators.isNoMoreData;
      }

      return false;
    },
    stickyTop() {
      return this.isMobile ? 5 : 47;
    }
  },
  methods: {
    getStickyTarget(el) {
      return el.querySelector('[role=tablist]');
    },
    fetchData(id = this.profileId) {
      this.credits.pagination.reset();
      this.collaborators.pagination.reset();

      return Promise.all([
        this.fetchDetails(id),
        this.credits.fetchRelatedData(id),
        this.fetchCollaboratorsWrap()
      ]);
    },
    async fetchDetails(id) {
      try {
        this.isLoadingProfile = true;
        await this.$store.dispatch("profile/getDetails", { id });
      } finally {
        this.isLoadingProfile = false;
      }
    },
    fetchCollaboratorsWrap() {
      return this.collaborators.fetchData(this.profileId);
    },
    fetchCreditsWrap() {
      return this.credits.fetchData(this.profileId);
    }
  }
};
</script>

<style lang="scss">
.profile-page {
  @media (min-width: 768px) {
    padding-bottom: 35px;
    padding-top: 24px;
  }
  &__tabs {
    margin-top: 16px;
  }
  &__collaborators {
    @media (min-width: 768px) {
      margin-top: -8px;
    }
  }
}
.profile-hero-hr {
  margin-top: 17px;
  @media (min-width: 768px) {
    display: none;
  }
}
</style>
