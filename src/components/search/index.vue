<template>
  <transition name="fade-fast" mode="out-in">
    <search-skeleton v-if="loading" />

    <div v-else class="search-container">
      <div v-if="searchResultsCount !== 0 && searchResults">
        <template v-if="searchResults.top.total">
          <div class="search-block">
            <div class="header-block">
              <h2 class="title-search">Top results</h2>
            </div>
            <div class="list-container top-result-container">
              <div v-for="item in searchResults.top.items" :key="item.id" class="list-item top-result">
                <profile-round v-if="item.type === 'artists'" type="artist" :item="item" />
                <profile-round v-if="item.type === 'professionals'" type="professional" :item="item" />
                <song-square v-if="item.type === 'tracks'" :item="item" :compact="false" />
                <collection-square v-if="item.type === 'albums'" :item="item" v-bind="albumProps" />
              </div>
            </div>
          </div>
          <h-line />
        </template>
        <!-- TODO: Use factory pattern to render search results -->
        <template v-if="searchResults.tracks.total">
          <div class="search-block song">
            <div class="header-block">
              <h2 class="title-search">Tracks</h2>
              <view-all class="header-block__link" :to="entitySearch('song-search-results')">
                View All
              </view-all>
            </div>
            <div class="list-container song">
              <div
                v-for="item in searchResults.tracks.items"
                :key="item.id"
                class="list-item song col-12 col-md-6 col-xl-4"
              >
                <song-list-item :item="item" />
                <div class="separator" />
              </div>
            </div>
          </div>
          <h-line />
        </template>
        <template v-if="searchResults.artists.total">
          <div class="search-block">
            <div class="header-block">
              <h2 class="title-search">Artists</h2>
              <view-all class="header-block__link" :to="entitySearch('artist-search-results')">
                View All
              </view-all>
            </div>
            <div class="list-container no-scrollbar scroll-wrapper">
              <div v-for="item in searchResults.artists.items" :key="item.id" class="list-item">
                <profile-round :item="item" type="artist" />
              </div>
            </div>
          </div>
          <h-line />
        </template>
        <template v-if="searchResults.albums.total">
          <div class="search-block">
            <div class="header-block">
              <h2 class="title-search">Albums</h2>
              <view-all class="header-block__link" :to="entitySearch('collection-search-results')">
                View All
              </view-all>
            </div>
            <div class="list-container no-scrollbar scroll-wrapper">
              <div v-for="item in searchResults.albums.items" :key="item.id" class="list-item">
                <collection-square :item="item" v-bind="albumProps" />
              </div>
            </div>
          </div>
          <h-line />
        </template>
        <template v-if="searchResults.professionals.total">
          <div class="search-block">
            <div class="header-block">
              <h2 class="title-search">Profiles</h2>
              <view-all class="header-block__link" :to="entitySearch('profile-search-results')">
                View All
              </view-all>
            </div>
            <div class="list-container scroll-wrapper no-scrollbar mobile-horizontal-scroll">
              <div v-for="item in searchResults.professionals.items" :key="item.id" class="list-item">
                <profile-round :item="item" type="professional" />
              </div>
            </div>
          </div>
        </template>
      </div>
      <div v-if="searchResultsCount === 0">
        <div class="missing-results">
          <div class="sad-image"></div>
          <p>Oops, no results found. Try something else.</p>
        </div>
      </div>
      <mobile-footer v-if="searchResultsCount>0" class="mobile-footer"></mobile-footer>
    </div>
  </transition>
</template>

<script>
import MobileFooter from 'components/layouts/mobile-footer';
import ProfileRound from 'components/ui/profile/round';
import SongSquare from 'components/ui/song/square';
import SongListItem from 'components/ui/song/list-item';
import CollectionSquare from 'components/ui/collection/square';
import SearchSkeleton from 'components/search/search-skeleton';
import ViewAll from 'components/ui/view-all.vue';
import HLine from 'components/ui/horizontal-line.vue';

export default {
  name: 'search',
  components: {
    MobileFooter,
    SongSquare,
    ProfileRound,
    CollectionSquare,
    SongListItem,
    SearchSkeleton,
    HLine,
    ViewAll
  },
  computed: {
    keyword() {
      return this.$route.query.keyword;
    },
    loading() {
      return this.$store.getters['search/loading'];
    },
    error() {
      return this.$store.getters['search/error'];
    },
    searchResults() {
      return this.$store.getters['search/searchResults'];
    },
    searchResultsCount() {
      return this.$store.getters['search/searchResultsCount'];
    },
    albumProps() {
      return {
        showRelease: false,
        showArtist: true
      };
    }
  },
  methods: {
    entitySearch(name) {
      const query = {
        keyword: this.keyword
      };
      return { name, query };
    }
  }
};
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract";

.search-page {
  &__footer {
    margin-top: -18px;
  }
}

.header-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  &__link {
    margin-left: 20px;
  }
}

.search-block {
  padding: 16px 0;
  @media #{$tablet} {
    padding: 30px 0;
  }
  &:first-child {
    @media #{$tablet} {
      padding-top: 0;
    }
  }
}
</style>

<style lang="scss" scoped>
@import "~assets/styles/utils/breakpoints.abstract";

.list-container {
  display: flex;
  align-items: flex-start;
  &.song {
    flex-wrap: wrap;
    margin-left: -5px;
    margin-right: -5px;
  }
  &.scroll-wrapper {
    @media #{$before-tablet} {
      margin-left: -16px;
      margin-right: -16px;
      padding-left: 16px;
      padding-right: 16px;
    }
    :last-child {
      padding-right: 0;
    }
  }
}
.scroll-wrapper {
  overflow-x: scroll;
}
.list-item {
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .profile-round {
    width: 120px;
    @media (min-width: 768px) {
      width: 130px;
    }
    @media (min-width: 1280px) {
      width: 160px;
    }
  }
  .album-item {
    width: 120px;
    @media (min-width: 768px) {
      width: 130px;
    }
    @media (min-width: 1280px) {
      width: 160px;
    }
  }
}
.search-container {
  padding-bottom: 16px;
  .hr:last-child {
    display: none;
  }
}
.missing-results {
  padding-top: 245px;
}
.missing-results p {
  color: #595857;
  text-align: center;
}
.sad-image {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background-size: cover;
  background-image: url("images/sad-smile.png");
}
</style>
