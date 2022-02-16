<template>
  <base-modal
    ref="modal"
    modal-class="role-modal"
    :mobile-sliding="true"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <header class="role-modal-header">
      <profile-list-item class="role-modal__user" :item="collaborator" :navigable="false" />
    </header>

    <role-modal-action-panel
      :selected-songs.sync="selectedSongIds"
      :checked="isAllSongsChecked && !isLoadingSongs"
      :profile-id="collaborator.id"
      @select-all="selectAllSongs"
      @add-roles="addRolesForSelectedSongs"
      @remove-roles="removeRoles"
    />

    <div class="modal-body role-modal-body">
      <collaborator-role-table
        class="role-modal__table"
        :songs="allSongsCredits"
        :row-skeleton-count="album.trackCount"
        :loading="isLoadingSongs"
        v-slot="{ song, index }"
      >
        <collaborator-role-row
          :index="index"
          :collaborator="collaborator"
          :song="song"
          :selected-songs.sync="selectedSongIds"
          @change="setSongRoles(song, $event)"
          @remove="removeSongRoles(song)"
        />
      </collaborator-role-table>
    </div>
    <div class="modal-buttons">
      <action-button type="reset" @click="hide">Cancel</action-button>
      <action-button variant="primary" :loading="isSaving" @click="saveChanges">Save</action-button>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from 'components/ui/base-modal/base-modal.vue';
import CollaboratorRoleTable from 'components/collaborator/collaborator-role-table.vue';
import CollaboratorRoleRow from 'components/collaborator/collaborator-role-row.vue';
import RoleModalActionPanel from 'components/role/role-modal-action-panel.vue';
import ActionButton from 'components/ui/action-button.vue';
import ProfileListItem from 'components/ui/profile/list-item';
import { clone } from 'helpers/utils';

export default {
  name: 'collaborator-role-modal',
  components: {
    ActionButton,
    BaseModal,
    ProfileListItem,
    CollaboratorRoleTable,
    CollaboratorRoleRow,
    RoleModalActionPanel
  },
  props: {
    collaborator: {
      type: Object,
      required: true
    },
    album: {
      type: Object,
      required: true
    },
    roles: {
      type: Array,
      default: () => []
    },
    songIds: {
      type: Array,
      default: undefined
    }
  },
  data() {
    return {
      allSongsCredits: [],
      selectedSongIds: [],
      modifiedSongs: new Set(),
      isLoadingSongs: false,
      isSaving: false
    };
  },
  created() {
    this.fetchSongs();
    this.$store.dispatch('role/getInitialRoles');
  },
  computed: {
    albumSongs() { 
      return this.$store.getters['collection/albumSongs'](this.album.id);
    },
    albumCredits() {
      // We want to clone credits data since we will modify them locally
      return clone(this.$store.getters['profile/albumCredits']);
    },
    selectedSongs() {
      return this.selectedSongIds.map(songId => {
        return this.allSongsCredits.find(item => item.songId === songId);
      });
    },
    isAllSongsChecked() {
      return this.selectedSongIds.length === this.allSongsCredits.length;
    }
  },
  methods: {
    async fetchSongs() {
      try {
        this.isLoadingSongs = true;
        await Promise.all([
          this.$store.dispatch('collection/getSongs', { id: this.album.id }),
          this.$store.dispatch('profile/getAlbumCredits', {
            profileId: this.collaborator.id,
            albumId: this.album.id
          })
        ]);
        this.allSongsCredits = this.getAllSongsCredits();
        this.startCollectModifiedSongs();
        this.fillSongsWithRoles();
      } finally {
        this.isLoadingSongs = false;
      }
    },
    startCollectModifiedSongs() {
      const saveModifiedSong = (song) => this.modifiedSongs.add(song);
      this.allSongsCredits.forEach(item => {
        this.$watch(() => item, saveModifiedSong, { deep: true });
      });
    },
    fillSongsWithRoles() {
      const songs = this.songIds
        ? this.songIds.map(songId => this.allSongsCredits.find(item => item.songId === songId))
        : this.allSongsCredits;
      this.addRoles(songs, this.roles);
    },
    async saveChanges() {
      try {
        this.isSaving = true;
        const modifiedSongs = [...this.modifiedSongs];
        
        await this.$store.dispatch('collection/credits/update', {
          id: this.album.id,
          payload: {
            collaboratorId: this.collaborator.id,
            songsAssociations: modifiedSongs.map(item => ({
              songId: item.songId,
              associationIds: item.associations.map(role => role.id)
            }))
          }
        });
        if (this.songIds && this.songIds.length) {
          const [id] = this.songIds;
          await this.$store.dispatch('song/credits/getCredits', { id });
        }
        this.hide();
      } catch(error) {
        this.$handleError(error);
      } finally {
        this.isSaving = false;
      }
    },
    setSongRoles(song, roles) {
      song.associations = roles;
    },
    removeSongRoles(song) {
      song.associations = [];
    },
    removeRoles() {
      this.selectedSongs.forEach(this.removeSongRoles);
      this.unselectAllSongs();
    },
    addRolesForSelectedSongs(roles) {
      const selectedSongs = this.selectedSongIds.map(songId => {
        return this.allSongsCredits.find(item => item.songId === songId)
      });
      this.addRoles(selectedSongs, roles);
      this.unselectAllSongs();
    },
    addRoles(songs, roles) {
      songs.forEach(item => {
        item.associations = mergeRoles(item.associations, roles);
      });
    },
    selectAllSongs() {
      if (!this.isAllSongsChecked) {
        this.selectedSongIds = this.allSongsCredits.map(item => item.songId)
      }
    },
    unselectAllSongs() {
      this.selectedSongIds = [];
    },
    hide() {
      return this.$refs.modal.hide(); 
    },
    getAllSongsCredits() {
      return this.albumSongs.map((song, index) => {
        const songCredits = this.albumCredits.find(item => item.songId === song.id);
        if (songCredits) {
          return songCredits;
        }

        return {
          songId: song.id,
          songTitle: song.title,
          songTrackNum: (index + 1),
          associations: []
        }
      });
    }
  }
};

function mergeRoles(target, source) {
  source.forEach(item => {
    const has = target.find(targetItem => targetItem.id === item.id);

    if (!has) {
      target.push(item);
    }
  });

  return target;
}
</script>

<style lang="scss">
.role-modal {
  background-color: #21201F;
  width: 840px;
  max-width: calc(100% - 40px);
  min-height: 400px;
  &-header {
    padding: 10px 20px;
    border-top-left-radius: var(--modal-border-radius);
    border-top-right-radius: var(--modal-border-radius);
    background-color: rgba(39, 38, 37, 0.7);
    @media (max-width: 767px) {
      margin-top: -20px;
    }
  }
  &-body {
    padding-top: 0;
  }
  &__table {
    --skeleton-color: #464545;
    @media (min-width: 768px) {
      margin-left: -20px;
    }
  }
  &__user {
    cursor: default;
  }
}
</style>
