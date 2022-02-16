<template>
  <article class="activity-card">
    <activity-info :activity="activity" full :activity-type="activityType" />
  </article>
</template>

<script>
import ActivityInfo from './activity-info.vue';

export default {
  name: 'activity-card',
  components: {
    ActivityInfo
  },
  props: {
    activity: {
      type: Object,
      required: true
    },
    activityType: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.activity-card {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 4px;
  background-color: var(--base-3-color);
}
</style>
