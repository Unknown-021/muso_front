<template>
  <master-table>
    <template #header>
      <master-header>
        <template #title>
          <slot name="title" />
        </template>
        <template #cta>
          <plain-button
            variant="default"
            component="router-link"
            :to="viewAllRoute"
            class="view-all-btn"
          >
            View All
          </plain-button>
        </template>
      </master-header>
    </template>

    <overview-table class="overview-table" :data="data" :loading="loading" :row-skeleton-count="5" :type="type" :demo-profile-id="demoProfileId"/>
    <div v-if="!data.length && !loading" class="zero-static zero-static--light">
      <base-icon :name="iconName" />
      <span>No Data Available</span>
    </div>
  </master-table>
</template>

<script>
import MasterTable from 'components/ui/master-table.vue';
import MasterHeader from 'components/ui/master-header.vue';
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import OverviewTable from './overview-table.vue';
import BaseIcon from 'components/ui/base-icon/base-icon.vue';

const types = ['tracks', 'collaborators'];

export default {
  name: 'recent-activity-table',
  components: {
    MasterTable,
    MasterHeader,
    PlainButton,
    OverviewTable,
    BaseIcon
  },
  props: {
    data: {
      type: Array,
      required: false,
      default: () => []
    },
    type: {
      type: String,
      required: true,
      validator: value => types.includes(value)
    },
    loading: {
      type: Boolean,
      default: true
    },
    demoProfileId: {
      type: String,
      default: null
    }
  },
  computed: {
    viewAllRoute() {
      const params = { id: this.demoProfileId }
      return {
        name: 'analytics-catalog',
        params,
        query: {
          groupBy: this.type,
        },
      };
    },
    iconName() {
      return this.type === 'collaborators' ? this.type : 'list'
    }
  }
}
</script>

<style lang="scss">
.overview-table .col-master.td {
  font-size: 16px;
}
.view-all-btn {
  line-height: 1.4;
  box-sizing: border-box;
  border: 1px solid transparent;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  &:hover {
    color: var(--overlay-1-color);
    text-decoration: none;
    background: rgba(143, 143, 143, 0.25);
    box-shadow: inset 0 -20px 11px -13px #f7f7f74d;
    filter: drop-shadow(0 0 1px hsla(0, 0%, 96.9%, 0.5));
    border-color: var(--base-5-color);
    border-radius: 2px;
  }
}
</style>
