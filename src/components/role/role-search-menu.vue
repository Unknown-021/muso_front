<template>
  <search-menu
    class="role-search-menu"
    v-model="roleName"
    :list="list"
    :loading="isLoading"
    :selected-items="$data.$selectedItems"
    @update:selected-items="updateSelectedItems"
    @input="debouncedSearch"
    @item-select="selectItem"
  >
    <template #selected-item="{ item }">
      {{ item.association }}
    </template>

    <template #item="props">
      <search-menu-item :text="props.item.association" v-bind="props">
        <template #title>{{ props.item.parentAssociation }}</template>
      </search-menu-item>
    </template>

    <template v-if="showButtons" #buttons>
      <base-plain-button variant="default" @click="close">Cancel</base-plain-button>
      <base-plain-button :disabled="isSaving" @click="saveRoles">{{ okButton }}</base-plain-button>
    </template>
  </search-menu>
</template>

<script>
import SearchMenu from 'components/ui/search-menu.vue';
import SearchMenuItem from 'components/ui/search-menu-item.vue';
import BasePlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import { debounce, loading } from 'helpers/utils';

const noop = () => {};

export default {
  name: 'role-search-menu',
  components: {
    SearchMenu,
    SearchMenuItem,
    BasePlainButton
  },
  props: {
    selectedItems: {
      type: Array,
      default: undefined
    },
    save: {
      type: Function,
      default: noop
    },
    profileId: {
      type: Number,
      required: true
    },
    showButtons: {
      type: Boolean,
      default: true
    },
    okButton: {
      type: String,
      default: 'Add'
    }
  },
  data() {
    return {
      roleName: '',
      isLoading: false,
      isSaving: false,
      // we user $ sign here, just to mark that this is kind of mutable prop
      $selectedItems: [],
      roles: []
    };
  },
  watch: {
    selectedItems: {
      immediate: true,
      handler(value) {
        if (value && value !== this.$data.$selectedItems) {
          this.$data.$selectedItems = value.slice();
        }
      }
    }
  },
  computed: {
    list() {
      return [{
        id: 'roles',
        items: this.roles
      }];
    },
    debouncedSearch() {
      return debounce(this.searchRoles, 300);
    }
  },
  mounted() {
    this.searchRoles();
  },
  methods: {
    updateSelectedItems(value) {
      this.$data.$selectedItems = value;
      this.emitSelectedItems();
    },
    selectItem(item) {
      this.roleName = '';
      this.$data.$selectedItems.push(item);
      this.emitSelectedItems();
      this.searchRoles();
    },
    emitSelectedItems() {
      this.$emit('update:selected-items', this.$data.$selectedItems);
    },
    async saveRoles() {
      try {
        this.isSaving = true;

        await this.save(this.$data.$selectedItems);
        this.close();
      } catch (error) {
        this.$notify(error.message || 'Something weng wrong. Please, try again later.', 'error');
      } finally {
        this.isSaving = false;
      }
    },
    async fetchInitialRolesIfNeeded() {
      if (!this.initialRoles.length) {
        this.$store.dispatch('role/getInitialRoles');
      }
    },
    searchRoles() {
      return loading(this.doSearchRoles, value => this.isLoading = value);
    },
    async doSearchRoles() {
      try {
        const params = {
          profileId: this.profileId,
          query: this.roleName || undefined
        };
        this.roles = this.roleName
          ? await this.$store.dispatch('role/getRoles', { params })
          : await this.$store.dispatch('role/getInitialRoles', { params });
      } catch (error) {
        this.$notify(error.message || 'Something went wrong. Please, try later.', 'error');
      }
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss">
.role-search-menu {
  --search-menu-list-max-width: 230px;
}
</style>