<template>
  <section class="hero-info hero-info--editable">
    <base-upload v-if="isAlbumEditable" class="hero-info__main-img" :upload="uploadCover">
      <img v-if="albumSrc" :src="albumSrc" class="hero-info__img album-cover" />
    </base-upload>
    <album-cover v-else class="hero-info__main-img" :album="collection" />

    <p class="hero-info__extra-info-mobile">{{ releaseDateMobile }}</p>
    <horizontal-line class="hero-info__hr-mobile" />

    <div class="hero-info__body">
      <h1 class="hero-info__title" :title="album.title">
        <editable-content
          class="hero-info__editable-title"
          content-class="ellipsis"
          :value="album.title"
          :save="updateTitle"
          :enabled="isAlbumEditable"
        />
      </h1>

      <div class="hero-info__details details-container">
        <div class="details-column">
          <editable-parent class="details">
            <strong class="details__title">Artist:</strong>
            <div class="details__text">
              <album-artist-field :album="collection" />
            </div>
          </editable-parent>
          <div class="details">
            <strong class="details__title">Tracks:</strong>
            <span class="details__text">{{ album.trackCount }}</span>
          </div>
          <editable-parent class="details">
            <strong class="details__title">Genre:</strong>
            <span class="details__text">
              <album-genre-field :album="collection" />
            </span>
          </editable-parent>
        </div>

        <div class="details-column">
          <div class="details">
            <strong class="details__title">Collaborators:</strong>
            <span class="details__text">{{ album.collaboratorCount || 0 }}</span>
          </div>
          <editable-parent class="details">
            <strong class="details__title">Admins:</strong>
            <span class="details__text">
              <admin-field :album="album" />
            </span>
          </editable-parent>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import HorizontalLine from 'components/ui/horizontal-line';
import ArtistsEnumeration from 'components/artist/artists-enumeration';
import EditableParent from 'components/ui/editable-parent';
import EditableContent from 'components/ui/editable-content';
import AlbumHeroSkeleton from './album-hero-skeleton';
import AlbumCover from './album-cover.vue';
import BaseUpload from 'components/ui/base-upload.vue';
import BasePlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import PlusIcon from 'assets/images/icons/plus.svg';
import BaseDropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import AlbumGenreField from 'components/collection/album-genre-field.vue';
import AlbumArtistField from 'components/collection/album-artist-field.vue';
import { getBase64 } from 'helpers/file';
import AdminField from 'components/profile/admin-field.vue';

const DATE_LOCALIZED_MOBILE = { weekday: 'short', year: 'numeric', day: 'numeric' };

export default {
  name: 'album-hero-edit',
  components: {
    HorizontalLine,
    EditableParent,
    EditableContent,
    AlbumCover,
    BaseUpload,
    ArtistsEnumeration,
    AlbumHeroSkeleton,
    BasePlainButton,
    PlusIcon,
    BaseDropdownTrigger,
    AlbumGenreField,
    AdminField,
    AlbumArtistField,
    BaseDropdownTrigger
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
  data() {
    return {
      coverPreview: null,
      isGenresModalVisible: false
    };
  },
  computed: {
    album() {
      return this.collection;
    },
    isAlbumEditable() {
      return this.album.isAdmin && !this.isAlbumPublished;
    },
    profileArtists() {
      return this.$store.getters['user/artists'];
    },
    albumSrc() {
      return this.coverPreview || this.album.avatarUrl;
    },
    artistsList() {
      const names = this.album.primaryArtists.map(artist => artist.fullName);
      return names.join(', ');
    },
    isAlbumPublished() {
      return Boolean(this.album.releaseDate);
    },
    releaseDateObj() {
      return new Date(this.album.releaseDate);
    },
    releaseDateMobile() {
      return this.releaseDateObj.toLocaleDateString('en', DATE_LOCALIZED_MOBILE);
    }
  },
  methods: {
    updateTitle(title) {
      return this.updateAlbum({
        title: title.trim()
      });
    },
    async updateAlbum(data) {
      try {
        await this.$store.dispatch('collection/updateInfo', {
          albumId: this.album.id,
          ...data
        });
      } catch (error) {
        this.$notify(error.message || 'Something went wrong. Please, try again later', 'error');
      }
    },
    async uploadCover(event) {
      const [file] = event.target.files;
      if (!file) return;

      try {
        this.coverPreview = await getBase64(file);
        await this.$store.dispatch('collection/uploadCover', {
          albumId: this.album.id,
          image: this.coverPreview,
        });
      } catch (error) {
        this.coverPreview = null;
        this.$notify(error.message || 'Something went wrong. Please, try again later', 'error');
      }
    }
  }
};
</script>