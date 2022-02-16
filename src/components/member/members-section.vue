<template>
  <div v-if="loading || hasMembers" class="members-section">
    <members-skeleton v-if="loading" />

    <template v-else>
      <h2 class="t1 members-section__title">
        <slot name="title" />
      </h2>
      <div class="members-section__list no-scrollbar">
        <template v-for="member in members">
          <profile-list-item :key="member.id" :item="member" />
        </template>
      </div>
    </template>

    <horizontal-line class="members-section__hr thick-8" />
  </div>
</template>

<script>
import ProfileListItem from 'components/ui/profile/list-item';
import MembersSkeleton from './members-skeleton';
import HorizontalLine from 'components/ui/horizontal-line.vue';

export default {
  name: "members-section",
  components: {
    ProfileListItem,
    MembersSkeleton,
    HorizontalLine
  },
  props: {
    members: {
      type: Array,
      required: true,
    },
    itemType: {
      type: String, // Possible values: 'profile', 
      required: true,
      validator(value) {
        return ['profile', 'artist'].includes(value);
      }
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    hasMembers() {
      return this.members.length > 0;
    }
  }
};
</script>

<style lang="scss">
.members-section {
  padding-top: 15px;
  @media (min-width: 768px) {
    display: none;
  }
  &__title {
    margin-bottom: 8px;
  }
  &__list {
    display: flex;
    margin-left: -15px;
    margin-right: -15px;
    padding-left: 15px;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    &::after {
      content: "";
      margin-left: -1px;
      width: 16px;
      flex-shrink: 0;
    }
    > * {
      min-width: 100px;
      max-width: 200px;
      min-height: 44px;
      margin-right: 22px;
      flex-shrink: 0;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &__hr {
    margin-top: 16px;
  }
}
</style>