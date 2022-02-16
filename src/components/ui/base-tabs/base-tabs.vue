<script>
import BaseTabPanel from './base-tab-panel.vue';

export { BaseTabPanel };

export default {
  name: 'base-tabs',
  model: {
    prop: 'activeTab',
    event: 'change'
  },
  props: {
    activeTab: {
      type: String,
      default: undefined
    }
  },
  render(h) {
    const tabs = this.getTabs();
    const activeTabPanel = tabs.find(this.isActiveTab);
    const listeners = {
      beforeEnter: () => {
        // This is kind of hot solution
        // TODO: Find better way to notify about 'before-enter' event
        this.$root.$emit('tab-pane:before-enter');
      }
    };
    const after = this.$scopedSlots.after
      ? <div class="tabs__after">{this.$scopedSlots.after()}</div>
      : null;

    return (
      <div class="tabs">
        <div class="tabs__tablist-wrap no-scrollbar" role="tablist">
          <div class="tabs__tabslist">{tabs.map(this.renderTab)}</div>
          {after}
        </div>

        <transition name="fade-fast" mode="out-in" on={listeners}>
          { activeTabPanel }
        </transition>
      </div>
    );
  },
  data() {
    return {
      activeTabValue: this.activeTab
    };
  },
  created() {
    this.updateActiveTabValue();
  },
  watch: {
    activeTab: 'updateActiveTabValue'
  },
  methods: {
    renderTab(tab) {
      let content = null;

      if (tab.data.scopedSlots?.tab) {
        content = tab.data.scopedSlots.tab();  
      } else {
        content = tab.data.attrs?.tab || ''
      }

      const listeners = {
        click: () => this.setActiveTab(tab.data.key)
      };
      const isTabActive = tab.data.key === this.activeTabValue;

      let className = 'tabs__tab';
      if (isTabActive) {
        className += ' tabs__tab--active';
      }

      return (
        <button role="tab" class={className} aria-selected={String(isTabActive)} on={listeners}>
          {content}
        </button>
      )
    },
    getTabs() {
      return (this.$slots.default || []).filter(isTabPanel);
    },
    updateActiveTabValue() {
      if (this.activeTab !== undefined) {
        this.activeTabValue = this.activeTab;
      } else {
        const [firstTab] = this.getTabs();
        if (firstTab) {
          this.activeTabValue = firstTab.key;
        }
      }
    },
    setActiveTab(value) {
      this.activeTabValue = value;
      this.$emit('change', value);
      this.setGroup(value);
    },
    isActiveTab(slot) {
      const key = slot?.data?.key;

      return key === this.activeTabValue;
    },
    setGroup(value) {
      this.$emit('update:activeTab', value);
    }
  }
}

const isTabPanel = (slot) => {
  return slot.componentOptions
    ? slot.componentOptions.tag === BaseTabPanel.name
    : false;
};
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract";

.tabs {
  display: flex;
  flex-direction: column;
  &__tablist-wrap {
    display: flex;
    position: relative;
    @media (max-width: 767px) {
      margin-left: -15px;
      margin-right: -15px;
      padding-left: 15px;
      overflow-x: scroll;
      &::after {
        content: "";
        flex-shrink: 0;
        width: 15px;
      }
    }
    @media (min-width: 768px) {
      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: -3px;
        bottom: 0;
        height: 1px;
        background-color: #272625;
      }
    }
  }
  &__tabslist {
    display: flex;
    width: 100%;
  }
  &__after {
    align-self: center;
    padding-left: 20px;
    @media #{$before-tablet} {
      display: none;
    }
  }
  &__tab {
    position: relative;
    z-index: 1;
    -webkit-appearance: none;
    border-radius: 0;
    border: 0;
    padding: 5px 12px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.3;
    color: var(--base-5-color);
    box-shadow: none;
    background-color: transparent;
    transition-property: background-color, color;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
    @media (max-width: 767px) {
      flex-shrink: 0;
      flex-grow: 1;
      min-width: 100px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      &--active {
        color: #0C0B09;
        background-color: #FFF;
      }
    }
    @media (min-width: 768px) {
      margin-right: 22px;
      padding: 11px 0;
      font-size: 14px;
      font-weight: 400;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: -3px;
        right: -3px;
        height: 2px;
        background-color: transparent;
        transition: background-color 150ms ease-in-out;
      }
      &:hover {
        color: var(--overlay-1-color);
      }
      &--active {
        color: var(--overlay-1-color);
        &::after {
          background-color: currentColor;
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>