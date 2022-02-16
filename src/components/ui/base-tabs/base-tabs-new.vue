<script>
import BaseTabPanel from './base-tab-panel.vue';
import BaseTablist from './base-tablist.vue';
import BaseTab from './base-tab.vue';

export { BaseTabPanel, BaseTablist, BaseTab };

export default {
  name: 'base-tabs',
  model: {
    prop: 'activeTab',
    event: 'change'
  },
  provide() {
    return {
      tabsNode: this
    };
  },
  props: {
    activeTab: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      activeTabModel: this.activeTab
    };
  },
  render(h) {
    return (
      <div class="tabs">
        {this.getTablist()}

        <transition name="fade-fast" mode="out-in" on={this.listeners}>
          { this.$slots.content || this.getActiveTab() }
        </transition>
      </div>
    );
  },
  created() {
    this.$on('change', this.setActiveTab);
  },
  watch: {
    activeTab: {
      immediate: true,
      handler: 'updateActiveTab'
    }
  },
  computed: {
    listeners() {
      return {
        beforeEnter: () => {
          // This is kind of hot solution
          // TODO: Find better way to notify about 'before-enter' event
          this.$root.$emit('tab-pane:before-enter');
        }
      };
    }
  },
  methods: {
    getActiveTab() {
      return this.getTabs().find(this.isActiveTab);
    },
    getTablist() {
      return (this.$slots.default || []).filter(isTablist);
    },
    getTabs() {
      return (this.$slots.default || []).filter(isTabPanel);
    },
    updateActiveTab() {
      if (this.activeTab !== undefined) {
        this.activeTabModel = this.activeTab;
      } else {
        const [firstTab] = this.getTabs();
        if (firstTab) {
          this.activeTabModel = firstTab.key;
        }
      }
    },
    setActiveTab(value) {
      this.activeTabModel = value;
    },
    isActiveTab(slot) {
      const key = slot?.data?.key;

      return key === this.activeTabModel;
    }
  }
}

const isTablist = ({ componentOptions }) => {
  return componentOptions
    ? componentOptions.tag === BaseTablist.name
    : false;
};
const isTabPanel = ({ componentOptions }) => {
  return componentOptions
    ? componentOptions.tag === BaseTabPanel.name
    : false;
};
</script>

<style lang="scss">
.tabs {
  display: flex;
  flex-direction: column;
}
</style>