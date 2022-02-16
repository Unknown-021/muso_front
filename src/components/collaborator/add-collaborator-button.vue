<template>
  <base-dropdown-trigger v-model="isMenuVisible" :offset="[0, 6]" placement="bottom-end">
    <plain-button>
      <plus-icon class="btn-icon" width="12" /> Collaborator
    </plain-button>

    <template #dropdown>
      <profile-search-menu @item-select="handleItemSelect" />
    </template>
  </base-dropdown-trigger>
</template>

<script>
import PlusIcon from 'assets/images/icons/plus-2.svg';
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import BaseDropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import ProfileSearchMenu from 'components/profile/profile-search-menu.vue';

export default {
  name: 'add-collaborator-button',
  components: {
    PlusIcon,
    PlainButton,
    BaseDropdownTrigger,
    ProfileSearchMenu
  },
  props: {
    album: {
      type: Object,
      required: true
    },
    songIds: {
      type: Array,
      default: undefined
    }
  },
  data() {
    return {
      isMenuVisible: false
    };
  },
  methods: {
    handleItemSelect(item) {
      this.isMenuVisible = false;
      this.$modal.open({
        name: 'role-search',
        props: {
          collaborator: {
            ...item,
            type: 'PROFESSIONAL'
          },
          roles: [],
          album: this.album,
          songIds: this.songIds
        }
      });
    }
  }
}
</script>