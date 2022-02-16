<template>
  <base-menu @click="close">
    <slot />
    <template v-for="item in artistRoles">
      <base-menu-item :key="item.id" :icon="menuItemIcon" @click="selectRole(item)">
        {{ item.association }}
      </base-menu-item>
    </template>
    <remove-option v-if="role" @click="remove">Remove Artist</remove-option>
  </base-menu>
</template>

<script>
import BaseMenu from 'components/ui/base-menu/base-menu.vue';
import BaseMenuItem from 'components/ui/base-menu/base-menu-item.vue';
import RemoveOption from 'components/collaborator/menu-items/remove-collaborator-option.vue';

export default {
  name: 'artist-role-menu',
  components: {
    BaseMenu,
    BaseMenuItem,
    RemoveOption
  },
  props: {
    role: {
      type: Object,
      default: undefined
    }
  },
  computed: {
    menuItemIcon() {
      return this.role ? 'arrow-exchange' : undefined;
    },
    artistRoles() {
      const roles = this.$store.getters['artist/mainArtistTypes'];
      return roles.filter(role => !this.isPrimaryArtistRole(role) && !this.isCurrentRole(role));
    }
  },
  methods: {
    remove() {
      this.$emit('remove');
    },
    selectRole(role) {
      this.$emit('change', role);
    },
    isPrimaryArtistRole(role) {
      return role.tag === 'primary-artist';
    },
    isCurrentRole(role) {
      return role.id === this.role?.id;
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>