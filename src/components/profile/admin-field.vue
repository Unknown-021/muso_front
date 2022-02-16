<template>
  <base-dropdown-trigger
    v-model="isModalVisible"
    :offset="menuOffset"
  >
    <editable-content :enabled="album.isAdmin">
      <artists-enumeration class="admin-field-list" :artists="limitedAdmins" :navigable="false">
        <template v-if="theRestOfAdmins" #postfix>
          and <span :class="adminsCountClass">{{ theRestOfAdmins }} others</span>
        </template>
      </artists-enumeration>
    </editable-content>

    <template #dropdown="props">
      <admin-search-menu
        :album="album"
        :value="admins"
        @close="isModalVisible = false"
      />
    </template>
  </base-dropdown-trigger>
</template>

<script>
import BaseDropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import AdminSearchMenu from 'components/profile/admin-search-menu.vue';
import EditableContent from 'components/ui/editable-content';
import BasePlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import ArtistsEnumeration from 'components/artist/artists-enumeration.vue';

const ADMINS_LIMIT = 2;

export default {
  name: 'admin-field',
  components: {
    BaseDropdownTrigger,
    AdminSearchMenu,
    BasePlainButton,
    EditableContent,
    ArtistsEnumeration
  },
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isModalVisible: false
    };
  },
  computed: {
    admins() {
      return this.album.admins.map(item => ({
        id: item.profile.id,
        ...item
      }));
    },
    menuOffset() {
      return [-15, -29];
    },
    limitedAdmins() {
      const profiles = this.admins.map(item => item.profile);
      return profiles.slice(0, ADMINS_LIMIT);
    },
    theRestOfAdmins() {
      return Math.max(this.admins.length - ADMINS_LIMIT, 0);
    },
    adminsCountClass() {
      return this.album.isAdmin ? '' : 'soft-link';
    }
  }
}
</script>

<style lang="scss">
.admin-field-list {
  white-space: normal;
}
</style>