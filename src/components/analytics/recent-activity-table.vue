<template>
  <master-table>
    <template #header>
      <master-header>
        <template #title>{{ title }}</template>
        <template #cta>
          <plain-button
            variant="default"
            component="router-link"
            :to="viewAllRoute"
          >
            View All
          </plain-button>
        </template>
      </master-header>
    </template>
    
    <activity-table :data="data" />
  </master-table>
</template>

<script>
import MasterTable from 'components/ui/master-table.vue';
import MasterHeader from 'components/ui/master-header.vue';
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import ActivityTable from './activity-table.vue';

const types = ['chart', 'playlist'];

export default {
  name: 'recent-activity-table',
  components: {
    MasterTable,
    MasterHeader,
    PlainButton,
    ActivityTable
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: value => types.includes(value)
    }
  },
  computed: {
    title () {
      return this.type === 'playlist'
        ? 'Playlist Activity'
        : 'Chart Activity';
    },
    viewAllRoute() {
      return {
        name: 'analytics-activity',
        query: {
          groupBy: this.type
        }
      };
    }
  }
}
</script>
