<template>
  <search-menu
    v-model="genreName"
    :list="list"
    :selected-items.sync="selectedItems"
    :loading="isLoading"
    @input="debouncedSearch"
    @item-select="selectItem"
  >
    <template #selected-item="{ item }">
      {{ item.genre }}
    </template>

    <template #item="props">
      <search-menu-item :text="props.item.genre" v-bind="props">
        <template #title>-</template>
      </search-menu-item>
    </template>

    <template #buttons>
      <base-plain-button variant="default" @click="close">Cancel</base-plain-button>
      <base-plain-button :disabled="isSaving" @click="saveGenres">Save</base-plain-button>
    </template>
  </search-menu>
</template>

<script>
import SearchMenu from 'components/ui/search-menu.vue';
import SearchMenuItem from 'components/ui/search-menu-item.vue';
import BasePlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import { debounce, loading } from 'helpers/utils';

const SELECTED_GENRES_LIMIT = 2;

export default {
  name: 'genre-search-menu',
  components: {
    SearchMenu,
    SearchMenuItem,
    BasePlainButton
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    save: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      genreName: '',
      isLoading: false,
      isSaving: false,
      selectedItems: [],
      genres: []
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value) {
          this.selectedItems = value.split(', ').filter(_ => _).map(mapToGenreObject);
        }
      }
    }
  },
  computed: {
    list() {
      return [
        {
          id: 'genres',
          items: this.genres
        }
      ];
    },
    debouncedSearch() {
      return debounce(this.searchGenres, 300);
    }
  },
  mounted() {
    this.searchGenres();
  },
  methods: {
    async saveGenres(params) {
      try {
        this.isSaving = true;
        const genres = this.selectedItems.map(item => item.genre);
        await this.save({ genres });
        this.close();
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.isSaving = false;
      }
    },
    async searchGenres() {
      return loading(this.doSearchGenres, value => this.isLoading = value);
    },
    async doSearchGenres() {
      try {
        const query = {
          keyword: this.genreName || undefined
        };
        if (query.keyword) {
          await this.$store.dispatch('genre/getGenres', { query });
          this.genres = this.$store.getters['genre/genres'];
        } else {
          await this.$store.dispatch('genre/getInitialGenres');
          this.genres = this.$store.getters['genre/initialGenres'];
        }
        this.updateFakeIds();
      } catch (error) {
        this.$handleError(error);
      }
    },
    selectItem(item) {
      if (this.selectedItems.length < SELECTED_GENRES_LIMIT) {
        this.selectedItems.push(item);
        this.genreName = '';
        this.debouncedSearch();
      } else {
        this.$notify(`You cannot select more than ${SELECTED_GENRES_LIMIT} genres`, 'warning');
      }
    },
    updateFakeIds() {
      this.selectedItems.forEach(item => {
        const matchedGenre = this.genres.find(genreItem => genreItem.genre === item.genre);
        if (matchedGenre && item.id !== matchedGenre.id) {
          item.id = matchedGenre.id;
        }
      });
    },
    close() {
      this.$emit('close');
    }
  }
}

let genreId = -1;
function mapToGenreObject(genre) {
  const fakeId = --genreId;

  return { id: fakeId, genre };
}
</script>