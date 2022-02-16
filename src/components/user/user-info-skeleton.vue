<template>
  <div class="user-info user-info--skeleton">
    <skeleton class="user-info__img-wrap user-info__img" />
    <div class="user-info__content">
      <skeleton class="thin" :class="nameClass" />
      <skeleton class="thin mt-10" :class="textClass" />
      <slot />
    </div>
  </div>
</template>

<script>
import Skeleton from 'components/ui/skeleton.vue';

export default {
  name: 'user-info-skeleton',
  components: {
    Skeleton
  },
  props: {
    nameClass: {
      type: String,
      default: 'short'
    },
    textClass: {
      type: String,
      default: ''
    }
  }
}
</script>
