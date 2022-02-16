<template>
  <transition name="fade-fast" mode="out-in">
    <credits-section-skeleton v-if="loading" :column-count="columnCount" />

    <section v-else class="credits-section">
      <div class="section-header" data-expand-parent>
        <h2 class="section-title">Collaborators ({{ dataSource.collaboratorCount }})</h2>
        <div class="section-header__after">
          <expandable-search v-model="searchQuery" class="section-header__expandable-search" />
          <template v-if="dataSource.isAdminPage">
            <span class="v-line" />
            <add-collaborator-button
              v-if="dataSource.isAdminPage"
              :album="dataSource.album"
              :song-ids="dataSource.songIds"
              class="credits-section__add-btn"
            />
          </template>
        </div>
      </div>

      <template v-if="noCredits">
        <div class="credits-section__no-credits zero-state">
          <img class="zero-state__img" src="images/icons/song-note.svg" width="64" height="74" />
          <p class="zero-state__text">No Credits On Muso.AI Yet</p>
        </div>
      </template>

      <columns-grid :column-count="columnCount" v-else>
        <template v-for="item in creditsData">
          <credits-card
            :key="item.id"
            :type="type"
            :credits-item="item"
          />
        </template>
      </columns-grid>
    </section>
  </transition>
</template>

<script>
import CreditsSectionSkeleton from './credits-section-skeleton.vue';
import CreditsCard, { props } from './credits-card.vue';
import HorizontalLine from 'components/ui/horizontal-line.vue'
import { isNoCredits } from 'store/modules/credits.utils';
import ColumnsGrid from 'components/ui/columns-grid.vue';
import AddCollaboratorButton from 'components/collaborator/add-collaborator-button.vue';
import { CreditsDataSource } from './credits-data-source';
import ExpandableSearch from 'components/ui/base-expandable-search/base-expandable-search.vue';

export default {
  name: 'credits-section',
  components: {
    CreditsSectionSkeleton,
    HorizontalLine,
    CreditsCard,
    ColumnsGrid,
    ExpandableSearch,
    AddCollaboratorButton
  },
  props: {
    type: props.type,
    loading: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      dataSource: this.dataSource
    };
  },
  data() {
    return {
      searchQuery: '',
      isMenuVisible: false,
      isTablet: false,
      isDesktop: false,
      dataSource: new CreditsDataSource({ vm: this, type: this.type })
    };
  },
  mounted() {
    this.$syncMediaWithComponent(this.$mediaQueries.TABLET, 'isTablet');
    this.$syncMediaWithComponent(this.$mediaQueries.DESKTOP, 'isDesktop');
  },
  watch: {
    searchQuery: {
      immediate: true,
      handler(value) {
        this.dataSource.setSearchQuery(value);
      }
    }
  },
  computed: {
    columnCount() {
      if (this.isDesktop) {
        return 3;
      } else if (this.isTablet) {
        return 2;
      } else {
        return 1;
      }
    },
    creditsData() {
      return this.dataSource.filteredCredits.filter(item => {
        return item.tag === 'unassigned' && item.list.length === 0
          ? false
          : true;
      });
    },
    noCredits() {
      return isNoCredits(this.dataSource.credits);
    }
  }
}
</script>

<style lang="scss">
.credits-section {
  &__no-credits {
    @media (max-width: 767px) {
      margin-top: -7px;
    }
  }
  &__title-add-btn {
    align-self: center;
    margin-left: auto;
    font-size: 14px;
  }
}
</style>