<template>
  <div class="p-analytics">
    <div v-if="hideProfileHero" class="p-analytics__hero">
      <transition name="fade-fast">
        <profile-hero :profile="profile" :loading="isLoadingProfile" :full="false" />
      </transition>
      <analytics-start-trial v-if="userIsPro !== 'PRO'" />
      <analytics-export-stats  v-if="userIsPro && !profileId" />
    </div>
    <base-tabs class="p-analytics__tabs" >
      <base-tablist v-show="hideProfileHero && !hideElement">
        <template v-for="tab in tabs">
          <base-tab :key="tab.key" component="router-link" :to="tab.route" exact-path>
            {{ tab.title }}
          </base-tab>
        </template>
        <template #after>
          <time-period :value.sync="timePeriod" />
        </template>
      </base-tablist>

      <template #content>
        <keep-alive exclude="analytics-track-activity">
          <router-view class="tabs-content" :key="$route.path" :time-period="timePeriod" />
        </keep-alive>
      </template>
    </base-tabs>
  </div>
</template>

<script>
import PageHero from 'components/ui/page-hero.vue';
import BaseTabs, { BaseTablist, BaseTab } from 'components/ui/base-tabs/base-tabs-new.vue';
import AnalyticsExportStats from 'components/analytics/analytics-export-stats.vue';
import AnalyticsStartTrial from 'components/analytics/analytics-start-trial.vue';
import TimePeriod from 'components/ui/time-period.vue';
import ProfileHero from "components/profile/profile-hero";
import { clientFetchData } from 'mixins/client-fetch-data';
import SEO from "seo";

export default {
  name: 'analytics-page',
  mixins: [clientFetchData],
  components: {
    PageHero,
    AnalyticsExportStats,
    AnalyticsStartTrial,
    TimePeriod,
    BaseTabs,
    BaseTab,
    BaseTablist,
    ProfileHero
  },
  metaInfo() {
    return {
      title: this.profile?.name,
      titleTemplate: "%s - Analytics",
      meta: [
        { name: "description", content: this.description },
        { property: "og:description", content: this.description },
        { property: "og:url", content: `${this.$root.origin}${this.$route.fullPath }` },
        { property: "og:image", content: this.profileAvatar },
        { property: "al:ios:url", content: `${SEO.iosUrl}/?$deeplink_path=profile/${this.profileId}` },
        { property: "twitter:title", content: `${this.title} - Credits` },
        { property: "twitter:card", content: `${this.$root.origin}/${SEO.summaryImg}` },
        { property: "twitter:description", content: this.description },
      ],
    };
  },
  props: {
    profileId: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      timePeriod: 'all',
      isLoadingProfile: false,
      isMobile: false
    };
  },
  serverPrefetch() {
    return this.fetchDetails();
  },
  clientFetchData() {
    this.fetchDetails();
  },
  beforeMount() {
    if (this.demoProfile.name !== 'undefined') {
      this.$store.commit('analytics/activity/setDemoProfileId', this.demoProfile.id);
    }   
    this.isMobile = this.$deviceDetector.mobile;

    if (this.isMobile) {
      this.$router.push({name: 'login'})
    }

    if (this.profile.subscriptionStatus !== 'PRO' && !this.profileId) {
      window.location.href = 'https://muso.ai/pro';
    }
  },
  updated() {
    if (this.profile.subscriptionStatus !== 'PRO' && !this.profileId) {
      window.location.href = 'https://muso.ai/pro';
    }
  },
  computed: {
    tabs() {
      const params = { id: this.profileId };
      return [
        {
          key: 'overview',
          title: 'Overview',
          route: {
            name: 'analytics',
            params
          }
        },
        {
          key: 'trends',
          title: 'Trends',
          route: {
            name: 'analytics-trends',
            params
          }
        },
        {
          key: 'catalog',
          title: 'Catalog',
          route: {
            name: 'analytics-catalog',
            params
          }
        },
        {
          key: 'playlist-activity',
          title: 'Playlists',
          route: {
            name: 'playlist-activity',
            params
          }
        },
        {
          key: 'charts-activity',
          title: 'Charts',
          route: {
            name: 'chart-activity',
            params
          }
        }
      ];
    },
    userIsPro() {
      return this.$store.getters['user/data']?.subscriptionStatus;
    },
    demoProfile() {
      return this.$store.getters['profile/profileDetails']
    },
    profile() {
      if (this.profileId) {
        return this.demoProfile.name !== 'undefined' ? this.demoProfile : this.$store.getters['user/data'];
      } else {
        return this.$store.getters['user/data'];
      }
    },
    routeName() {
      return this.$route.name;
    },
    hideProfileHero() {
      return this.routeName !== 'activity';
    },
    hideElement() {
      return this.routeName === 'albums' || this.routeName === 'collaborators' || this.routeName === 'credits' || this.routeName === 'activity';
    },
    user() {
      return this.$store.getters['user/data'];
    },
    descriptionName() {
      return this.user?.name || this.demoProfile.name;
    },
    description() {
      return `View credits to ${this.user?.name} on Muso.AI`;
    },
  },
  methods: {
    async fetchDetails() {
      try {
        this.isLoadingProfile = true;
        await this.$store.dispatch("profile/getDetails", { id: this.profileId });
      } finally {
        this.isLoadingProfile = false;
      }
    }
  }
}
</script>

<style lang="scss">
.p-analytics {
  margin-bottom: 80px;

  &__hero {
    display: flex;
    justify-content: space-between;
    padding: 32px 0;
  }
}
</style>
