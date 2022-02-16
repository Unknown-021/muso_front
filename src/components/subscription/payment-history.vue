<template>
  <div class="payment-history">
    <div>
      <div class="payment-history__header">
        <p class="payment-history__title">
          Payment History
        </p>
        <span>Your Next Bill: 
          <time>{{ $date(subscription.nextBillingTime) }}</time>
        </span>
      </div>
      <p class="payment-history__plan">
        Your Plan: Muso.AI <pro-badge />
      </p>
      <span class="payment-history__price">$9,99/month</span>
      <div class="payment-history__divider mt-xl mb-s"></div>
      <base-table
        class="payment-history__table"
        :data="history"
        :columns="tableColumns"
        :responsive="false"
        :hoverable="false"
        :loading="isLoading"
        :row-skeleton-count="5"
        v-bind="$attrs"
      />
    </div>
    <div>
      <cancel-subscription-button v-if="!canceledSubscription" />
    </div>
  </div>
</template>

<script>
import ProBadge from 'components/ui/pro-badge.vue';
import BaseTable from 'components/ui/base-table/base-table.vue';
import { TableCell } from 'components/ui/table-cell/table-cell';
import CancelSubscriptionButton from './cancel-subscription-button';
import PaymentDetailsFactory from './payment-details-factory.vue';

const columns = [
  {
    title: 'Date',
    key: 'date',
    component: TableCell.Date,
    componentProps: item => ({
      value: item.transactionDate,
      format: 'numeric'
    })
  },
  {
    title: 'Description',
    key: 'description',
    component: TableCell.PlainCell,
    componentProps: item => ({
      value: 'Muso.AI PRO'
    })
  },
  {
    title: 'Service period',
    key: 'periodStart',
    component: TableCell.DateRange,
    componentProps: item => ({
      dateEnd: item.periodEnd,
      dateStart: item.periodStart,
      format: 'numeric'
    })
  },
  {
    title: 'Payment method',
    key: 'paymentDetails',
    class: 'ellipsis',
    component: PaymentDetailsFactory,
    componentProps: item => ({
      subscription: item.paymentDetails
    })
  },
  {
    title: 'Total',
    key: 'total',
    component: TableCell.PaymentTotal,
    componentProps: item => ({
      status: item.transactionStatus,
      amount: item.paymentDetails.amount
    })
  }
];

export default {
  name: 'payment-history',
  components: {
    ProBadge,
    BaseTable,
    CancelSubscriptionButton
  },
  data() {
    return {
      isLoading: false
    };
  },
  created() {
    this.getPaymentHistoryIfNeeded();
  },
  computed: {
    canceledSubscription() {
      return this.subscription?.status === 'suspended';
    },
    subscription() {
      return this.$store.getters['payment/subscription'];
    },
    history() {
      return this.$store.getters['payment/history'];
    },
    tableColumns() {
      return columns;
    }
  },
  methods: {
    getPaymentHistoryIfNeeded() {
      if (!this.history.length) {
        return this.getPaymentHistory();
      }
    },
    async getPaymentHistory() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('payment/getPaymentHistory');
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.isLoading = false;
      }
    },
  }
}
</script>

<style lang="scss">
.payment-history {
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__header {
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & span {
      color: var(--base-5-color);
    }  
  }
  &__title {
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 500;
  }
  &__plan {
    color: #FFFFFF;
    font-weight: 500;
  }
  &__divider {
    opacity: 0.2;
    border-bottom: 1px solid var(--base-5-color);
  }
  &__price {
    margin-top: 5px;
    display: block;
    color: var(--base-5-color);
  }
  &__table {
    --skeleton-color: var(--base-4-color);
    --tr-border-color: var(--border-color-3);
    --table-columns: 100px 140px 170px auto 100px;
    --tr-hover-background-color: var(--base-4-color);
  }
}
</style>