<template>
  <div class="profile-round profile-round--skeleton">
    <div class="profile-round__img-wrap" />
    <skeleton class="thin mx-auto mt-15 mb-5" />
    <skeleton v-if="type === 'profile'" class="thin mx-auto short o6" />
  </div>
</template>

<script>
import Skeleton from 'components/ui/skeleton';

export default {
  components: {
    Skeleton
  },
  props: {
    type: String,
    default: 'profile'
  }
}
</script>