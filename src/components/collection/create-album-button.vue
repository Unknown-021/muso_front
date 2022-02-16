<template>
  <plain-button @click="openAlbumModal">
    <plus-icon /> New Album
  </plain-button>
</template>

<script>
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import PlusIcon from 'assets/images/icons/plus.svg';

export default {
  name: 'create-album-button',
  components: {
    PlainButton,
    PlusIcon
  },
  methods: {
    openAlbumModal() {
      this.$modal.open({
        name: 'create-album'
      });
    }
  }
}
</script>