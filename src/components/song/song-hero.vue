<template>
  <div>
    <section class="song-hero">
      <img class="song-hero__main-img" :src="avatar" />

      <div class="song-hero__body">
        <h1 class="song-hero__title ellipsis" :title="song.title">{{ song.title }}</h1>

        <div>
          <artists-enumeration class="song-hero__artists" :artists="primaryArtists">
            by
            <template #postfix>
              <span>•</span>
            </template>
          </artists-enumeration>

          <router-link :to="`/album/${song.collection.id}`">{{ song.collection.title }}</router-link>
        </div>

        <stats-list :items="statsList" class="song-hero__stats-info" />
      </div>
    </section>

    <song-details class="song-hero__details" :song="song" />
  </div>
</template>

<script>
import ArtistsEnumeration from 'components/artist/artists-enumeration';
import SongDetails from './details.vue';
import StatsList from 'components/ui/stats-list.vue';

export default {
  name: 'song-hero',
  components: {
    ArtistsEnumeration,
    SongDetails,
    StatsList
  },
  props: {
    song: {
      type: Object,
      required: true
    }
  },
  computed: {
    avatar() {
      return this.song.collection.avatarUrl || 'images/default-avatars/collection-default.svg';
    },
    primaryArtists() {
      return this.song.primaryArtists || [];
    },
    statsList() {
      return [
        { title: 'Collaborators', value: this.song.collaboratorCount }
      ];
    }
  }
};
</script>

<style lang="scss">
.song-hero {
  display: flex;
  &__main-img {
    width: 160px;
    height: 160px;
    flex-shrink: 0;
    @media (max-width: 767px) {
      width: 104px;
      height: 104px;
    }
    @media (min-width: 768px) {
      margin-right: 28px;
      width: 160px;
      height: 160px;
    }
  }
  &__body {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    width: 0;
    position: relative;
    @media (max-width: 767px) {
      margin-left: 25px;
    }
    @media (min-width: 768px) {
      width: 0;
      flex-grow: 1;
      justify-content: center;
    }
  }
  &__title {
    margin-top: 7px;
    margin-bottom: 11px;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: 1px;
    color: #ffffff;

    @media (min-width: 768px) {
      margin-top: 0;
      margin-bottom: 6px;
      font-size: 50px;
      font-weight: bold;
      line-height: 1.2;
      letter-spacing: 0;
    }
  }
  &__artists {
    display: inline;
  }
  &__stats-info {
    display: flex;
    @media (max-width: 767px) {
      display: none !important;
    }
    @media (min-width: 768px) {
      margin-top: 28px;
      margin-bottom: 2px;
    }
  }
  &__details {
    margin-top: 23px;
    @media (min-width: 768px) {
      margin-top: 30px;
    }
  }
}
</style>
