<template>
  <base-menu-item icon="pen" @click="editRole" v-on="$listeners">
    Edit Role
  </base-menu-item>
</template>

<script>
import { BaseMenuItem } from 'components/ui/base-menu/base-menu';
import { isUnassigned, getCollaboratorRoles } from 'store/modules/credits.utils';

export default {
  name: 'edit-role',
  components: {
    BaseMenuItem
  },
  props: {
    profile: {
      type: Object,
      required: true
    },
    album: {
      type: Object,
      required: true
    },
    songIds: {
      type: Array,
      default: undefined
    }
  },
  computed: {
    isSongPage() {
      return this.$route.name === 'song';
    },
    roles() {
      return getCollaboratorRoles(this.credits, this.profile.id);
    },
    unassigned() {
      return this.roles.every(isUnassigned);
    },
    modalProps() {
      return {
        collaborator: this.profile,
        album: this.album,
        songIds: this.songIds
      };
    },
    roleModalProps() {
      return {
        ...this.modalProps,
        roles: this.roles
      };
    },
    credits() {
      return this.isSongPage
        ? this.$store.getters['song/credits/credits']
        : this.$store.getters['collection/credits/credits'];
    }
  },
  methods: {
    editRole() {
      this.$modal.open(this.getModalParams());
    },
    getModalParams() {
      if (this.isSongPage || this.unassigned || this.album.trackCount <= 1) {
        return { name: 'role-search', props: this.roleModalProps };
      } else {
        return { name: 'collaborator-role', props: this.modalProps };
      }
    }
  }
}
</script>