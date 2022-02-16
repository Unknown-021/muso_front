<template>
  <div class="notif notif--loading">
    <user-info-skeleton class="notif-body" name-class="notif-loading-title long" text-class="notif-loading-text">
      <skeleton class="thin mt-10 notif-loading-text" />
    </user-info-skeleton>
  </div>
</template>

<script>
import Skeleton from 'components/ui/skeleton.vue';
import UserInfoSkeleton from 'components/user/user-info-skeleton.vue';

export default {
  name: 'notifcation-skeleton',
  components: {
    Skeleton,
    UserInfoSkeleton
  }
}
</script>

<style lang="scss">
.notif-loading {
  &-title {
    margin-top: 4px;
  }
  &-text {
    width: 250px;
    background-color: #1b1a18;
    &:last-child {
      margin-bottom: 3px;
    }
  }
}
</style>