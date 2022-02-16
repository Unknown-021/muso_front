<template>
  <user-info class="menu-item-inner" :user="user" avatar-size="small" navigable v-bind="$attrs">
    <template v-if="pending" #info>
      <span class="user-pending">Pending</span>
    </template>
  </user-info>
</template>

<script>
import UserInfo from './user-info.vue';

export default {
  name: 'user-menu-item',
  components: {
    UserInfo
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    pending: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.user-pending {
  display: block;
  font-size: 12px;
  color: #36B696;
}
</style>