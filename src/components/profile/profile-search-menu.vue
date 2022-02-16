<template>
  <search-menu
    v-model="profileName"
    :list="list"
    :loading="isLoading"
    placeholder="Search by name..."
    @input="debouncedSearch"
    @item-select="selectItem"
  >
    <template #search-placeholder>Type to start profiles search</template>

    <template #item="{ item }">
      <profile-list-item
        class="profile-search-item"
        :item="item"
        :type="getItemType(item)"
        :navigable="false"
      />
    </template>
  </search-menu>
</template>

<script>
import SearchMenu from 'components/ui/search-menu.vue';
import ProfileListItem from 'components/ui/profile/list-item.vue';
import { debounce, loading } from 'helpers/utils';
import ArtistsEmptyText from 'components/artist/artists-empty-text';

export default {
  name: 'profile-search-menu',
  components: {
    SearchMenu,
    ProfileListItem
  },
  props: {
    displayArtists: {
      type: Boolean,
      default: false
    },
    selectedItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      profileName: '',
      isLoading: false,
      profiles: [],
      list: []
    };
  },
  mounted() {
    this.search();
  },
  computed: {
    collaboratorsList() {
      return [
        {
          id: 'collaborators',
          items: this.filteredProfiles
        }
      ];
    },
    initialList() {
      return [
        {
          id: 'artists',
          title: 'Artists',
          items: this.filterItems(this.artists),
          empty: this.artists.length
            ? 'All artists have already been added to this track.'
            : ArtistsEmptyText
        },
        {
          ...this.collaboratorsList[0],
          title: 'Collaborators',
          empty: this.profiles.length
            ? 'All collaborators have already been added to this track.'
            : 'You dont have any collaborators yet'
        }
      ];
    },
    profilesSearchList() {
      return [
        {
          id: 'profiles',
          items: this.filteredProfiles
        }
      ];
    },
    filteredProfiles() {
      return this.filterItems(this.profiles);
    },
    artists() {
      return this.$store.getters['user/artists'];
    },
    isSearchingProfile() {
      return this.profileName;
    },
    debouncedSearch() {
      return debounce(this.search, 300);
    },
    selectedItemIds() {
      return new Set(this.selectedItems.map(item => item.id));
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('item-select', item);
    },
    filterItems(items) {
      return this.selectedItemIds.size
        ? items.filter(item => !this.selectedItemIds.has(item.id))
        : items;
    },
    search() {
      return loading(this.doSearch, value => this.isLoading = value);
    },
    async doSearch() {
      try {
        const query = {
          limit: 30,
          keyword: this.profileName || undefined
        };

        if (query.keyword) {
          await this.$store.dispatch('search/searchProfiles', { query });
          this.profiles = this.$store.getters['search/profileSearchResults'];
        } else {
          await this.$store.dispatch('user/getCollaboratorsIfNeeded');
          this.profiles = this.$store.getters['user/collaborators'];
        }
        this.updateList();
      } catch (error) {
        this.$handleError(error);
      }
    },
    updateList() {
      this.list = this.profileName
        ? this.profilesSearchList
        : this.displayArtists
          ? this.initialList
          : this.collaboratorsList;
    },
    getItemType(item) {
      return item.type === 'ARTIST'
        ? 'artist'
        : 'profile';
    }
  }
}
</script>

<style lang="scss">
.profile-search-item {
  padding-left: 15px;
  padding-right: 15px;
  --profile-avatar-initials-border-color: #040302;
  &__status {
    color: #8F8F8F;
  }
}
</style>