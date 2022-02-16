<template>
  <div class="sidebar-album-item-skel album-info">
    <skeleton class="album-info__img album-info__img-wrap" />
    <div class="album-info__content">
      <skeleton class="thin long" />
      <skeleton class="thin short mt-10" />
    </div>
  </div>
</template>

<script>
import Skeleton from 'components/ui/skeleton.vue';

export default {
  name: 'album-info-skeleton',
  components: {
    Skeleton
  }  
}
</script>