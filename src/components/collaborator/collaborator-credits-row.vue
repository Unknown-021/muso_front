<template>
  <collaborator-credits-base-row :index="index" :collaborator="collaborator" v-on="$listeners">
    <template #role>
      <dropdown-trigger
        v-if="isAdminPage"
        v-model="isMenuOpen"
        placement="bottom-end"
        :offset="roleMenuOffset"
      >
        <roles-list v-bind="rolesProps" />
        <template #dropdown="slotProps">
          <role-search-menu
            class="collaborator-role-menu"
            :profile-id="collaborator.profile.id"
            :selected-items="roles"
            :ok-button="okButton"
            :save="setRoles"
            @close="isMenuOpen = false"
            @update:selected-items="defineOkButton"
          />
        </template>
      </dropdown-trigger>
      
      <roles-list v-else v-bind="rolesProps" data-disabled />
    </template>

    <template v-if="isAdminPage" #edit-button>
      <options-button>
        <template #dropdown="slotProps">
          <collaborator-menu-manual
            :collaborator="collaborator"
            @admin-change="delaySetAdmin"
            @remove="removeCollaborator"
          />
        </template>
      </options-button>
    </template>
  </collaborator-credits-base-row>
</template>

<script>
import CollaboratorCreditsBaseRow, { CollaboratorCreditsController, delay } from './collaborator-credits-row-base';
import RoleSearchMenu from 'components/role/role-search-menu.vue';
import OptionsButton from 'components/ui/options-button.vue';
import DropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import CollaboratorMenuManual from 'components/collaborator/collaborator-menu-manual.vue';
import RolesList from 'components/role/roles-list.vue';

export default {
  name: 'collaborator-credits-row',
  extends: CollaboratorCreditsController,
  components: {
    CollaboratorCreditsBaseRow,
    RoleSearchMenu,
    DropdownTrigger,
    CollaboratorMenuManual,
    RolesList,
    OptionsButton
  },
  inject: {
    isAdminPage: {
      type: Boolean,
      default: false
    }
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    collaborator: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isMenuOpen: false,
      okButton: undefined
    };
  },
  created() {
    this.defineOkButton();
  },
  computed: {
    delaySetAdmin() {
      return delay(this.setAdmin);
    },
    rolesProps() {
      return {
        roles: this.roles
      };
    },
    roles() {
      return this.collaborator.roles || [];
    }
  },
  methods: {
    setAdmin(isAdmin) {
      this.$emit('admin-change', isAdmin);
    },
    roleMenuOffset(options) {
      return [0, -options.reference.height];
    },
    defineOkButton(roles = this.roles) {
      this.okButton = roles.length ? 'Save' : 'Save as unassigned'
    }
  }
}
</script>
