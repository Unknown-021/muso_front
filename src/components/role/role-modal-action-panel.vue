<template>
  <modal-action-panel :active="isActive">
    <label class="checkbox-label">
      <form-checkbox :checked="checked" @change="toggleSelection" />
      <span class="checkbox-label__text">
        Select All
        <transition name="fade-fast">
          <span v-if="isActive">({{ selectedSongs.length }} Tracks Selected)</span>
        </transition>
      </span>
    </label>

    <template #buttons>
      <plain-button variant="default" @click="unselectAllSongs">
        <cross-icon class="btn-icon" width="8" /> Dismiss
      </plain-button>
      <plain-button variant="danger" @click="removeRoles">
        <bin-icon class="btn-icon" width="12" /> Remove Roles
      </plain-button>
      <base-dropdown-trigger v-model="isMenuVisible" :offset="[0, 6]" placement="top-end">
        <plain-button variant="primary">
          <plus-icon class="btn-icon" width="10" /> Add Roles
        </plain-button>

        <template #dropdown="props">
          <role-search-menu :profile-id="profileId" :save="addRoles" @close="isMenuVisible = false" />
        </template>
      </base-dropdown-trigger>
    </template>
  </modal-action-panel>
</template>

<script>
import PlusIcon from 'assets/images/icons/plus-2.svg';
import CrossIcon from 'assets/images/icons/cross-2.svg';
import BinIcon from 'assets/images/icons/bin-2.svg';
import FormCheckbox from 'components/ui/form-checkbox.vue';
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import BaseDropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import RoleSearchMenu from 'components/role/role-search-menu.vue';
import ModalActionPanel from 'components/ui/modal-action-panel.vue';

export default {
  name: 'role-modal-action-panel',
  components: {
    PlusIcon,
    CrossIcon,
    BinIcon,
    FormCheckbox,
    PlainButton,
    BaseDropdownTrigger,
    RoleSearchMenu,
    ModalActionPanel
  },
  props: {
    selectedSongs: {
      type: Array,
      required: true
    },
    checked: {
      type: Boolean,
      default: false
    },
    profileId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isMenuVisible: false
    };
  },
  computed: {
    isActive() {
      return this.selectedSongs.length > 0;
    }
  },
  methods: {
    toggleSelection() {
      if (this.checked) {
        this.unselectAllSongs();
      } else {
        this.selectAllSongs();
      }
    },
    selectAllSongs() {
      this.$emit('select-all');
    },
    unselectAllSongs() {
      this.$emit('update:selected-songs', []);
    },
    removeRoles(roles) {
      this.$emit('remove-roles', roles);
    },
    addRoles(roles) {
      this.$emit('add-roles', roles);
    }
  }
}
</script>