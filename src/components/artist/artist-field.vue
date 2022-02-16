<template>
  <base-dropdown-trigger
    v-if="album.isAdmin"
    v-model="isModalOpen"
    :offset="menuOffset"
  >
    <editable-content v-if="artists.length">
      <artists-enumeration :artists="artists" :navigable="false" />
    </editable-content>
    <slot v-else name="zero">
      <editable-content>
        <span class="artist-field-zero">No Artist</span>
      </editable-content>
    </slot>

    <template #dropdown>
      <artist-menu :artists="artistsMenu" @close="close">
        <template #item="{ item }">
          <component :is="menuItemComponent" :key="item.id" :artist="item" @close="close" />
        </template>
      </artist-menu>
    </template>
  </base-dropdown-trigger>
  
  <artists-enumeration v-else-if="artists.length" :artists="artists" />
  <span v-else>-</span>
</template>

<script>
import BaseDropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import EditableContent from 'components/ui/editable-content';
import ArtistsEnumeration from 'components/artist/artists-enumeration.vue';
import ArtistMenu from 'components/artist/artist-menu.vue';
import ArtistMenuItem from './artist-menu-item.vue';
import PrimaryArtistMenuItem from './primary-artist-menu-item.vue';

const types = ['artist', 'primary-artist'];

export default {
  name: 'artist-field',
  components: {
    BaseDropdownTrigger,
    ArtistsEnumeration,
    EditableContent,
    ArtistMenu
  },
  props: {
    artists: {
      type: Array,
      required: true
    },
    artistsMenu: {
      type: Array,
      default: undefined
    },
    type: {
      type: String,
      required: true,
      validator: value => types.includes(value)
    },
    songIds: {
      type: Array,
      default: () => []
    }
  },
  provide() {
    return {
      artistField: this
    };
  },
  data() {
    return {
      isModalOpen: false
    };
  },
  computed: {
    menuItemComponent() {
      return this.type === 'primary-artist'
        ? PrimaryArtistMenuItem
        : ArtistMenuItem;
    },
    album() {
      return this.$store.getters['collection/collectionDetails'];
    },
    menuOffset() {
      return [-15, -22];
    }
  },
  methods: {
    close() {
      this.isModalOpen = false
    }
  }
}
</script>

<style lang="scss">
.artist-field-zero {
  color: #595857;
}
</style>