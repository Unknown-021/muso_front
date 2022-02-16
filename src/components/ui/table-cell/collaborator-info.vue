<template>
  <profile-link :get-route="getCollaboratorRoute" :profile="collaborator.profile" target="_blank">
    <div v-if="isPending || isAdmin" class="h-list user-meta-info">
      <template v-if="isPending">
        <span class="h-line" />
        <span>
          <img src="images/icons/clock.svg" class="user-meta-info__clock" />Pending
        </span>
      </template>
      <template v-if="isAdmin">
        <span class="h-line" /><span>Admin</span>
      </template>
    </div>
  </profile-link>
</template>

<script>
import ProfileLink from './profile-link.vue';
import { getCollaboratorRoute } from 'helpers/routing';

export default {
  name: 'collaborator-info',
  components: {
    ProfileLink
  },
  props: {
    collaborator: {
      type: Object,
      required: true
    }
  },
  computed: {
    isPending() {
      return !this.collaborator.isVerified;
    },
    isAdmin() {
      return this.collaborator.isAdmin;
    }
  },
  methods: {
    getCollaboratorRoute
  }
};
</script>

<style lang="scss">
.user-meta-info {
  --vline-color: rgb(61, 60, 59);
  --vline-height: 14px;
  --vline-gap: 8px;
  margin-left: 2px;
  flex-shrink: 0;
  flex-wrap: nowrap;
  font-size: 12px;
  font-weight: normal;
  &[class] {
    color: rgb(89, 88, 87);
    @media (max-width: 767px) {
      display: none;
    }
  }
  &__clock {
    margin-bottom: -1px;
    margin-right: 4px;
  }
}
</style>