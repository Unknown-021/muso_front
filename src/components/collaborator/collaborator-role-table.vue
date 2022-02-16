<template>
  <base-table
    class="song-roles-table"
    :data="songs"
    :columns="tableColumns"
    :responsive="false"
    v-bind="$attrs"
    v-slot="{ item, index }"
  >
    <slot :index="index" :song="item" />
  </base-table>
</template>

<script>
import { tableColumnsDef, TableCell } from 'helpers/table-columns';
import BaseTable from 'components/ui/base-table/base-table.vue';

export default {
  name: 'collaborator-role-table',
  components: {
    BaseTable,
  },
  props: {
    songs: {
      type: Array,
      required: true
    }
  },
  computed: {
    tableColumns() {
      return [
        {
          title: '',
          key: 'checkbox',
          class: 'col-song-role-checkbox'
        },
        {
          title: '#',
          key: 'number',
          field: 'songTrackNum',
          class: 'col-song-num'
        },
        {
          ...tableColumnsDef.songTitle,
          component: TableCell.PlainCell,
          componentProps: (item) => ({
            value: item.songTitle
          })
        },
        {
          title: 'Role',
          key: 'role',
          class: 'col-song-role'
        },
        {
          title: '',
          key: 'remove-button',
          class: 'col-song-remove'
        }
      ];
    }
  }
}
</script>

<style lang="scss">
.song-roles-table,
.collab-credits-table {
  --tr-border-color: #2f2e2d;
  --tr-hover-background-color: transparent;
  --tr-min-height: 50px;
  overflow: hidden;
  thead {
    display: none;
  }
  tr {
    cursor: default;
  }
}
.song-roles-table {
  --tr-border-left-indent: 50px;
}
.collab-credits-table {
  --tr-border-left-indent: 54px;
  --skeleton-color: #383838;
}

.col-song-role-checkbox[class] {
  padding-right: 0;
  > .skeleton {
    width: 15px;
  }
}
.col-song-role {
  flex-grow: 1;
  width: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  --tags-box-max-width: 345px;
}
.col-song-remove {
  display: flex;
  margin-left: -2px;
  padding-left: 0;
  width: 14px;
  opacity: 0;
  @at-root {
    .tr:hover & {
      transition: opacity 100ms ease-in-out;
      opacity: 1;
    }
  }
}
</style>