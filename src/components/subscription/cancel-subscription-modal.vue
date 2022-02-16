<template>
  <base-modal ref="modal" modal-class="cancel-subscription" :closable="false" v-bind="$attrs" v-on="$listeners">
    <p class="cancel-subscription__title">
      Are you sure?
    </p>
    <p class="cancel-subscription__content">
      The cancellation of your membership will take effect at the end of your current billing period on 
      <span class="cancel-subscription__date">
        {{$date(subscription.nextBillingTime, 'long')}}
      </span>.
    </p>
    <action-button variant="danger" @click="cancel" :loading="loading">Finish Cancellation</action-button>
    <action-button variant="default" @click="close">Cancel</action-button>
  </base-modal>
</template>

<script>
import BaseModal from 'components/ui/base-modal/base-modal.vue';
import ActionButton from 'components/ui/action-button';

export default {
  name: 'cancel-subscription',
  components: {
    BaseModal,
    ActionButton,
  },
  props: {
    reason: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    subscription() {
      return this.$store.getters['payment/subscription'];
    },
  },
  methods: {
    close() {
      return this.$refs.modal.hide();
    },
    async cancel() {
      try {
        this.loading = true;
        await this.$store.dispatch('payment/cancelSubscription', { reason: this.reason });
        this.$emit('success');
        this.close();
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.loading = false;
      }
    },
  },
}
</script>

<style lang="scss">
.cancel-subscription {
  width: 370px;
  padding: 30px;
  background: #21201F;
  color: #8F8F8F;
  text-align: center;
  &__title {
    font-weight: 500;
    font-size: 20px;
    color: #FFFFFF;
  }
  &__content {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  &__date {
    color: #FFFFFF;
  }
  & button {
    margin-top: 10px;
    width: 100%;
  }
}
</style>