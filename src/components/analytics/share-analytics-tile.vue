<template>
  <base-modal
    ref="modal"
    modal-class="subs-modal share-analytics"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="share-analytics__header">
      <span class="share-analytics__title">Share analytics</span>
    </div>
    <div class="share-analytics__content">
      <base-tabs
        class="share-analytics__tabs"
        @change="changeActiveTab"
        :active-tab="activeTab"
      >
        <base-tablist>
          <template v-for="tab in tabs">
            <base-tab :key="tab.key">
              {{ tab.title }}
            </base-tab>
          </template>
          <template #after>
            <time-period :value.sync="timePeriod" />
          </template>
        </base-tablist>
      </base-tabs>
      <img v-if="!isLoading" class="share-analytics__tile" :src="analyticsTileImg" alt="">
      <div v-else class="share-analytics__tile skeleton-loader" />
      <action-button :class="{'disable-download' : isLoading}" class="share-analytics__btn" @click="downloadImg" variant="primary">Download</action-button>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from 'components/ui/base-modal/base-modal.vue';
import BaseTabs, { BaseTablist, BaseTab } from 'components/ui/base-tabs/base-tabs-new.vue';
import { statsPropertiesShareTile } from 'store/modules/analytics/constants/stats-property';
import TimePeriod from 'components/ui/time-period.vue';
import ActionButton from 'components/ui/action-button.vue';

export default {
  name: 'share-analytics-modal',
  components: {
    BaseModal,
    BaseTabs,
    BaseTab,
    BaseTablist,
    TimePeriod,
    ActionButton
  },
  data() {
    return {
      analyticsTileImg: null,
      activeTab: 'all',
      timePeriod: 'all',
      isLoading: false,
      blobImg: null
    };
  },
  watch: {
    timePeriod: 'fetchTileImg',
    activeTab: 'fetchTileImg'
  },
  created() {
    this.fetchTileImg();
  },
  computed: {
    id() {
      return this.$store.getters['user/data'].id;
    },
    tabs() {
      return statsPropertiesShareTile.map((item) => ({
        key: item.value,
        title: item.title,
      }));
    },
  },
  methods: {
    async fetchTileImg() {
      this.analyticsTileImg = null;
      this.isLoading = true;
      try {
        let tileSourceImg = await this.$store.dispatch("analytics/getAnalyticsTile", {
          id: this.id,
          params: {
            type: this.activeTab,
            period: this.timePeriod
          }
        })
        this.analyticsTileImg = await this.blobToBase64(tileSourceImg);
      } finally {
        this.isLoading = false;
      }
    },
    async blobToBase64(blob) {
      const reader = new FileReader();
      this.blobImg = URL.createObjectURL(blob);
      reader.readAsDataURL(blob);
      return new Promise(resolve => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    },
    changeActiveTab(value) {
      this.activeTab = value;
    },
    downloadImg() {
      let link = document.createElement('a');
      link.href = this.blobImg;
      link.download = 'analytics.png';
      link.click();
    }
  }
};
</script>
<style lang="scss">
.share-analytics.subs-modal {
  width: 850px;
  height: 565px;
  background: var(--base-1-color);
  flex-direction: column;
  flex-grow: 0;
  --modal-border-radius: 2px;
  overflow: hidden;
}
.share-analytics{
  &__header {
     display: flex;
     align-items: center;
     padding: 0 16px;
     height: 52px;
     background: var(--base-3-color);
     border-top-left-radius: 2px;
     border-top-right-radius: 2px;
     width: 100%;
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 16px;
  }
  &__tile {
    height: 350px;
    width: 350px;
    margin-top: 32px;
    margin-bottom: 16px;
  }
  &__title {
    font-size: 20px;
    font-weight: 500;
  }
  &__btn {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 3px;
    border-width: 2px;
    width: 360px;
  }
}
.share-analytics__tabs {
  align-self: flex-start;
  padding: 0 16px;
  width: 100%;
}
.share-analytics__tabs .tablist::after {
  content: none;
}
.share-analytics__tabs .tab {
  margin-right: 12px;
  padding-left: 0;
  padding-right: 0;
}
.share-analytics .time-period {
  padding-bottom: 8px;
}
.disable-download {
  pointer-events: none;
}
</style>
