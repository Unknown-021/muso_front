<template>
<div>
  <breadcrumb />
  <grouping-master-table
    :entity-id="entityId"
    :query.sync="query"
  />
</div>
</template>

<script>
import Breadcrumb from 'components/breadcrumbNew';
import GroupingMasterTable from 'components/analytics/grouping-master-table';

export default {
  name: 'analytics-track-grouping',
  components: {
    Breadcrumb,
    GroupingMasterTable
  },
  props: {
    entityId: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      query: {
        sortKey: 'streams',
        sortDirection: 'DESC'
      }
    }
  },
  watch: {
    query: {
      deep: true,
      handler: 'fetchData'
    }
  }
}
</script>

