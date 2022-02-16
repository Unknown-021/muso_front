<template>
  <user-info
    :user="item"
    :type="type"
    class="profile-item"
    :navigable="navigable"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #avatar-icon>
      <slot name="avatar-icon" >
        <cross-icon v-if="removeable" width="9" fill="#FF3B30" />
      </slot>
    </template>
    <template #name-after>
      <slot name="name-after" />
    </template>
    <template v-if="info" #info>
      <p class="ellipsis">{{ info }}</p>
    </template>

    <template #after>
      <slot name="after" />
    </template>
  </user-info>
</template>

<script>
import UserInfo, { props, getUserRoute, } from 'components/user/user-info.vue';
import CrossIcon from 'assets/images/icons/cross-new.svg';

export default {
  name: 'profile-list-item',
  components: {
    UserInfo,
    CrossIcon
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    type: props.type,
    navigable: {
      type: Boolean,
      default: true
    },
    removeable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    info() {
      return this.commonCredits || this.item.credit;
    },
    profileRoute() {
      return getUserRoute(this.item, this.type);
    },
    commonCredits() {
      let commonCredits = this.item.commonCredits || '';
      if (commonCredits.charAt(0) === ',') {
        commonCredits = commonCredits.slice(1);
      }
      const indexOf = commonCredits.indexOf(',');
      return indexOf > 0 ? commonCredits.slice(0, indexOf) : commonCredits;
    }
  },
  methods: {
    // public method
    getRoute() {
      return this.profileRoute;
    }
  }
}
</script>

<style lang="scss">
.profile-item {
  cursor: pointer;
}
</style>