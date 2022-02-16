<template>
  <li
    class="credits-song-item"
    :data-hoverable="modal"
    v-on="listeners"
  >
    <em class="credits-song-item__track-number">{{ song.trackNumber }}</em>
    <component
      :is="songItem.component"
      class="credits-song-item__title"
      v-bind="songItem.props"
    >
      {{ song.title }}
    </component>
  </li>
</template>

<script>
import { songRoute } from 'helpers/routing';

export default {
  name: 'credits-song-item',
  props: {
    song: {
      type: Object,
      required: true
    },
    modal: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    album() {
      return this.$store.getters['collection/collectionDetails'];
    },
    listeners() {
      if (this.modal) {
        return {
          click: this.openSongModal
        };
      } else {
        return {};
      }
    },
    songItem() {
      if (this.modal) {
        return {
          component: 'span',
          props: {}
        };
      } else {
        return {
          component: 'router-link',
          props: {
            to: songRoute(this.song)
          }
        };
      }
    }
  },
  methods: {
    openSongModal() {
      this.$modal.open({
        name: 'song',
        props: {
          song: this.song,
          album: this.album
        }
      });
    }
  }
}
</script>

<style lang="scss">
.credits-song-item {
  display: flex;
  padding: 7px 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  &[data-hoverable] {
    cursor: pointer;
    &:hover {
      background-color: #272524;
    }
  }
  &__track-number {
    margin-right: 7px;
    min-width: 18px;
    font-style: normal;
    text-align: center;
    color: #8F8F8F;
  }
  &__title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #F2F2F2;
  }
}
</style>