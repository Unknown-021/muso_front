<template>
  <base-modal
    ref="modal"
    modal-class="subs-modal add-source"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="add-source__header">
      <span class="add-source__title">Add A Source</span>
    </div>
    <div class="add-source__content">
      <div v-if="source === 'tiktokViews'" class="add-source__text-wrapper">
        <span class="add-source__text--tiktok"
        >Manually send us a TikTok Song URL.</span>
        <br/>
        <span class="add-source__text--tiktok"
        >It can take 24 hours before the source is added.</span>
      </div>
      <div v-else class="add-source__text-wrapper">
        <span class="add-source__text"
        >Send us a missing Youtube or Soundcloud URL to track.</span>
        <br/>
        <span class="add-source__text"
        >It can take up to 24 hours before the source is validated.</span>
      </div>
       
      <form action="" @submit.prevent="addSource">
        <div
          class="add-source__input"
          v-for="(item, index) in sourceList"
          :key="index"
        >
          <input
            class="add-source__input-control"
            v-model="item.link"
            placeholder="Source URL"
            type="search"
          />
          <input type="submit" class="visually-hidden"/>
          <plus-icon
            v-if="isLastSource(index)"
            @click="addSource"
            class="add-source__icon"
            width="16"
          />
          <bin-icon
            v-else
            class="add-source__icon--delete"
            @click="deleteSource(index)"
            width="16"
          />
        </div>
      </form>
      <action-button @click="submitSources" variant="primary-ghost">Submit</action-button>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from 'components/ui/base-modal/base-modal.vue';
import BinIcon from 'assets/images/icons/bin-small.svg';
import PlusIcon from 'assets/images/icons/plus.svg';
import ActionButton from 'components/ui/action-button.vue';

export default {
  name: 'add-source-modal',
  components: {
    BaseModal,
    BinIcon,
    PlusIcon,
    ActionButton
  },
  props: {
    soundcloudSources: {
      type: Array,
      default: () => []
    },
    source: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      sourceList: [{link: ''}],
    };
  },
  created() {
    this.sourceList = this.soundcloudSources.concat(this.sourceList);
  },
  computed: {
    sources() {
      return this.$store.getters['analytics/activity/additionalSourceUrl'];
    },
    user() {
      return this.$store.getters['user/data'];
    },
    trackId() {
      return this.$store.getters['analytics/trends/selectedIds'];
    },
    sourceType() {
      return this.sourceList.map(item => {

        if (item.link.includes('youtube.com/')) {
          return {
            ...item,
            source: 'youtube'
          }
        } else if (item.link.includes('soundcloud.com/')) {
          return {
            ...item,
            source: 'soundcloud'
          }
        } else if (item.link.includes('titktok.com/')) {
          return {
            ...item,
            source: 'titktok'
          }
        } else {
          return {};
        }
      })
    }
  },
  methods: {
    addSource() {
      this.sourceList.push({link: ''});
    },
    deleteSource(index) {
      let sourceResponse = this.$store.dispatch('analytics/activity/removeSource', {
        profileId: this.user.id,
        trackId: this.trackId[0],
        params: {
          link: this.sourceList[index].link,
          source: this.sourceType[index].source
        }
      });
      sourceResponse.then(respone => {
          this.$notify('Source removed', 'info')
          this.sourceList.splice(index, 1);
          this.$router.go(this.$router.currentRoute);
        }
      ).catch(error => this.$handleError(error))
    },
    isLastSource(index) {
      return index === this.sourceList.length - 1;
    },
    submitSources() {
      let sourceResponse = this.$store.dispatch('analytics/activity/submitAdditionalSources', {
        profileId: this.user.id,
        trackId: this.trackId[0],
        params: {
          sources: [this.sourceType[this.sourceType.length - 1]]
        }
      });
      sourceResponse.then(respone => {
          this.$notify('Source submitted', 'info')
          this.hide();
          this.$router.go(this.$router.currentRoute);
        }
      ).catch(error => this.$handleError(error))
    },
    hide() {
      this.$refs.modal.hide();
    }
  }
};
</script>

<style lang='scss'>
@import "~assets/styles/utils/utils.abstract";

.add-source.subs-modal {
  max-width: 580px;
  min-height: 260px;
  background: var(--base-1-color);
  flex-direction: column;
  flex-grow: 0;
  --modal-border-radius: 2px;
  overflow: hidden;
}
.add-source {
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 16px;
  }
  &__text {
    color: var(--overlay-2-color);
    padding-right: 46px;
    &--tiktok {
      padding-right: 98px;
    }
  }
  &__text-wrapper {
    margin-bottom: 32px;
  }
  &__header {
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 52px;
    background: var(--base-3-color);
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }
  &__title {
    font-size: 20px;
    font-weight: 500;
    color: var(--overlay-5-color);
  }
  &__input {
    margin-bottom: 12px;
    display: flex;
  }
  &__input:last-of-type {
    margin-bottom: 28px;
  }
  &__input-control {
    @include reset-outline;
    width: 391px;
    border: 0;
    border-radius: 2px;
    padding: 7px 25px 8px 8px;
    margin-right: 12px;
    height: 32px;
    font-size: 14px;
    caret-color: #4cc2a5;
    color: var(--overlay-1-color);
    background-color: #2a2827;
    border-width: 1px;
    border-style: solid;
    border-color: var(--search-input-border-color, transparent);
    &:hover,
    &:focus {
      border-color: var(--overlay-3-color);
    }
  }
  &__input-control::placeholder {
    color: var(--overlay-2-color);
  }
  &__icon {
    margin-top: 6px;
    cursor: pointer;
  }
  &__icon--delete {
    margin-top: 6px;
    cursor: pointer;
    path {
      fill: red
    }
  }
}
.action-btn--primary-ghost {
  height: 40px;
  margin-bottom: 32px;
}
</style>
