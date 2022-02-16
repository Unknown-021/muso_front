<template>
  <header class="modal-header-2">
    <album-cover class="modal-header-2__img" :album="album" />
    <div class="modal-header-2__info">
      <h2 class="song-modal__title">
        <editable-content :value="song.title" :save="saveTitle" :enabled="!isPublished" />
      </h2>
      <template v-if="isPublished">
        <transition name="fade-fast" mode="out-in">
          <skeleton v-if="loading" class="modal-header-2__text thin" />
          <p v-else class="modal-header-2__text">  
            <span>ISRC: {{ fullSong.isrc || '-' }}</span>
            <span class="modal-header-2__dot">•</span>
            <span>ISWC: {{ fullSong.iswc || '-' }}</span>
          </p>
        </transition>
      </template>
    </div>
    <div v-if="album.isAdmin" class="modal-header-2__options">
      <song-options
        thick
        :song="song"
        :before-remove="songModal.hide"
        @credits-remove="songModal.hide"
      >
        <template #icon>
          <more-icon width="22" fill="#F7F7F7" />
        </template>
      </song-options>
    </div>
  </header>
</template>

<script>
import AlbumCover from 'components/collection/album-cover.vue';
import EditableContent from 'components/ui/editable-content';
import SongOptions from 'components/song/song-options-edit.vue';
import Skeleton from 'components/ui/skeleton.vue';

export default {
  name: 'song-modal-header',
  components: {
    AlbumCover,
    EditableContent,
    SongOptions,
    Skeleton
  },
  inject: {
    songModal: {
      type: Object,
      required: true
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    song() {
      return this.songModal.song;
    },
    fullSong() {
      return this.songModal.fullSong;
    },
    album() {
      return this.songModal.album;
    },
    isPublished() {
      return Boolean(this.album.releaseDate);
    }
  },
  methods: {
    saveTitle(title) {
      this.$emit('song-change', { title })
    }
  }
}
</script>

<style lang="scss">
.modal-header-2 {
  display: flex;
  align-items: center;
  border-top-left-radius: var(--modal-border-radius);
  border-top-right-radius: var(--modal-border-radius);
  padding: 15px var(--modal-padding-x);
  font-size: 14px;
  font-weight: 500;
  color: #F2F2F2;
  background-color: rgb(37, 36, 35);
  @at-root .modal-box[data-mobile-sliding] & {
    @media (max-width: 767px) {
      margin-top: -20px;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
  }
  &__text {
    margin-top: 3px;
    font-size: 12px;
    font-weight: 400;
    color: #8F8F8F;
    --skeleton-color: #383838;
    &.skeleton {
      margin-top: 6px;
      margin-bottom: 2px;
      width: 200px;
    }
  }
  &__img {
    margin-right: 15px;
    width: 40px;
    height: 40px;
    --album-cover-background-color: #101010;
  }
  &__options {
    display: flex;
    margin-left: auto;
    padding-left: 15px;
  }
}
</style>