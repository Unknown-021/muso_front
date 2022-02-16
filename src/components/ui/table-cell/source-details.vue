<template>
  <div class="source-details__wrapper" v-click-outside="hide" @click="navigateToEntity">
    <div class="source-details" :class="{'source-details--removing' : removingStatus}" >
      
      <div v-if="!item.isPending" class="source-details__container">
        <span v-if="item.source === 'tiktok'" class="source-details__title">
          Video {{ index }} {{ removingStatus }}
        </span>
        <span
          v-else-if="countType === 'Playlists Reach' || countType === 'Current position:'"
          class="source-details__title"
        >
          {{ item.name }}
        </span>
        <span v-else class="source-details__title"> {{ item.title || item.trackTitle }} {{ removingStatus }}</span>
        
        <span v-if="countType === 'Streams' && (item.source === 'spotify' || item.source === 'soundcloud') && item.sourcesCount > 1" class="source-details__info">{{ item.sourcesCount }} Links</span>
        <span v-else class="source-details__info">{{ item.user || item.albumTitle }}</span>
        <span
          v-if="countType === 'Current position:'"
          class="source-details__streams"
        >
          {{ countType }} {{ count.toLocaleString("En-Gb") }}
        </span>
        <span v-else class="source-details__streams"
        >{{ count.toLocaleString("En-Gb") }} {{ countType }}</span>
      </div>
      <div v-else class="source-details__pending">
        <span class="source-details__link">
          {{ sourceUrl }}
        </span>
        <span class="source-details__processing">
          Processing
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
import bus from 'services/bus.js';

export default {
  name: "source-details",
  components: {
    vClickOutside
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    countType: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    index: {
      type: Number,
      required: true,
    },
    spotifySources: {
      type: Array,
      default: () => [],
    },
    soundcloudSources: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    sourceUrl() {
      return this.item.source === 'youtube' ? this.item.sourceUrl.slice(12) : this.item.sourceUrl.slice(8);
    },
    removingStatus() {
      return (this.item?.isRemoved || this.item?.isPending) ? '(removing)' : '';
    },
    navigateToSourceLink() {
      return this.sourceListType.length <= 1;
    },
    sourceListType() {
      return this.item.source === "spotify"
        ? this.spotifySources
        : this.soundcloudSources;
    },
  },
  methods: {
    navigateToEntity() {
      if ((this.item.source === 'spotify' || this.item.source === 'soundcloud') && this.countType === 'Streams' && !this.navigateToSourceLink) {
        bus.$emit('showDropdown', this.index - 1)
      } else {
        window.open(this.item.sourceUrl || this.item.externalUrl, '_blank');
        setTimeout(() => this.hide(), 1000)
      }
    },
    hide() {
      this.$store.commit('analytics/activity/setShowDropdown', {index: this.index, show: false})
    },
  }
}
</script>

<style lang="scss">
.source-details {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__title {
    color: var(--overlay-1-color);
    font-weight: 500;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    max-width: 222px;
  }
  &__container {
    display: flex;
    flex-direction: column;
  }
  &__info,
  &__streams {
    color: var(--overlay-2-color);
  }
  &__pending {
    display: flex;
    flex-direction: column;
  }
  &__link {
    font-weight: 600;
    font-size: 14px;
    width: 222px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word; 
  }
  &__processing {
    font-weight: normal;
    font-size: 14px;
    line-height: 120%;
    color: var(--overlay-2-color);
  }
  &__info {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    width: 226px;
  }
  &--removing {
    opacity: 0.5;
  }
}
</style>
