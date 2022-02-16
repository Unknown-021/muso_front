<template>
  <base-modal
    ref="modal"
    modal-class="song-modal"
    :mobile-sliding="true"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <song-modal-header :loading="isLoading" @song-change="updateSong" />

    <div class="modal-body">
      <div class="song-modal__top-panel">
        <transition name="fade-fast" mode="out-in">
          <song-details-list-skeleton v-if="isLoading" />
          <song-details-list v-else :song="fullSong" @change="updateSong" @validity-change="isFormValid = $event" />
        </transition>
        <div class=song-modal__top-panel-buttons v-if="album.isAdmin">
          <song-import-button :song="fullSong" @collaborators-import="importCollaborators" />
          <song-collaborator-button :collaborators="songCredits" @item-select="addProfile" />
        </div>
      </div>
      <base-search v-model="creditsQuery" class="song-modal__search" />
      
      <transition name="fade-fast" mode="out-in">
        <song-credits-skeleton :song="song" v-if="isLoading" />
        <song-credits
          v-else
          :credits="filteredCredits"
          @roles-change="setRoles"
          @admin-change="setAdmin"
          @remove="removeCollaborator"
        >
          <template v-if="creditsQuery" #empty>
            <div class="zero-static">
              <sad-smile-icon class="zero-static__img zero-static__img--dark" />
              <p class="zero-static__text">Oops, no results found. Try something else.</p>
            </div>
          </template>
        </song-credits>
      </transition>
    </div>
    <div v-if="album.isAdmin" class="modal-buttons">
      <action-button @click="hide">Cancel</action-button>
      <action-button
        variant="primary"
        :disabled="!canSaveChanges"
        :loading="isSaving"
        @click="saveChanges">Save</action-button>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from 'components/ui/base-modal/base-modal.vue';
import BaseSearch from 'components/ui/base-search/base-search.vue';
import SongModalHeader from './song-modal-header.vue';
import SongDetailsList from './song-details-list.vue';
import SongDetailsListSkeleton from './song-details-list-skeleton.vue';
import SongCollaboratorButton from './song-collaborator-button.vue';
import SongImportButton from './song-import-button.vue';
import SongCredits from './song-credits.vue';
import SongCreditsSkeleton from './song-credits-skeleton.vue';
import SadSmileIcon from 'assets/images/zero-state/sad-smile.svg';
import { mutationsProxy } from 'helpers/utils';
import { getUniqueItems } from 'helpers/array';
import { objectSize } from 'helpers/object';
import { collaboratorSorter } from 'store/modules/credits.utils';
import ActionButton from 'components/ui/action-button.vue';

// TODO: Split this large component for different services
export default {
  name: 'song-modal',
  components: {
    BaseModal,
    SongModalHeader,
    BaseSearch,
    SongDetailsList,
    SongDetailsListSkeleton,
    SongCollaboratorButton,
    SongImportButton,
    SongCredits,
    SongCreditsSkeleton,
    SadSmileIcon,
    ActionButton
  },
  provide() {
    return {
      songModal: this,
      isAdminPage: this.album.isAdmin
    };
  },
  props: {
    album: {
      type: Object,
      required: true
    },
    song: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      fullSong: null, // public
      songChanges: {},
      creditsQuery: '',
      isLoading: false,
      isSaving: false,
      isFormValid: true,
      modifiedAdmins: new Set(),
      isAdminsChanged: false,
      modifiedCollaborators: {},
      songCredits: []
    };
  },
  created() {
    this.fetchSong(this.song.id);
  },
  computed: {
    canSaveChanges() {
      const changes = [this.isSongInfoChanged, this.isAdminsChanged, this.isCollaboratorsChanged];
      return changes.some(value => value) && this.isFormValid;
    },
    isSongInfoChanged() {
      return objectSize(this.songChanges) > 0;
    },
    isCollaboratorsChanged() {
      return objectSize(this.modifiedCollaborators) > 0;
    },
    filteredCredits() {
      if (!this.creditsQuery) {
        return this.songCredits;
      }

      const query = this.creditsQuery.toLowerCase();
      return this.songCredits.filter(item => {
        return item.profile.fullName.toLowerCase().includes(query);
      });
    },
    featuredArtistRole() {
      return this.$store.getters['artist/mainArtistTypes']
        .find(role => role.association === 'Featured Artist');
    }
  },
  methods: {
    async fetchSong(id) {
      this.isLoading = true;
      try {
        await Promise.all([
          this.fetchSongDetails(id),
          this.fetchCollaborators(id)
        ]);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchSongDetails(id) {
      await this.$store.dispatch('song/getSongDetails', { id });
      const song = this.$store.getters['song/songDetails'];
      this.fullSong = mutationsProxy(song, () => this.songChanges);
    },
    async fetchCollaborators(id) {
      const collaborators = await this.$store.dispatch('song/credits/getCollaborators', { id });
      this.songCredits = collaborators.map(this.addAdminInfo).sort(collaboratorSorter);
    },
    async saveChanges() {
      try {
        this.isSaving = true;
        const promises = [];
        if (this.isSongInfoChanged) {
          promises.push(this.saveInfo());
        }
        if (this.isAdminsChanged) {
          promises.push(this.updateAdmins());
        }
        if (this.isCollaboratorsChanged) {
          promises.push(this.updateCollaborators());
        }
        await Promise.all(promises);
        await this.$store.dispatch('collection/getFullInfo', { id: this.album.id });
        this.hide();
      } finally {
        this.isSaving = false;
      }
    },
    async saveInfo() {
      try {
        const { genres, ...data } = this.songChanges;
        await this.$store.dispatch('song/updateInfo', {
          songId: this.song.id,
          ...data,
          genres: getGenresList(genres)
        });
        this.songChanges = {};
      } catch(error) {
        this.$notify(error.message || 'Could not save song info.', 'error');
        throw error;
      }
    },
    async updateAdmins() {
      try {
        const promises = [...this.modifiedAdmins].map(item => {
          if (item.isAdmin) {
            return this.$store.dispatch('collection/addAdmin', {
              id: this.album.id,
              profile: item.profile
            });
          } else {
            return this.$store.dispatch('collection/removeAdmin', {
              id: this.album.id,
              profileId: item.id
            });
          }
        });
        await Promise.all(promises);
        this.modifiedAdmins = new Set();
        this.isAdminsChanged = false;
      } catch (error) {
        this.$notify(error.message || 'Could not apply admins changes.', 'error');
        throw error;
      }
    },
    async updateCollaborators() {
      try {
        await this.$store.dispatch('song/credits/updateCollaborators', {
          id: this.song.id,
          collaborations: Object.values(this.modifiedCollaborators).map(item => ({
            collaboratorId: item.id,
            associationIds: item.roles && item.roles.map(role => role.id)
          }))
        });
        this.modifiedCollaborators = {};
      } catch (error) {
        this.$notify(error.message || 'Could not apply admins changes.', 'error');
        throw error;
      }
    },
    addAdminInfo(collaborator) {
      return {
        ...collaborator,
        isAdmin: this.isAdmin(collaborator.profile)
      };
    },
    isAdmin(profile) {
      return this.album.admins.some(admin => admin.profile.id === profile.id);
    },
    setAdmin(collaborator, isAdmin) {
      collaborator.isAdmin = isAdmin;
      if (this.modifiedAdmins.has(collaborator)) {
        this.modifiedAdmins.delete(collaborator);
      } else {
        this.modifiedAdmins.add(collaborator);
      }
      this.isAdminsChanged = (this.modifiedAdmins.size > 0);
    },
    setRoles(collaborator, roles) {
      collaborator.roles = roles;
      this.collectModification(collaborator);
    },
    removeCollaborator(collaborator) {
      collaborator.roles = null;
      this.collectModification(collaborator);
    },
    collectModification(collaborator) {
      this.$set(this.modifiedCollaborators, collaborator.id, collaborator);
    },
    addProfile(profile) {
      const roles = [];
      if (profile.type === 'ARTIST') {
        roles.push(this.featuredArtistRole);
      }
      const collaborator = {
        id: profile.id,
        profile,
        isVerified: true,
        isAdmin: this.isAdmin(profile),
        roles
      };
      this.addCollaborator(collaborator);
    },
    addCollaborator(collaborator) {
      const indexOf = this.songCredits.findIndex(item => item.id === collaborator.id);
      if (indexOf >= 0) {
        this.$set(this.songCredits, indexOf, collaborator);
      } else {
        this.songCredits.unshift(collaborator);
      }
      this.collectModification(collaborator);
    },
    addCollaboratorsList(collaborators) {
      collaborators.forEach(item => this.addCollaborator(item));
      this.songCredits.sort(collaboratorSorter);
    },
    importCollaborators({ collaborators, song }) {
      if (this.isCollaboratorsChanged) {
        return this.$notify('Save your current changes before import collaborators.', 'error');
      }
      const items = collaborators.map(this.addAdminInfo);
      const uniqueItems = getUniqueItems(this.songCredits, items);
      const isItemsIntersect = (uniqueItems.length !== items.length);
      const importPromise = isItemsIntersect
        ? this.confirmCollaboratorsImport(song, items, uniqueItems)
        : Promise.resolve(items);

      importPromise.then(this.addCollaboratorsList);
    },
    confirmCollaboratorsImport(song, collaborators, uniqueCollaborators) {
      return new Promise((resolve, reject) => {
        const options = {
          name: 'collaborators-import-confirm',
          props: { song, collaborators, uniqueCollaborators }
        };
        this.$modal.open(options).then(modal => {
          modal.$on('import', resolve);
          modal.$on('cancel', reject);
        });
      });
    },
    updateSong(data) {
      Object.assign(this.fullSong, data);
    },
    // public
    hide() {
      return this.$refs.modal.hide(); 
    }
  }
};

function getGenresList(genres) {
  if (genres === undefined) return;

  return genres === '' ? [] : genres.split(', ');
}
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract.scss";

.song-modal {
  --modal-padding-y: 24px;
  width: 1035px;
  max-width: 100%;
  height: 100%;
  max-height: 900px;
  background-color: rgb(32, 31, 30);
  @media #{$tablet} {
    max-width: calc(100% - 40px);
  }
  &__title {
    font: inherit;
  }
  &__top-panel {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    min-height: 26px;
  }
  &__top-panel-buttons {
    display: flex;
    margin-top: -1px;
    padding-left: 25px;
    @media (max-width: 599px) {
      flex-direction: column;
      align-items: flex-end;
      margin-bottom: -10px;
    }
    @media (min-width: 600px) {
      margin-right: -19px;
    }
    button {
      white-space: nowrap;
      @media (max-width: 599px) {
        margin-bottom: 10px;
      }
      @media (min-width: 600px) {
        margin-right: 19px;
      }
    }
  }
  &__add-btn {
    align-self: center;
    margin-left: 20px;
    > * {
      padding-top: 4px;
      padding-bottom: 4px;
      font-size: 12px;
      white-space: nowrap;
    }
  }
  &__search {
    margin-top: 17px;
    margin-bottom: 11px;
    @media #{$tablet} {
      max-width: 300px;
    }
  }
}
</style>
