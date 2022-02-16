<template>
  <base-table
    class="collab-credits-table"
    :data="credits"
    :columns="tableColumns"
    :responsive="false"
    v-bind="$attrs"
    v-slot="{ item, index }"
  >
    <slot :index="index" :collaborator="item" />
  </base-table>
</template>

<script>
import { tableColumnsDef, columns, collaboratorInfo } from 'helpers/table-columns';
import BaseTable from 'components/ui/base-table/base-table.vue';

export default {
  name: 'collaborator-credits-table',
  components: {
    BaseTable,
  },
  inject: {
    isAdminPage: {
      type: Boolean,
      default: false
    }
  },
  props: {
    credits: {
      type: Array,
      required: true
    }
  },
  computed: {
    tableColumns() {
      return columns([
        tableColumnsDef.collaboratorAvatar,
        collaboratorInfo,
        {
          title: 'Roles',
          key: 'role',
          class: 'col-collab-role'
        }
      ])
      .addIf(this.isAdminPage, {
        title: '',
        key: 'edit-button',
        class: 'col-options-2'
      })
      .value();
    }
  }
}
</script>

<style lang="scss">
.col-collab-role {
  flex-grow: 1;
  width: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  text-align: right;
}
</style>