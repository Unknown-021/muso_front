<template>
  <base-modal ref="modal" modal-class="subs-modal" v-bind="$attrs" v-on="$listeners">
    <div class="subs-modal__left-tabs">
      <div
        v-for="item in menuItems"
        @click="changeActiveTab(item.key)"
        :class="{ active: activeTab === item.key }"
        :key="item.key"
      >
        <div>{{ item.name }}</div>
      </div>
    </div>
    <div class="subs-modal__tab-content">
      <template v-if="subscription">
        <manage-subscription v-if="activeTab === 'manage'" />
        <payment-history v-else-if="activeTab === 'history'" />
        <missing-subscription v-else-if="activeTab === 'upgrade'" />
      </template>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from 'components/ui/base-modal/base-modal.vue';
import PaymentHistory from 'components/subscription/payment-history.vue';
import ManageSubscription from 'components/subscription/manage-subscription.vue';
import MissingSubscription from 'components/subscription/missing-subscription.vue';

export default {
  name: 'subscription-modal',
  components: {
    BaseModal,
    PaymentHistory,
    ManageSubscription,
    MissingSubscription
  },
  data() {
    return {
      activeTab: 'manage'
    }
  },
  async beforeMount() {
    await this.getSubscription();
  },
  destroyed() {
    this.clearHistory();
  },
  computed: {
    canceledSubscription() {
      return this.subscription?.status === 'suspended';
    },
    subscription() {
      return this.$store.getters['payment/subscription'];
    },
    menuItems() {
      return [{
        key: 'manage',
        name: 'Manage Membership',
      }, {
        key: 'history',
        name: 'Payment History',
      }];
    }
  },
  methods: {
    async getSubscription() {
      try {
        await this.$store.dispatch('payment/getSubscription');
      } catch (error) {
        this.$handleError(error);
      }
    },
    clearHistory() {
      this.$store.commit('payment/setHistory', []);
    },
    changeActiveTab(tabKey) {
      this.activeTab = tabKey;
    }
  }
}
</script>

<style lang="scss">
.subs-modal {
  max-width: 1020px;
  min-height: 400px;
  max-height: 700px;
  display: flex;
  flex-direction: row;
  background: #272625;
  
  &__left-tabs {
    width: 200px;
    padding-top: 20px;
    & > div {
      height: 40px;
      line-height: 40px;
      padding-left: 30px;
      cursor: pointer;
      &.active {
        background: var(--base-1-color);
      }
    }
  }
  &__tab-content {
    flex: 1;
    background: var(--base-2-color);
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
  }
}
</style>