<template>
  <base-menu class="user-menu" v-on="$listeners">
    <menu-title>Profiles</menu-title>
    <menu-item>
      <user-menu-item :user="currentUser" />
    </menu-item>
    <template v-for="profile in pendingProfiles">
      <menu-item :key="profile.id">
        <user-menu-item :user="profile" pending />
      </menu-item>
    </template>

    <template v-if="artists.length || pendingArtists.length">
      <menu-divider />
      <menu-title>Artists</menu-title>
      <template v-for="artist in artists">
        <menu-item :key="artist.id">
          <user-menu-item :user="artist" />
        </menu-item>
      </template>
      <template v-for="artist in pendingArtists">
        <menu-item :key="artist.id">
          <user-menu-item :user="artist" pending />
        </menu-item>
      </template>
    </template>

    <menu-divider />
    <menu-item @click="manageMembership" v-if="currentUser.isPro">Manage Membership</menu-item>
    <menu-item @click="signOut">Sign Out</menu-item>
  </base-menu>
</template>

<script>
import BaseMenu, { MenuItem, MenuDivider, MenuTitle } from 'components/ui/base-menu/base-menu.vue';
import UserMenuItem from './user-menu-item.vue';

export default {
  name: 'user-menu',
  components: {
    BaseMenu,
    MenuItem,
    MenuDivider,
    MenuTitle,
    UserMenuItem
  },
  computed: {
    currentUser() {
      return this.$store.getters['user/data'];
    },
    pendingProfiles() {
      return this.currentUser.pendingProfiles;
    },
    artists() {
      return this.$store.getters['user/artists'];
    },
    pendingArtists() {
      return this.currentUser.pendingArtists;
    },
  },
  methods: {
    async signOut() {
      await this.$store.dispatch('auth/logout');
      this.$router.push({ name: 'login' });
    },
    manageMembership() {
      this.$modal.open({
        name: 'manage-subscription'
      });
    }
  }
}
</script>

<style lang="scss">
.user-menu {
  width: 230px;
  background-color: #272625;
  --profile-avatar-initials-font-size: 11px;
  --profile-avatar-initials-border-color: #040302;
  --user-avatar-size: 32px;
  a:hover {
    text-decoration: none;
  }
  &__current {
    --profile-avatar-border: 2px solid #F7F7F7;
  }
}
</style>