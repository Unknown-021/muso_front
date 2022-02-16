<template>
  <master-table class="sources-table">
    <template #header>
      <master-header>
        <template #title>
          <span class="sources-table__title">
            Sources
          </span>
        </template>
        <template #cta v-if="showAddButton">
          <plain-button
            @click="showModal"
            variant="primary"
            class="sources-table__add-btn plain-btn--primary"
          >
          <base-icon
            class="sources-table__add-btn--icon"
            name="add-cross"
          />
            Add Source
          </plain-button>
        </template>
      </master-header>
    </template>

    <sources-table
      class="sources-table__sources-list"
      :data="normalizedSources"
      :loading="isLoading"
      :source-type="sourceType"
      :spotify-sources="getSourcesUrl(spotifySources)"
      :soundcloud-sources="getSourcesUrl(soundcloudSources)"
    />
    <div v-if="!normalizedSources.length && !isLoading" class="zero-static zero-static--light zero-static--sources">
      <base-icon name="list" />
      <span>No Data Available</span>
    </div>
  </master-table>
</template>

<script>
import MasterTable from 'components/ui/master-table.vue';
import MasterHeader from 'components/ui/master-header.vue';
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import BaseIcon from 'components/ui/base-icon/base-icon.vue';
import SourcesTable from './sources-table.vue';

export default {
  name: 'SourcesMasterTable',
  components: {
    MasterTable,
    MasterHeader,
    PlainButton,
    BaseIcon,
    SourcesTable
  },
  props: {
    sourceType: {
      type: String,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    sourceType() {
      this.disableDropdownMenu();
    }
  },
  computed: {
    showAddButton() {
      return (this.sourceType === 'streams' || this.sourceType === 'tiktokViews');
    },
    data() {
      return this.$store.getters['analytics/activity/trackSourcesDetails'];
    },
    spotifySources() {
      return this.data.filter(item => item.source === 'spotify');
    },
    soundcloudSources() {
      return this.data.filter(item => item.source === 'soundcloud');
    },
    youtubeSources() {
      return this.data.filter(item => item.source === 'youtube');
    },
    normalizedSources() {
      let normalizedSources = [];
      if (this.spotifySources[0]) {
        normalizedSources.push({
          ...this.spotifySources[0],
          sourcesCount: this.spotifySources.length
          });
      }
      if (this.soundcloudSources[0]) {
        normalizedSources.push({
          ...this.soundcloudSources[0],
          sourcesCount: this.soundcloudSources.length
          });
      }
      let normalizedSourcesFull = normalizedSources.concat(this.youtubeSources);
      return normalizedSourcesFull;
    }
  },
  methods: {
    showModal() {
      this.$modal.open({
        name: 'add-source',
        props: {
          source: this.sourceType
        }
      });
    },
    disableDropdownMenu() {
      let element = window.document.getElementsByClassName('show')[0]
      element?.classList.remove('show');
    },
    getSourcesUrl(items) {
      return items.map(item => {
        return {
          sourceUrl: item.sourceUrl,
          isRemoved: item.isRemoved,
          isPending: item.isPending
        };
      })
    }
  }
}
</script>

<style lang="scss">
.sources-table {
  width: 368px;
  max-width: 368px;
  margin-bottom: 80px;
  align-self: flex-start;
  border-radius: 4px;

  &::-webkit-scrollbar-thumb {
    display: none;
    background-color: #21201f;
  }
  &__add-btn {
    box-sizing: border-box;
    border: 1px solid transparent;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
    svg {
      margin-right: 4px;
      align-self: center;
      path {
        fill: #6BE7C8
      }
    }
  }
  &__sources-list {
    --table-columns: var(--col-index) 40px 1fr auto;
    max-height: calc(100vh - 330px);

  }
}
.sources-table .master-table__body{
  min-height: 340px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
.sources-table .col-def .skeleton-loader {
  margin-left: 12px;
}
.zero-static--sources {
  margin-top: 25px;
}
</style>
