<template>
  <base-table-mobile-row class="song-cmr" @click="navigateToSong">
    <base-table-cell :cell="cells.cover" class="media__img" />
    <div class="media__content media__content--enriched">
      <div class="media__main-info">
        <base-table-cell :cell="cells.artist" class="song-cmr__artist media__title" />
        <base-table-cell :cell="cells.title" class="song-cmr__title media__title" />
        <span class="media__text">
          <base-table-cell :cell="cells.role" />
        </span>
      </div>

      <div class="media__meta-info">
        <span class="song-cmr__date">{{ releaseDate }}</span>
      </div>
    </div>
  </base-table-mobile-row>
</template>

<script>
import { BaseTableCell, BaseTableMobileRow } from 'components/ui/base-table/base-table.vue';
import { formatDateStrToLocaleDate } from 'helpers/date';
import { isParentElementInteractive } from 'helpers/dom';
import { songRoute } from 'helpers/routing';

export default {
  name: 'song-credits-mobile-row',
  components: {
    BaseTableCell,
    BaseTableMobileRow
  },
  props: {
    cells: {
      type: Object,
      required: true
    },
    song: {
      type: Object,
      required: true
    }
  },
  computed: {
    releaseDate() {
      const dateStr = this.cells.releaseDate.props.value;
      const locale = this.$root.userLanguages[0];

      return dateStr ? formatDateStrToLocaleDate(dateStr, locale) : '';
    }
  },
  methods: {
    navigateToSong({ target }) {
       if (!isParentElementInteractive(target)) {
        this.$router.push(songRoute(this.song));
      }
    }
  }
}
</script>

<style lang="scss">
.song-cmr {
  &__title[class],
  &__artist {
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
  }
  &__artist a {
    color: #8F8F8F;
  }
  &__artist,
  &__date {
    line-height: 1.25;
  }
  &__content[class] {
    flex-direction: row;
  }
  &__title[class] {
    margin-right: auto;
  }
  &__date {
    color: #8F8F8F;
  }
  &__streams {
    color: #FFF;
  }
}
</style>