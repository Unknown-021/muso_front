<template>
  <span @click="setCollaboratorsName">
      <router-link :to="route">
        {{title}}
      </router-link>
      <span class="info-cell-text">{{text}}</span>
  </span>
</template>

<script>
import { collabotatorsGroupingRoute } from 'helpers/routing';

export default {
  name: 'table-cell-info-grouping',
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      default: undefined
    },
    item: {
      type: Object,
      require: true
    }
  },
  computed: {
    route() {
      return collabotatorsGroupingRoute(this.item, this.demoProfileId);
    },
    demoProfileId() {
      return this.$route.params.id;
    }
  },
  methods: {
    setCollaboratorsName() {
      this.$store.commit('analytics/grouping/setCollaboratorsName', this.title)
    }
  }
}
</script>

<style lang="scss">
.info-cell-text {
  display: block;
  font-size: 14px;
  font-weight: normal;
  color: var(--overlay-2-color);
  --artist-link-color: var(--overlay-2-color);
}
</style>
