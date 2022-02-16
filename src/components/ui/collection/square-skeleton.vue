<template>
  <div class="album-item album-item--loading"> 
    <div class="album-item__img-wrap album-skel"></div>
    <div class="album-item__body">
      <div class="album-item__title album-skel"></div>
      <div v-if="showRelease" class="album-item__info album-skel"></div>
      <div v-if="showArtist" class="album-item__info album-skel"></div>
    </div>
  </div>
</template>

<script>
export const props = {
  item: {
    type: Object,
    required: true
  },
  showRelease: {
    type: Boolean,
    default: true
  },
  showArtist: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
};

const { showRelease, showArtist } = props;

export default {
  name: 'album-item-skeleton',
  props: {
    showRelease,
    showArtist
  }
};
</script>
