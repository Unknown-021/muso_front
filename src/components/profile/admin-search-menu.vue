<template>
  <search-menu
    :show-search="isAdminPage"
    v-model="query"
    :list="list"
    @item-select="selectItem"
  >
    <template #item="{ item, focused }">
      <template v-if="isAdmin(item)">
        <profile-list-item
          v-bind="itemProps(item)"
          :disabled="isPendingInvitation(item)"
          :removeable="isAdminPage && focused"
        >
          <template v-if="isPendingInvitation(item)" #after>
            <span class="profile-search-item__status">Pending</span>
          </template>
        </profile-list-item>
      </template>
      <template v-else>
        <profile-list-item v-bind="itemProps(item)" />
      </template>
    </template>
  </search-menu>
</template>

<script>
import SearchMenu from 'components/ui/search-menu.vue';
import BasePlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import ProfileListItem from 'components/ui/profile/list-item.vue';
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import { createUserFilterByName } from 'store/modules/user/user.utils';
import { createIdsMap } from 'helpers/object';

export default {
  name: 'admin-search-menu',
  components: {
    SearchMenu,
    ProfileListItem,
    PlainButton,
    BasePlainButton
  },
  props: {
    album: {
      type: Object,
      required: true
    },
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      query: '',
      isLoading: {}
    };
  },
  computed: {
    list() {
      return [{
        id: 'admins',
        title: 'Admins',
        items: this.filterByQuery(this.adminsProfiles)
      }, {
        id: 'collaborators',
        title: 'Collaborators',
        items: this.filterByQuery(this.nonAdminsProfiles).filter(this.isProfessional)
      }].filter(item => this.isAdminPage || item.id !== 'collaborators');
    },
    isAdminPage() {
      return this.album.isAdmin;
    },
    adminsProfiles() {
      return this.value.map(item => item.profile);
    },
    adminsMap() {
      return createIdsMap(this.value);
    },
    nonAdminsProfiles() {
      return this.collaborators.filter(item => !this.isAdmin(item));
    },
    collaborators() {
      return this.$store.getters['collection/credits/profiles'];
    },
    profileNameFilter() {
      return createUserFilterByName(this.query.toLowerCase());
    }
  },
  methods: {
    itemProps(item) {
      return {
        item,
        class: 'profile-search-item',
        type: this.getUserType(item),
        loading: this.isLoading[item.id],
        navigable: !this.isAdminPage
      };
    },
    filterByQuery(items) {
      return this.query ? items.filter(this.profileNameFilter) : items;
    },
    isProfessional(profile) {
      return profile.type === 'PROFESSIONAL';
    },
    isAdmin(profile) {
      return profile.id in this.adminsMap;
    },
    selectItem(item) {
      if (!this.isAdminPage) return;

      if (this.isAdmin(item)) {
        this.confirmAdminRemove(item);
      } else {
        this.addAdmin(item);
      }
    },
    async addAdmin(profile) {
      try {
        this.$set(this.isLoading, profile.id, true);
        await this.$store.dispatch('collection/addAdmin', {
          id: this.album.id,
          profile: profile
        });
        this.query = '';
      } finally {
        this.isLoading[profile.id] = false;
      }
    },
    confirmAdminRemove(profile) {
      this.$confirm({
        title: 'Remove admin',
        body: `Are you sure you want to remove admin “${profile.fullName}”?`,
        okButton: {
          text: 'Remove',
          props: {
            variant: 'danger'
          },
          handler: () => this.removeAdmin(profile)
        }
      });
    },
    async removeAdmin(profile) {
      try {
        this.$set(this.isLoading, profile.id, true);
        await this.$store.dispatch('collection/removeAdmin', {
          id: this.album.id,
          profileId: profile.id
        });
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.isLoading[profile.id] = false;
      }
    },
    isPendingInvitation(profile) {
      const admin = this.adminsMap[profile.id];
      return !admin.isVerified;
    },
    getUserType(user) {
      if (user.type === 'ARTIST') {
        return 'artist';
      } else if (user.type === 'PROFESSIONAL') {
        return 'profile';
      }
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>
