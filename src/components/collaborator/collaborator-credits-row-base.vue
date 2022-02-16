<template>
  <base-table-row class="collaborator-row" :index="index" :data-pending="isPending">
    <template #role>
      <slot name="role" />
    </template>

    <template #edit-button>
      <slot name="edit-button" />
    </template>
  </base-table-row>
</template>

<script>
import { BaseTableRow } from 'components/ui/base-table/base-table.vue';
import { debounce } from 'helpers/utils';

export default {
  name: 'collaborator-credits-row-base',
  components: {
    BaseTableRow
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
  computed: {
    isPending() {
      return !this.collaborator.isVerified;
    }
  }
}

export const delay = (handler) => debounce(handler, 1);

export const CollaboratorCreditsController = {
  name: 'collaborator-credits-controller',
  props: {
    collaborator: {
      type: Object,
      required: true
    }
  },
  computed: {
    delaySetRoles() {
      return delay(this.setRoles);
    }
  },
  methods: {
    removeCollaborator() {
      this.$emit('remove');
    },
    setRoles(roles) {
      this.$emit('roles-change', roles);
    }
  }
};
</script>

<style lang="scss">
.collaborator-row {
  &[data-pending] {
    .col-avatar {
      opacity: 0.3;
    }
    .collab-link-wrap > :not(.user-meta-info) {
      opacity: 0.3;      
    }
    .tags-box:not(:hover) {
      --tags-box-color: rgb(89, 88, 87);
    }
  }
}
.collaborator-role-menu {
  width: 100%;
  max-width: 550px;
}
</style>