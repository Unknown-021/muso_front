<template>
  <transition name="fade-fast" mode="out-in">
    <skeleton-view v-if="loading" />

    <section v-else ref="container" class="collection-songs">
      <div v-if="songs.length" class="section-header">
        <h2 class="section-title">Tracks ({{ album.trackCount || songsData.length }})</h2>
        <transition name="fade-fast">
          <plain-button v-if="isAdminPage && !album.releaseDate" class="section-header-btn" @click="openCreateSongModal">
            <plus-icon class="btn-icon" width="12" /> Add Track
          </plain-button>
        </transition>
      </div>

      <template v-if="songs.length">
        <base-table
          class="collection-songs__table"
          :data-draggable="canEditAlbum"
          :data.sync="songsData"
          :columns="tableColumns"
          :components="tableComponents"
          @row-drag="updateSongsOrder"
        >
          <template v-slot="{ item: song, index }">
            <base-table-row :index="index" :key="song.id" @click="handleSongClick($event, song)">
              <template #reorder-button>
                <button class="zero-btn reorder-btn">
                  <dots-icon />
                </button>
              </template>
            </base-table-row>
          </template>

          <template #mobile-row="{ item: song, cells }">
            <base-table-mobile-row :key="song.id" @click="handleSongClick($event, song)">
              <span class="media__index">
                <base-table-cell :cell="cells.songNumber"  />
              </span>
              <div class="media__content">
                <h3 class="media__title">
                  <base-table-cell :cell="cells.title" class="media__title" />
                </h3>
                <div v-if="cells.collaborators.props.value" class="media__text">
                  <base-table-cell :cell="cells.collaborators" />
                  <template>{{ collaboratorsText(cells.collaborators.props.value) }}</template>
                </div>
              </div>
            </base-table-mobile-row>
          </template>
        </base-table>
      </template>

      <template v-else>
        <div class="zero-state">
          <img class="zero-state__img" src="images/icons/song-note.svg" width="100" height="100" />
          <p class="zero-state__text">No Tracks On Muso.AI Yet</p>
          <template v-if="album.isAdmin">
            <brand-button class="zero-state__btn" @click="openCreateSongModal">Add track</brand-button>
          </template>
        </div>
      </template>
    </section>
  </transition>
</template>

<script>
import SkeletonView from './collaborators-skeleton';
import HorizontalLine from 'components/ui/horizontal-line';
import BaseTable, { BaseTableRow, BaseTableCell, BaseTableMobileRow } from 'components/ui/base-table/base-table.vue';
import DraggableRows from 'components/ui/base-table/draggable-rows.async';
import Skeleton from 'components/ui/skeleton.vue';
import BrandButton from 'components/ui/brand-button.vue';
import ArtistField from 'components/artist/artist-field';
import SongOptionsEdit from 'components/song/song-options-edit.vue';
import PlusIcon from 'assets/images/icons/plus-2.svg';
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import SongTitleEdit from 'components/song/song-title-edit.vue';
import { tableColumnsDef, columns } from 'helpers/table-columns';
import { isParentElementInteractive } from 'helpers/dom';
import { unionByIds } from 'helpers/array';
import { songRoute } from 'helpers/routing';
import DotsIcon from 'assets/images/icons/dots.svg';
import { ensureTracksNumbers2 } from 'store/modules/song.utils';

export default {
  name: 'album-songs',
  components: {
    SkeletonView,
    Skeleton,
    BaseTable,
    BaseTableRow,
    BaseTableCell,
    BaseTableMobileRow,
    HorizontalLine,
    BrandButton,
    PlusIcon,
    PlainButton,
    SongTitleEdit,
    DotsIcon
  },
  props: {
    songs: {
      type: Array,
      /*
        [{
            "id": 466099,
            "fullName": "Chris Janson",
            "avatarUrl": "https://i.scdn.co/image/73e17948367d82f8e3d198d69b682836047d82b7",
            "creditCount": 50,
            "streamCount": 249420935
        }]
      */
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      songsData: []
    };
  },
  watch: {
    songs: {
      immediate: true,
      handler(value) {
        this.songsData = value.slice();
      }
    }
  },
  computed: {
    album() {
      return this.$store.getters['collection/collectionDetails'];
    },
    isAdminPage() {
      return this.album.isAdmin;
    },
    tableComponents() {
      if (this.canEditAlbum) {
        return {
          body: DraggableRows
        };
      }
    },
    tableColumns() {
      return columns([])
        .addIf(this.canEditAlbum, this.reorderColumn)
        .add(tableColumnsDef.songNumber)
        .addIf(this.canEditAlbum, this.songTitleEditCell, tableColumnsDef.songTitle)
        .addIf(this.isAdminPage, this.songArtistEditCell, tableColumnsDef.artist)
        .add(tableColumnsDef.collaboratorsCount)
        .addIf(this.isAdminPage, this.optionsColumn)
        .value();
    },
    canEditAlbum() {
      return !this.isAlbumPublished && this.isAdminPage;
    },
    isAlbumPublished() {
      return Boolean(this.album.releaseDate);
    },
    reorderColumn() {
      return {
        title: '',
        key: 'reorder-button',
        class: 'col-reorder'
      };
    },
    optionsColumn() {
      return {
        title: '',
        key: 'options',
        class: 'col-options',
        component: SongOptionsEdit,
        componentProps: (item) => ({
          song: item
        })
      };
    },
    songTitleEditCell() {
      return {
        ...tableColumnsDef.songTitle,
        component: SongTitleEdit,
        componentProps: (item) => ({
          song: item
        })
      };
    },
    songArtistEditCell() {
      return {
        ...tableColumnsDef.artist,
        component: ArtistField,
        componentProps: (item) => ({
          type: 'artist',
          artists: item.artists,
          artistsMenu: this.getArtistMenu(item.artists),
          album: this.album,
          songIds: [item.id]
        })
      };
    },
    streamsCell() {
      return {
        ...tableColumnsDef.streamsCount,
        class: 'col-streams-wide'
      };
    },
    profileArtists() {
      return this.$store.getters['user/artists'];
    }
  },
  methods: {
    async updateSongsOrder() {
      this.songsData = ensureTracksNumbers2(this.songsData);
      const songs = this.songsData.map(song => ({
        id: song.id,
        trackNumber: song.trackNum
      }));
      try {
        await this.$store.dispatch('collection/updateSongs', {
          id: this.album.id,
          songs
        });
      } catch (error) {
        this.$handleError(error);
      }
    },
    getArtistMenu(artists = []) {
      return unionByIds(artists, this.profileArtists);
    },
    handleSongClick(event, song) {
      if (isParentElementInteractive(event.target)) return;

      if (this.album.isCollaborator) {
        this.$modal.open({
          name: 'song',
          props: {
            song,
            album: this.album
          }
        });
      } else {
        this.$router.push(songRoute(song));
      }
    },
    collaboratorsText(count) {
      return count === 1 ? 'Collaborator' : 'Collaborators';
    },
    openCreateSongModal() {
      this.$modal.open({
        name: 'create-song',
        props: {
          album: this.album
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract.scss";

.collection-songs {
  &__table {
    --tr-min-height: 50px;
    @media #{$before-tablet} {
      margin-top: -7px;
    }
    &[data-draggable] {
      th.col-title {
        margin-left: -22px;
        width: calc(30% + 22px);
      }
    }
    th {
      padding-top: 2px;
    }
    .media {
      min-height: 61px;
    }
    .media__text {
      margin-top: 3px;
    }
  }
}
</style>