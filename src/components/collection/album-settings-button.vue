<template>
  <options-button thick light>
    <template #dropdown>
      <base-menu>
        <template v-for="item in filteredItems">
          <album-menu-item :key="item.action" :action="item.action" :album="album" />
        </template>
      </base-menu>
    </template>
  </options-button>
</template>

<script>
import AlbumMenuItem from 'components/collection/album-menu-item.vue';
import BaseMenu from 'components/ui/base-menu/base-menu.vue';
import OptionsButton from 'components/ui/options-button.vue';

export default {
  name: 'album-settings-button',
  components: {
    BaseMenu,
    AlbumMenuItem,
    OptionsButton
  },
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  computed: {
    items() {
      return [
        {
          action: 'share-label-copy',
          accessLevel: ['isAdmin', 'isCollaborator']
        },
        {
          action: 'export-credits',
          accessLevel: ['isCollaborator']
        },
        {
          action: 'finalize-album',
          accessLevel: ['isAdmin']
        },
        {
          action: 'remove-album',
          accessLevel: ['isAdmin']
        }
      ];
    },
    filteredItems() {
      return this.items.filter(item => {
        return item.accessLevel.some(role => this.album[role]);
      });
    }
  }
}
</script>
