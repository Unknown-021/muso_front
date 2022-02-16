<template>
  <section class="hero-info">
    <album-cover class="hero-info__main-img" :album="album" />

    <div class="hero-info__body">
      <h1 class="hero-info__title ellipsis-tablet" :title="album.title">{{ album.title }}</h1>

      <div class="hero-info__meta">
        <artists-enumeration class="hero-info__performer" :artists="album.primaryArtists">
          by
          <template #postfix>
            <span class="tablet-none">•</span>
          </template>
        </artists-enumeration>
        <time :datetime="album.releaseDate" class="tablet-none">{{ releaseDateMobile }}</time>
      </div>

      <p class="hero-info__meta mobile-none">
        <template v-if="album.releaseDate">Released {{ releaseDateDefault }} •</template>
        {{ album.trackCount }} Tracks
      </p>

      <stats-list :items="statsList" class="hero-info__stats-info" />
    </div>
  </section>
</template>

<script>
import HorizontalLine from 'components/ui/horizontal-line';
import ArtistsEnumeration from 'components/artist/artists-enumeration';
import AlbumCover from './album-cover.vue';
import StatsList from 'components/ui/stats-list.vue';
const DATE_LOCALIZED_MOBILE = { weekday: 'short', year: 'numeric', day: 'numeric' };
const DATE_LOCALIZED = { month: 'short', year: 'numeric', day: 'numeric' };
export default {
  name: 'album-hero',
  components: {
    HorizontalLine,
    AlbumCover,
    ArtistsEnumeration,
    StatsList
  },
  props: {
    collection: {
      type: Object,
      required: true
      /*
        {
          id: 524409,
          avatarUrl: "https://i.scdn.co/image/ab67616d0000b273138de28e1625fb8b4459df44",
          primaryArtists: [
            {
              id: 166172,
              fullName: "AP"
            }
          ],
          releaseDate: "2019-10-18",
          collaboratorCount: 85,
          trackCount: 31,
          streamCount: 22714120,
          title: "Real Friends"
        }
      */
    }
  },
  computed: {
    album() {
      return this.collection;
    },
    artists() {
      return this.album.primaryArtists.concat(this.album.primaryArtists, this.album.primaryArtists, this.album.primaryArtists, this.album.primaryArtists, this.album.primaryArtists, this.album.primaryArtists);
    },
    releaseDateObj() {
      return new Date(this.collection.releaseDate);
    },
    releaseDateMobile() {
      return this.releaseDateObj.toLocaleDateString('en', DATE_LOCALIZED_MOBILE);
    },
    releaseDateDefault() {
      return this.releaseDateObj.toLocaleDateString('en', DATE_LOCALIZED);
    },
    statsList() {
      return [
        { title: 'Collaborators', value: this.collection.collaboratorCount }
      ];
    }
  }
};
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract";

.hero-info {
  display: flex;
  @media (max-width: 767px) {
    flex-direction: column;
    padding-top: 13px;
  }
  &__main-img {
    width: 180px;
    height: 180px;
    @media (max-width: 767px) {
      margin-left: auto;
      margin-right: auto;
    }
    @media #{$tablet} {
      margin-right: 28px;
      width: 110px;
      height: 110px;
    }
  }
  &__img {
    width: 100%;
    height: 100%;
  }
  &__extra-info-mobile {
    margin-top: 7px;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.3;
    text-align: center;
    color: #595857;
    @media #{$tablet} {
      display: none;
    }
  }
  &__hr-mobile {
    margin-top: 15px;
    margin-bottom: 17px;
    @media #{$tablet} {
      display: none;
    }
  }
  &__body {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    position: relative;
    @media #{$before-tablet} {
      align-items: center;
      margin-top: 16px;
    }
    @media #{$tablet} {
      width: 0;
      flex-grow: 1;
      @at-root .hero-info--editable & {
        justify-content: space-between;
      }
    }
  }
  &__title {
    margin-bottom: 4px;
    max-width: 100%;
    font-size: 26px;
    font-weight: 700;
    line-height: 1.1;
    text-align: center;
    color: #ffffff;
    @media #{$tablet} {
      margin-bottom: 6px;
      font-size: 50px;
      font-weight: bold;
      line-height: 1.2;
      text-align: left;
    }
  }
  &__meta {
    color: #8f8f8f;
    @media #{$before-tablet} {
      text-align: center;
    }
    @media #{$tablet} {
      margin-bottom: 7px;
    }
  }
  &__performer {
    display: inline;
    white-space: normal;
  }
  &__stats-info {
    display: none;
    @media #{$tablet} {
      display: flex;
      margin-top: 21px;
      margin-bottom: 2px;
    }
  }
  &__details {
    @media #{$before-tablet} {
      align-self: flex-start;
    }
    @media #{$tablet} {
      --details-min-height: 20px;
      --details-row-gap: 5px;
      margin-top: 10px;
      > :first-child {
        --details-title-width: 70px;
        margin-right: 65px;
      }
    }
  }
}
</style>
