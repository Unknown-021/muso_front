<template>
  <selectable
    :data="data"
    :selected.sync="selectedIds"
    v-slot="{ sortedData, toggle, toggleAll }"
  >
    <base-table
      class="trends-table"
      :data="sortedData"
      :data-group="group"
      :columns="columns"
      :responsive="false"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template #subhead>
        <base-table-subhead :hoverable="true" :data-last-selected="!selectedIds.length" @click="toggleAll">
          <template #checkbox>
            <selectable-checkbox />
          </template>
          <template v-slot:[titleSlot]>
            <button class="zero-btn" @click="toggleAll">All {{ groupText }}</button>
          </template>
          <template #prevPeriod>{{ $number(total.prevPeriod) }}</template>
          <template #currPeriod>{{ $number(total.currPeriod) }}</template>
          <template #percentage>
            <base-percentage :value="total.totalChange" />
          </template>
        </base-table-subhead>
      </template>

      <template #default="{ item }">
        <base-table-row
          :item="item"
          :key="item.id"
          :data-last-selected="isLastSelectedItem(item)"
          @click="toggle(item)"
        >
          <template #checkbox>
            <selectable-checkbox :item="item" />
          </template>
        </base-table-row>
      </template>
    </base-table>
  </selectable>
</template>

<script>
import BaseTable, { BaseTableRow, BaseTableSubhead } from 'components/ui/base-table/base-table.vue';
import BasePercentage from 'components/ui/base-percentage/base-percentage.vue';
import { cols, albumCols, profileCols, creditCols, statsCols } from 'helpers/table-columns/table-columns';
import Selectable from 'components/utils/selectable.vue';
import SelectableCheckbox from 'components/ui/selectable-checkbox.vue';
import { lastElement } from 'helpers/array';
import { capitalizeWord } from 'helpers/text';
import { TableCell } from 'components/ui/table-cell/table-cell';


const tracksCoumns = [
  albumCols.cover,
  albumCols.discographySongName,
];

const tracksColumnsDemo = [
  albumCols.cover,
  albumCols.songTitleInfo,
];

const albumsColumns = [
  albumCols.cover,
  albumCols.title
];

const collaboratorsColumns = [
  profileCols.avatar,
  profileCols.name,
  creditCols.collabCount
];

const creditsColumns = [
  creditCols.title,
  creditCols.songCount
];

export const checkboxCol = {
  title: '',
  anatomy: 'master-index',
  key: 'checkbox'
};

export const commonColumns = [
  statsCols.prevPeriodSortable,
  statsCols.currPeriodSortable
];

const groupColumnsMap = {
  tracks: tracksCoumns,
  albums: albumsColumns,
  collaborators: collaboratorsColumns,
  credits: creditsColumns
};

const groupColumnsMapDemo = {
  tracks: tracksColumnsDemo,
  albums: albumsColumns,
  collaborators: collaboratorsColumns,
  credits: creditsColumns
};

export default {
  name: 'trends-table',
  components: {
    BaseTable,
    BaseTableSubhead,
    BaseTableRow,
    Selectable,
    SelectableCheckbox,
    BasePercentage
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    group: {
      type: String,
      required: true,
      validator: value => (value in groupColumnsMap)
    },
    timePeriod: {
      type: String,
      required: true
    },
    demoProfileId: {
      type: String,
      default: null
    }
  },
  beforeDestroy() {
    this.resetSelectedIds();
  },
  watch: {
    group() {
      this.resetSelectedIds();
    },
  },
  computed: {
    total() {
      const data = this.$store.getters['analytics/trends/allTracksData']
      return {
        prevPeriod: data.prevValue,
        currPeriod: data.currentValue,
        totalChange: data.percentage
      };
    },
    selectedIds: {
      get() {
        return this.$store.getters['analytics/trends/selectedIds'];
      },
      set(value) {
        this.$store.commit('analytics/trends/setSelectedIds', value);
      }
    },
    titleSlot() {
      return this.group === 'tracks' || this.group === 'albums'
        ? 'title'
        : 'name';
    },
    columns() {
      let groupColumns = null
      if (this.demoProfileId) {
        groupColumns = groupColumnsMapDemo[this.group];
      } else {
        groupColumns = groupColumnsMap[this.group];
      }
      return [
        checkboxCol,
        ...groupColumns,
        ...commonColumns,
        {
          title: 'Change',
          key: 'percentage',
          anatomy: 'default',
          class: `col-right col-number th--clickable--no-hover ${this.sorterIconStyle}`,
          processable: true,
          sorter: this.showSorterIcon,
          sortIcon: 'calendar',
          sortKey: 'percentage',
          sortDirections: ['ASC', 'DESC'],
          sortDefault: 'DESC',
          component: BasePercentage,
          componentProps: (item) => ({
            value: item.percentage || 0
          })
        },
        cols.optionsHidden
      ];
    },
    groupText() {
      return capitalizeWord(this.group);
    },
    showSorterIcon() {
      return (this.timePeriod !== 'all');
    },
    sorterIconStyle() {
      return this.timePeriod === 'all' ? 'hide-sorter-icon' : ''
    }
  },
  methods: {
    resetSelectedIds() {
      this.selectedIds = [];
    },
    isLastSelectedItem(item) {
      return item.id === lastElement(this.selectedIds);
    }
  }
}
</script>

<style lang="scss">
.trends-table {
  --subhead-col-master-span: 2;
  --col-master-span: 3;
  &[data-group=credits] {
    --subhead-col-master-span: 1;
    --col-master-span: 2;
  }
  .th.col-avatar {
    display: none;
  }
  .th.col-master {
    padding-left: 0;
    grid-column: 2 / span var(--subhead-col-master-span);
  }
  .tsubhead {
    --tr-border-left-indent: var(--col-index);
    .col-avatar,
    .col-master + .col-def {
      // display: none;
    }
    .col-master {
      padding-left: 0;
      grid-column: 2 / span var(--subhead-col-master-span);
    }
  }
  .tr[data-last-selected] {
    --tr-border-left-indent: var(--col-index);
    --border-color: var(--overlay-4-color);
  }
  .tsubhead .col-avatar {
    display: none;
  }
  .td .skeleton {
    float: right;
  }
  .tr[data-last-selected] {
    .td {
      &:first-child {
        &::before {
          border-bottom: 1px solid var(--border-color);
        }
      }
    }
  }
}
.th--show-sorter {
  padding-right: 20px;
}
.trends-table .col-master.td {
  font-size: 16px;
}
.trends-table .hide-sorter-icon {
  padding-right: 0;
}
</style>
