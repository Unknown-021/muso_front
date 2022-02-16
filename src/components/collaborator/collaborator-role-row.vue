<template>
  <base-table-row :index="index" @click="toggleRow">
    <template #checkbox>
      <form-checkbox
        ref="checkbox"
        class="role-modal__checkbox"
        :value="song.songId"
        :checked="selectedSongs"
        @change="$emit('update:selected-songs', $event)"
      />
    </template>

    <template #role>
      <dropdown-trigger placement="top-end" v-model="isMenuVisible" :offset="[0, -33]">
        <roles-list :roles="song.associations">
          <template #empty>No Roles</template>
        </roles-list>

        <template #dropdown="props">
          <role-search-menu
            class="collaborator-role-menu"
            :profile-id="collaborator.id"
            :selected-items="song.associations"
            :save="saveRoles"
            @close="isMenuVisible = false"
          />
        </template>
      </dropdown-trigger>
    </template>

    <template #remove-button>
      <dropdown-trigger
        v-if="hasRoles"
        placement="top-end"
        trigger="hover"
        :timeout="1000"
        :offset="[0, 9]"
      >
        <button v-if="hasRoles" class="edit-role-btn zero-btn" type="button" @click="$emit('remove')">
          <bin-icon width="14" />
        </button>

        <template #dropdown="props">
          <base-menu class="info-menu">
            <p class="menu-text">Remove roles</p>
          </base-menu>
        </template>
      </dropdown-trigger>
    </template>
  </base-table-row>
</template>

<script>
import FormCheckbox from 'components/ui/form-checkbox.vue';
import { BaseTableRow } from 'components/ui/base-table/base-table.vue';
import RoleSearchMenu from 'components/role/role-search-menu.vue';
import { closest, isParentElementInteractive } from 'helpers/dom';
import BaseMenu from 'components/ui/base-menu/base-menu';
import DropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import RolesList from 'components/role/roles-list.vue';
import BinIcon from 'assets/images/icons/bin-2.svg';

export default {
  name: 'collaborator-role-row',
  components: {
    BaseTableRow,
    FormCheckbox,
    RoleSearchMenu,
    BaseMenu,
    DropdownTrigger,
    RolesList,
    BinIcon
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    collaborator: {
      type: Object,
      required: true
    },
    song: {
      type: Object,
      required: true
    },
    selectedSongs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isMenuVisible: false
    };
  },
  computed: {
    hasRoles() {
      return this.roles.length > 0;
    },
    roles() {
      return this.song.associations;
    }
  },
  methods: {
    toggleRow(event) {
      const isIgnoreClick = closest(event.target, '[data-ignore-click]', this.$el);

      if (!isParentElementInteractive(event.target) && !isIgnoreClick) {
        this.$refs.checkbox.toggle();
      }
    },
    saveRoles(roles) {
      this.$emit('change', roles)
    }
  }
}
</script>

<style lang="scss">
.role-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-right: -2px;
  margin-bottom: -2px;
  > * {
    margin-right: 2px;
    margin-bottom: 2px;
  }
}

.edit-role-btn {
  position: relative;
  padding-top: 3px;
  padding-bottom: 3px;
  &::before {
    content: "";
    position: absolute;
    top: -6px;
    left: -5px;
    right: -5px;
    bottom: -6px;
  }
}
</style>