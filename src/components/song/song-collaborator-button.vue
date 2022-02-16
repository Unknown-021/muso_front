<template>
  <dropdown-trigger v-model="isMenuOpen" v-bind="triggerProps">
    <plain-button variant="primary">
      <plus-icon class="btn-icon" width="11" /> Collaborator
    </plain-button>
    <template #dropdown="slots">
      <profile-search-menu
        display-artists
        :selected-items="selectedItems"
        @item-select="selectItem"
      />
    </template>
  </dropdown-trigger>
</template>

<script>
import ProfileSearchMenu from 'components/profile/profile-search-menu.vue';
import DropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import PlusIcon from 'assets/images/icons/plus-2.svg';

export default {
  name: 'song-collaborator-button',
  components: {
    DropdownTrigger,
    ProfileSearchMenu,
    PlainButton,
    PlusIcon
  },
  props: {
    collaborators: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isMenuOpen: false
    };
  },
  computed: {
    triggerProps() {
      return {
        placement: 'bottom-end',
        offset: this.menuOffset
      };
    },
    menuOffset() {
      return [0, 5];
    },
    selectedItems() {
      return this.collaborators.filter(item => item.roles).map(item => item.profile);
    }
  },
  methods: {
    selectItem(collaborator) {
      this.isMenuOpen = false;
      this.$emit('item-select', collaborator);
    }
  }
}
</script>