<template>
  <base-table
    class="activity-table"
    :data="data"
    :columns="columns"
    :responsive="false"
    v-bind="$attrs"
  />
</template>

<script>
import BaseTable from 'components/ui/base-table/base-table.vue';
import ActivityInfo from './activity-info.vue';
import BaseLogoRound from 'components/ui/base-logo-round/base-logo-round.vue';
import { TableCell } from 'components/ui/table-cell/table-cell';
import { formatSecondaryDate } from 'helpers/date';
import { snakeToKebabCase } from 'helpers/text';

export const columns = [{
  title: 'title',
  key: 'title',
  component: ActivityInfo,
  componentProps: item => ({
    activity: item
  })
}, {
  title: 'Date',
  key: 'date',
  class: 'col-activity-date',
  component: TableCell.Date,
  componentProps: item => ({
    value: item.date,
    formatter: formatSecondaryDate
  })
}, {
  title: '',
  key: 'appLogo',
  class: 'col-activity-logo',
  component: BaseLogoRound,
  componentProps: item => ({
    name: snakeToKebabCase(item.source.type),
    width: 15,
    sizes: '15px'
  })
}];

export default {
  name: 'activity-table',
  components: {
    BaseTable
  },
  props: {
    data: {
      type: Array,
      default: [],
      required: true
    }
  },
  computed: {
    columns() {
      return columns;
    }
  }
}
</script>

<style lang="scss">
.activity-table {
  --tr-hover-background-color: transparent;
  --table-columns: 1fr auto auto;
  --tr-border-left-indent: calc(var(--avatar-size) + 10px);
  .tr {
    cursor: default;
  }
}
.col-activity-date {
  width: 90px;
  text-align: right;
  &.td {
    color: var(--overlay-3-color);
  }
}
.col-activity-logo {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 20px;
}
</style>