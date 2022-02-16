<template>
  <dropdown-trigger v-model="isMenuOpen" placement="bottom-end" :offset="[4, 0]">
    <toggle-button class="user-panel" v-model="isMenuOpen">
      <user-info :user="currentUser" avatar-size="small" />
    </toggle-button>
    <template #dropdown>
      <user-menu @click="isMenuOpen = false" />
    </template>
  </dropdown-trigger>
</template>

<script>
import UserInfo from 'components/user/user-info.vue';
import UserMenu from 'components/user/user-menu.vue';
import ToggleButton from 'components/ui/toggle-button.vue';
import DropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';

export default {
  components: {
    UserInfo,
    UserMenu,
    ToggleButton,
    DropdownTrigger
  },
  data() {
    return {
      isMenuOpen: false
    };
  },
  computed: {
    currentUser() {
      const user = this.$store.getters['user/data'];
      return {
        ...user,
        // We set isVerified and isPro fields to false, because we don't want to
        // display badges in user panel
        isVerified: false,
        isPro: false
      };
    }
  }
}
</script>

<style lang="scss">
.user-panel {
  --user-avatar-size: 35px;
  --user-avatar-margin: 10px;
  --toggle-icon-margin: 10px;
  --toggle-icon-color: #F7F7F7;
  &:hover,
  &[data-active] {
    --toggle-icon-color: #8F8F8F;
  }
  a {
    pointer-events: none;
  }
}
</style>