<template>
  <base-dropdown-trigger
    v-if="source.isAdmin && !isPublished"
    v-model="isMenuOpen"
    :offset="menuOffset"
  >
    <editable-content v-if="source.genres">{{ source.genres }}</editable-content>
    <template v-else>
      <slot name="zero">
        <editable-content :placeholder="noGenreText" disabled />
      </slot>
    </template>

    <template #dropdown>
      <genre-search-menu
        :value="source.genres"
        :save="save"
        @close="isMenuOpen = false"
      />
    </template>
  </base-dropdown-trigger>

  <span v-else>{{ source.genres || noGenreText }}</span>
</template>

<script>
import BaseDropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import GenreSearchMenu from 'components/genre/genre-search-menu.vue';
import EditableContent from 'components/ui/editable-content';

export default {
  name: 'genre-field',
  components: {
    BaseDropdownTrigger,
    GenreSearchMenu,
    EditableContent
  },
  props: {
    source: {
      type: Object,
      required: true
    },
    save: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isMenuOpen: false
    };
  },
  computed: {
    isPublished() {
      return Boolean(this.source.releaseDate);
    },
    menuOffset() {
      return [-15, -31];
    },
    noGenreText() {
      return 'No Genre';
    }
  }
}
</script>
