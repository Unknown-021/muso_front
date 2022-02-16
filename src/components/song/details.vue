<template>
  <transition name="fade-fast" mode="out-in">
    <song-details-skeleton v-if="loading" />

    <div v-else class="details-container">
      <div class="song-details__mob-only details-column">
        <div class="details">
          <strong class="details__title">Collaborators:</strong>
          <p class="details__text">{{ song.collaboratorCount || 0 }}</p>
        </div>
      </div>

      <div class="details-column">
        <div class="details">
          <strong class="details__title">Released:</strong>
          <p class="details__text" :data-empty="!formattedDate">{{ formattedDate || '-' }}</p>
        </div>
        <div class="details">
          <strong class="details__title">Genre:</strong>
          <p class="details__text capitalize" :data-empty="!genres.length">{{ genres[0] || '-' }}</p>
        </div>
        <div class="details">
          <strong class="details__title">Length:</strong>
          <p class="details__text" :data="!song.duration">{{ song.duration | DurationFilter }}</p>
        </div>
      </div>

      <div class="details-column">
        <div class="details">
          <strong class="details__title">BPM:</strong>
          <p class="details__text" :data-empty="!song.bpm">{{ song.bpm && Math.round(song.bpm) || '-' }}</p>
        </div>
        <div class="details">
          <strong class="details__title">Key:</strong>
          <p class="details__text" :data-empty="!song.key">{{ song.key || '-' }}</p>
        </div>
      </div>

      <div class="details-column mobile-none">
        <div class="details">
          <div class="details__title">ISRC:</div>
          <div class="details__text" :data-empty="!isrc">{{ isrc || '-' }}</div>
        </div>
        <div class="details">
          <div class="details__title">ISWC:</div>
          <div class="details__text" :data-empty="!song.iswc">{{ song.iswc || '-' }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import SongDetailsSkeleton from './details-skeleton';

const DATE_LOCALIZED = { month: 'long', year: 'numeric', day: 'numeric' };

export default {
  name: 'song-details',
  components: {
    SongDetailsSkeleton
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    song: {
      type: Object,
      default: undefined
    }
  },
  computed: {
    formattedDate() {
      if (!this.song.releaseDate) {
        return '-';
      }

      const date = new Date(this.song.releaseDate);
      return date.toLocaleDateString('en', DATE_LOCALIZED);
    },
    isrc() {
      return this.song?.recording?.isrc;
    },
    genres() {
      return this.song.genres || [];
    }
  },
};
</script>

<style lang="scss">
.song-details {
  &__mob-only {
    @media (min-width: 768px) {
      display: none;
    }
  }
}
</style>
