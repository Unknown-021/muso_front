<template>
  <section class="profile-c">
    <h2 class="visually-hidden">Collaborators</h2>

    <base-table
      v-if="collaborators.length || loading"
      class="profile-c__table"
      :data="collaborators"
      :loading="loading"
      :columns="tableColumns"
      :row-skeleton-count="pagination.limit"
      :disable-infinite-scroll="isInfiniteScrollDisabled"
      @load-more="fetchCollaborators"
    >
      <template v-slot="{ item, index }">
        <base-table-row :index="index" @click="navigateToCollaborator($event, item)" />
      </template>

      <template #mobile-row="{ item, cells }">
        <base-table-mobile-row @click="navigateToCollaborator($event, item)">
          <base-table-cell :cell="cells.avatar" class="media__small-img" />
          <div class="media__content">
            <h3 class="media__title">
              <base-table-cell :cell="cells.name" />
            </h3>
            <span class="media__text">
              <base-table-cell :cell="cells.role" />
            </span>
          </div>
        </base-table-mobile-row>
      </template>

      <template #mobile-row-skeleton>
        <collaborator-mobile-row-skeleton />
      </template>
    </base-table>

    <template v-else>
      <div class="zero-state">
        <img class="zero-state__img" src="images/zero-state/collaborators.svg" width="100" height="100" />
        <p class="zero-state__text">No Collaborators On Muso.AI Yet</p>
      </div>
    </template>
  </section>
</template>

<script>
import BaseTable, { BaseTableRow, BaseTableMobileRow, BaseTableCell } from 'components/ui/base-table/base-table.vue';
import { profileCols, creditCols } from 'helpers/table-columns/table-columns';
import ProfileAvatar from 'components/ui/profile/profile-avatar.vue';
import CollaboratorMobileRowSkeleton from 'components/collaborator/collaborator-mobile-row-skeleton.vue';
import { isParentElementInteractive } from 'helpers/dom';
import { Pagination } from 'helpers/pagination';
import { getCollaboratorRoute } from 'helpers/routing';

export default {
  name: 'collaborators-section',
  components: {
    BaseTable,
    BaseTableRow,
    BaseTableMobileRow,
    BaseTableCell,
    ProfileAvatar,
    CollaboratorMobileRowSkeleton
  },
  props: {
    collaborators: {
      type: Array,
      required: true
    },
    pagination: {
      type: Pagination,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    fetchData: {
      type: Function,
      required: true
    }
  },
  computed: {
    tableColumns() {
      return [
        profileCols.collaboratorAvatar,
        profileCols.name2,
        creditCols.collaboratorRole
      ];
    },
    isInfiniteScrollDisabled() {
      return this.loading || this.noMoreDataToLoad;
    },
    noMoreDataToLoad() {
      return this.pagination.isNoMoreDataToLoad(this.collaborators);
    }
  },
  methods: {
    fetchCollaborators() {
      return this.pagination.nextPage(this.fetchData);
    },
    navigateToCollaborator(event, { collaborator, collaborators }) {
      if (!isParentElementInteractive(event.target)) {
        this.$router.push(getCollaboratorRoute(collaborator || collaborators));
      }
    }
  }
};
</script>

<style lang="scss">
.profile-c {
  --tr-border-left-indent: 61px;
  --tr-main-color: #141413;
}
</style>
