<template>
  <collaborator-credits-base-row :index="index" :collaborator="collaborator" v-on="$listeners">
    <template #role>
      <dropdown-trigger v-if="isPrimaryArtist && isAdminPage" placement="top-end" trigger="hover">
        <roles-list v-bind="rolesProps" />
        <template #dropdown>
          <base-menu class="info-menu">
            <p class="menu-text">You can only edit the Primary artist at the album level.</p>
          </base-menu>
        </template>
      </dropdown-trigger>
      <roles-list v-else v-bind="rolesProps" />
    </template>

    <template v-if="isAdminPage" #edit-button>
      <options-button v-if="!isPrimaryArtist">
        <template #dropdown="slotProps">
          <artist-role-menu
            :role="artistRole"
            @change="delaySetArtistRole"
            @remove="removeCollaborator"
          />
        </template>
      </options-button>
      <span v-else />
    </template>
  </collaborator-credits-base-row>
</template>

<script>
import CollaboratorCreditsBaseRow, { CollaboratorCreditsController, delay } from 'components/collaborator/collaborator-credits-row-base';
import DropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import BaseMenu from 'components/ui/base-menu/base-menu';
import ArtistRoleMenu from 'components/artist/artist-role-menu.vue';
import RolesList from 'components/role/roles-list.vue';
import OptionsButton from 'components/ui/options-button.vue';

export default {
  name: 'collaborator-credits-row',
  extends: CollaboratorCreditsController,
  components: {
    DropdownTrigger,
    CollaboratorCreditsBaseRow,
    ArtistRoleMenu,
    BaseMenu,
    RolesList,
    OptionsButton
  },
  inject: {
    isAdminPage: {
      type: Boolean,
      default: false
    }
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    collaborator: {
      type: Object,
      required: true
    }
  },
  computed: {
    isPrimaryArtist() {
      return this.artistRole?.tag === 'primary-artist';
    },
    artistRole() {
      const [firstRole] = this.collaborator.roles || [];
      return this.$store.getters['artist/getRole'](firstRole?.id);
    },
    delaySetArtistRole() {
      return delay(this.setArtistRole);
    },
    rolesProps() {
      return {
        roles: this.collaborator.roles,
        'data-disabled': true,
        class: 'artist-roles'
      }
    }
  },
  methods: {
    setArtistRole(role) {
      this.setRoles([role]);
    }
  }
}
</script>

<style lang="scss">
.artist-roles {
  width: auto;
}
</style>
