<template>
  <base-menu v-on="$listeners">
    <remove-admin-option v-if="collaborator.isAdmin" @click="setAdmin(false)" />
    <make-admin-option v-else @click="setAdmin(true)" />
    <remove-collaborator-option @click="$emit('remove')" />
  </base-menu>
</template>

<script>
import BaseMenu from 'components/ui/base-menu/base-menu';
import MakeAdminOption from 'components/collaborator/menu-items/make-admin-option';
import RemoveAdminOption from 'components/collaborator/menu-items/remove-admin-option';
import RemoveCollaboratorOption from 'components/collaborator/menu-items/remove-collaborator-option';

export default {
  name: 'collaborator-menu-manual',
  components: {
    BaseMenu,
    MakeAdminOption,
    RemoveAdminOption,
    RemoveCollaboratorOption
  },
  props: {
    collaborator: {
      type: Object,
      required: true
    }
  },
  methods: {
    setAdmin(isAdmin) {
      this.$emit('admin-change', isAdmin);
    }
  }
}
</script>