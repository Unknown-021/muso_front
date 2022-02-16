<template>
  <base-menu @click="handleMenuClick">
    <edit-role-option :album="album" :profile="profile" :song-ids="songIds" />
    <remove-admin-option v-if="isAdmin" :album="album" :profile="profile" />
    <make-admin-option v-else :album="album" :profile="profile" />
    <remove-collaborator-option :album="album" :profile="profile" />
  </base-menu>
</template>

<script>
import BaseMenu, { isMenuItemClosable } from 'components/ui/base-menu/base-menu';
import MakeAdminOption from 'components/collaborator/menu-items/make-admin';
import RemoveAdminOption from 'components/collaborator/menu-items/remove-admin';
import EditRoleOption from 'components/collaborator/menu-items/edit-role';
import RemoveCollaboratorOption from 'components/collaborator/menu-items/remove-collaborator';

export default {
  name: 'collaborator-menu',
  components: {
    BaseMenu,
    MakeAdminOption,
    RemoveAdminOption,
    EditRoleOption,
    RemoveCollaboratorOption
  },
  props: {
    album: {
      type: Object,
      required: true
    },
    profile: {
      type: Object,
      required: true
    },
    songIds: {
      type: Array,
      default: undefined
    }
  },
  computed: {
    isAdmin() {
      return this.album.admins.some(admin => admin.profile.id === this.profile.id);
    }
  },
  methods: {
    handleMenuClick(event) {
      if (isMenuItemClosable(event.target)) {
        this.$emit('close');
      }
    }
  }
}
</script>