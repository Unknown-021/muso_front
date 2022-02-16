<template>
  <base-modal
    modal-class="search-modal"
    ref="modal"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <role-search-menu
      :profile-id="collaborator.id"
      :selected-items.sync="selectedItems"
      :show-buttons="false"
    />
    <div class="modal-buttons">
      <action-button @click="hide">Cancel</action-button>
      <action-button variant="primary" :loading="isLoading" @click="next">
        {{ canSave ? 'Done' : 'Next' }}
      </action-button>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from 'components/ui/base-modal/base-modal.vue';
import RoleSearchMenu from './role-search-menu.vue';
import ActionButton from 'components/ui/action-button.vue';
import { filterNullRoles } from 'store/modules/credits.utils';

export default {
  name: 'role-search-modal',
  components: {
    BaseModal,
    RoleSearchMenu,
    ActionButton
  },
  props: {
    album: {
      type: Object,
      required: true
    },
    collaborator: {
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
      isLoading: false,
      selectedItems: filterNullRoles(this.roles)
    };
  },
  computed: {
    canSave() {
      return this.album.trackCount <= 1 || this.isSongPage;
    },
    isSongPage() {
      return this.$route.name === 'song';
    },
    roleIds() {
      return this.selectedItems.map(role => role.id);
    }
  },
  methods: {
    next() {
      if (this.canSave) {
        this.updateCredits();
      } else {
        this.openSongRolesModal();
      }
    },
    async updateCredits() {
      try {
        this.isLoading = true;
        if (this.isSongPage) {
          await this.updateSongCredits();
        } else {
          await this.updateAlbumCredits();
        }
        this.hide();
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.isLoading = false;
      }
    },
    async updateSongCredits() {
      const [id] = this.songIds;
      await this.$store.dispatch('song/credits/updateCollaborators', {
        id,
        collaborations: [{
          collaboratorId: this.collaborator.id,
          associationIds: this.roleIds
        }]
      });
      await this.$store.dispatch('song/getFullInfo');
    },
    async updateAlbumCredits() {
      const action = (this.roles.length)
        ? 'collection/credits/updateCollaborators'
        : 'collection/credits/addCollaborators';
      const payload = {
        albumId: this.album.id,
        collaboratorIds: [this.collaborator.id],
        associationIds: this.roleIds,
        songIds: this.songIds
      };
      await this.$store.dispatch(action, payload);
    },
    async openSongRolesModal() {
      await this.hide();
      this.$modal.open({
        name: 'collaborator-role',
        props: {
          album: this.album,
          collaborator: this.collaborator,
          roles: this.selectedItems,
          songIds: this.songIds
        }
      });
    },
    hide() {
      return this.getModal().hide(); 
    },
    getModal() {
      return this.$refs.modal;
    }
  }
}
</script>

<style lang="scss">
.search-modal {
  --menu-box-shadow: none;
  --search-menu-width: 100%;
  max-width: 530px;
  background-color: var(--search-menu-background-color);
}
</style>
