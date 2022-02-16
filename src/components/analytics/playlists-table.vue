<template>
  <div class="activity-table-tracks">
    <selectable
      :data="data"
      :selected.sync="playlistTrackId"
      controlStyle="radio"
      v-slot="{ select }"
      @item-selected="selectedItem"
    >
      <base-table
        :data="data"
        :columns="columns"
        :responsive="false"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <template #default="{ item }">
          <base-table-row
            class="active-row-hover"
            :data-last-selected="isLastSelectedItem(item)"
            :item="item"
            :key="item.id"
            @click="select(item);"
          >
            <template #checkbox>
              <selectable-checkbox :type="'select'" control-style="radio" :item="item" />
            </template>
          </base-table-row>
        </template>
      </base-table>
    </selectable>
  </div>
</template>

<script>
import { albumCols } from 'helpers/table-columns/table-columns';
import Selectable from 'components/utils/selectable.vue';
import SelectableCheckbox from 'components/ui/selectable-checkbox.vue';
import BaseTable, { BaseTableRow, BaseTableSubhead } from 'components/ui/base-table/base-table.vue';
import { TableCell } from "../ui/table-cell/table-cell";

const tracksColumns = [
  albumCols.cover,
  albumCols.discographySongName
];

const checkboxCol = {
  title: '',
  anatomy: 'master-index',
  key: 'checkbox'
};

const playlistsColumn =  {
    title: 'Playlists',
    key: 'playlists',
    anatomy: 'auto',
    processable: true,
    class: 'ellipsis col-right col-number',
    component: TableCell.LocalNumber,
    componentProps: item => ({
      value: item.currentValue
  })
};

const chartsColumn =  {
  title: 'Charts',
  key: 'charts',
  anatomy: 'auto',
  processable: true,
  class: 'ellipsis col-right col-number',
  component: TableCell.LocalNumber,
  componentProps: item => ({
    value: item.currentValue
  })
};

export default {
  name: 'playlists-table',
  components : {
    BaseTable,
    BaseTableRow,
    BaseTableSubhead,
    SelectableCheckbox,
    Selectable
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    activityType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      toggleHover: false,
      itemId: null
    }
  },
  watch: {
    selectedTrackId() {
      this.$store.commit('analytics/activityOverview/clearPlaylistData');
    }
  },
  computed: {
    columns() {
      return [
        checkboxCol,
        ...tracksColumns,
        this.column
      ]
    },
    playlistTrackId: {
      get() {
        return this.$store.getters[`analytics/activityOverview/${this.activityNormalized}TrackId`];
      },
      set(value) {
        this.$store.commit(`analytics/activityOverview/set${this.activityNormalized}TrackId`, value);
      }
    },
    column() {
      return this.activityType === 'Playlist' ? playlistsColumn : chartsColumn;
    },
    activityNormalized() {
      return this.activityType === 'Playlist' ? 'playlist' : 'chart';
    }
  },
  methods: {
    selectedItem(item) {
      this.$store.commit(`analytics/activityOverview/set${this.activityNormalized}TrackDetails`, item);
    },
    isLastSelectedItem(item) {
      return item.id === this.playlistTrackId[0];
    }
  }
}
</script>

<style lang="scss">

.roles-table-tracks {
  width: 590px;
  max-width: 540px;
}
.activity-table-tracks {
  overflow-y: scroll;
  height: 800px;
  &::-webkit-scrollbar {
    display: none;
  }
}
.active-row-hover[data-last-selected] {
  --hover-color: var(--tr-hover-background-color, var(--tr-main-color));
  background-color: var(--hover-color);
  z-index: 10;
}

.active-row-hover[data-last-selected]::after,
.active-row-hover[data-last-selected]::before
{
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 16px;
  background-color: var(--hover-color);
  opacity: 1;
}
.activity-table-tracks .col-master.td {
  font-size: 16px;
}
</style>
