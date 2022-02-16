<template>
  <h1 class="profile-title" :title="profile.name">
    <template v-if="profile.name">
      {{ nameParts.start }}
      <span class="profile-title__part">
        {{ nameParts.end }}
        <pro-badge v-if="profile.isPro && full" class="profile-title__badge" />
        <img v-else-if="profile.isVerified && full" src="/images/icons/verified.svg" class="profile-title__check-icon" />
      </span>
    </template>
    <template v-else>No Name</template>
  </h1>
</template>

<script>
import ProBadge from 'components/ui/pro-badge.vue';

export default {
  name: 'profile-title',
  components: {
    ProBadge
  },
  props: {
    profile: {
      type: Object,
      required: true
    },
    full: {
      type: Boolean,
      defualt: true
    }
  },
  computed: {
    nameParts() {
      const parts = this.profile.name.split(' ').filter(notEmpty);
      const end = parts.pop() || '';
      const start = parts.join(' ');
      
      return { end, start };
    }
  }
}

const notEmpty = (part) => part !== '';
</script>

<style lang="scss">
.profile-title {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.1;
  color: var(--overlay-1-color);
  @media (min-width: 768px) {
    font-size: 50px;
    line-height: 1.2;
    letter-spacing: -0.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__part {
    display: inline-flex;
    align-items: baseline;
  }
  &__badge {
    align-self: flex-start;
    margin-left: 7px;
  }
  &__check-icon {
    width: 12px;
    margin-left: 5px;
    @media (min-width: 768px) {
      transform: translateY(-5px);
      margin-left: 7px;
      width: 14px;
    }
  }
}
</style>