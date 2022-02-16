<template>
  <base-modal
    ref="modal"
    modal-class="cancel-subscription-reasons"
    :closable="false"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="cancel-subscription-reasons__body">
      <p class="cancel-subscription-reasons__title">
        Cancel Your Subscription
      </p>
      <span>
        We’re sad to see you go! If cancelled today, you may continue to use Pro features until 
        <span class="cancel-subscription-reasons__date">
          {{$date(subscription.nextBillingTime, 'long')}}
        </span>.
      </span>
      <div class="cancel-subscription-reasons__divider"></div>
      <p class="cancel-subscription-reasons__subtitle">Why did you cancel your membership with us?</p>
      <span>To help us improve PRO, please take a minute to tell us about why you canceled</span>
      <span>*Select all that apply</span>
      <div class="cancel-subscription-reasons__check-btns">
        <check-button-label
          v-for="reason in reasons"
          :key="reason.key"
          :value="reason.key"
          :selected="selectedReason === reason.key"
          @click="selectReason(reason.key)"
        >
          {{ reason.name }}
        </check-button-label>
      </div>
      <form-input type="text" v-model="otherReason" placeholder="Please specify" />
      <p class="cancel-subscription-reasons__footer-text">
        Thanks. We liked having you as a member and hope you'll be back soon.
      </p>
    </div>
    <div class="cancel-subscription-reasons__footer">
      <action-button variant="danger" :disabled="!isSelectedValid" @click="onSuccess">
        Cancel Membership
      </action-button>
    </div>
  </base-modal>
</template>

<script>
import FormInput from "components/ui/form-input";
import BaseModal from 'components/ui/base-modal/base-modal.vue';
import CheckButtonLabel from 'components/ui/check-button-label.vue';
import ActionButton from 'components/ui/action-button.vue';

export default {
  name: 'cancel-subscription-reasons',
  components: {
    FormInput,
    BaseModal,
    CheckButtonLabel,
    ActionButton
  },
  data() {
    return {
      reasons: [
        {
          key: 'usage',
          name: 'I don’t use Muso.AI Pro enough',
        },
        {
          key: 'information',
          name: 'The service did not provide the analytics that I was expecting',
        },
        {
          key: 'price',
          name: 'It’s too expensive for me',
        },
        {
          key: 'other',
          name: 'Other (please specify below)',
        },
      ],
      selectedReason: '',
      otherReason: '',
    }
  },
  computed: {
    isSelectedValid() {
      return (this.selectedReason && this.selectedReason !== 'other') ||
      (this.selectedReason === 'other' && this.otherReason);
    },
    subscription() {
      return this.$store.getters['payment/subscription'];
    },
  },
  methods: {
    close() {
      return this.$refs.modal.hide();
    },
    onSuccess() {
      const reasonObj = this.reasons.find((r => r.key === this.selectedReason));
      const reason = this.selectedReason === 'other' ? this.otherReason : reasonObj?.name;
      this.$emit('success', {
        reason,
      });
      this.close();
    },
    selectReason(selectedReason) {
      this.selectedReason = selectedReason;
    },
  },
}
</script>

<style lang="scss">
.cancel-subscription-reasons {
  width: 820px;
  max-height: max-content;
  background: #21201F;
  color: #8F8F8F;
  &__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px;
  }
  &__title {
    color: #FFFFFF;
    font-weight: 500;
    font-size: 44px;
    line-height: 1.3;
  }
  &__subtitle {
    color: #FFFFFF;
    font-weight: 500;
    font-size: 20px;
    line-height: 1.3;
  }
  &__footer-text {
    margin-top: 120px;
  }
  & span {
    margin-top: 10px;
  }
  &__divider {
    margin-top: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #8F8F8F;
    opacity: 0.2;
  }
  &__check-btns {
    margin-top: 20px;
  }
  &__footer {
    position: relative;
    padding: 10px 30px;
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid rgba(143, 143, 143, 0.2);
    & button {
      width: 220px;
    }
  }
}
</style>