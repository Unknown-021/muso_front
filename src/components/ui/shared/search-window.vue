<template>
  <div class="search-window" :data-loading="isLoading">
    <transition
      name="fade"
      @before-enter="isTransitionInProgress = true"
      @after-enter="isTransitionInProgress = false"
    >
      <base-loader
        v-if="isLoading"
        class="search-window__loader"
        :data-no-results="searchResultsCount < 1"
      />
    </transition>

    <div class="search-window__inner">
      <div v-if="searchResultsCount === 0" class="missing-results">
        <span>Oops, no results found. Try something else.</span>
      </div>

      <template v-else-if="searchResultsCount > 0">
        <div
          v-for="category in searchResultsList"
          :key="category.type"
          class="search-category"
        >
          <div class="cat-title">
            <h2>{{ getCategoryTitle(category) }}</h2>
            <variables :route="getCategoryRoute(category)" v-slot="{ route }">
              <template v-if="route">
                <plain-button component="router-link" :to="route" variant="ghost">View All</plain-button>
              </template>
            </variables>
          </div>
          <template v-for="item in category.items">
            <search-item-factory
              :key="item.id"
              ref="item"
              :item="item"
              class="cat-list"
              data-search-item
            />
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import SearchItemFactory from 'components/ui/shared/search-item-factory.vue';
import Variables from 'components/utils/variables.vue';
import BaseLoader from 'components/ui/loader.vue';
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import { arrayFlat } from 'helpers/array';

export default {
  name: 'search-window',
  components: {
    SearchItemFactory,
    Variables,
    BaseLoader,
    PlainButton
  },
  props: {
    keyword: {
      type: String,
      default: ''
    },
    listFocus: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isTransitionInProgress: false
    };
  },
  watch: {
    focusIndex() {
      this.listFocus.scrollToFocusedElement();
    }
  },
  computed: {
    allSearchResultsList() {
      return this.$store.getters['search/searchResultsList'];
    },
    searchResultsList() {
      return this.allSearchResultsList.filter(result => result.items.length);
    },
    searchResultsCount() {
      return this.$store.getters['search/searchResultsCount'];
    },
    items() {
      const itemsItems = this.searchResultsList.map(result => result.items);
      return arrayFlat(itemsItems);
    },
    isLoading() {
      return this.loading || this.isTransitionInProgress;
    },
    focusIndex() {
      return this.listFocus.index;
    }
  },
  methods: {
    getCategoryTitle(category) {
      return mapCategoryTypeToText[category.type];
    },
    getCategoryRoute(category) {
      const name = mapCategoryTypeToRouteName[category.type];
      if (!name) return;

      return {
        name,
        query: { keyword: this.keyword }
      }
    },
    // public method
    navigateToFocusedItem() {
      const selectedItem = this.$refs.item[this.listFocus.index];

      if (selectedItem) {
        selectedItem.navigate();
        this.$emit('close');
      }
    }
  }
}

const mapCategoryTypeToRouteName = {
  'tracks': 'song-search-results',
  'artists': 'artist-search-results',
  'albums': 'collection-search-results',
  'professionals': 'profile-search-results'
};
const mapCategoryTypeToText = {
  'top': 'Top Result',
  'tracks': 'Tracks',
  'artists': 'Artists',
  'albums': 'Albums',
  'professionals': 'Profiles'
};
</script>

<style lang="scss">
.search-window {
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  border-radius: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  min-height: 57px;
  max-height: 565px;
  text-align: left;
  background: #21201f;

  overflow-y: scroll;
  overflow-x: hidden;

  /** Scrollbar - Firefox */
  scrollbar-width: 5px;
  scrollbar-track-color: transparent;
  scrollbar-color: #595857;

  @media (min-width: 768px) {
    border-radius: 8px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  /** Scrollbar - Chrome/Edge/Safari */
  &::-webkit-scrollbar {
    width: 14px;
    height: 18px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #595857;
    background-clip: padding-box;
    width: 5px;
    height: 6px;
    border-radius: 10px;
    border: 5px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &__loader {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    top: 39px;
    transform: scale(0.7);
    &[data-no-results] {
      top: 10px;
    }
  }
  &__inner {
    transition: opacity 250ms linear;
    @at-root {
      .search-window[data-loading] & {
        opacity: 0.7;
        pointer-events: none;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.missing-results {
  color: #595857;
  padding: 14px 20px 15px;
}
.search-window .search-category {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  padding-bottom: 5px;
}
.cat-title {
  margin-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
  color: #f7f7f7;
  & h2 {
    font: inherit;
  }
}
.cat-list {
  padding-left: 20px;
  --profile-avatar-initials-border-color: #000;
  > * {
    padding-left: 0;
    padding-right: 0;
  }
}
.cat-list:hover,
.cat-list:focus,
.cat-list:active,
.cat-list[data-focused] {
  background: #151413;
}
</style>