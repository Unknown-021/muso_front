<template>
<div>
  <li v-for="item in activity" :key="item.index">
    {{item.source.title}}
 </li>
</div>
 
</template>

<script>
export default {
  name: "activity-list",
  computed: {
    activity() {
      return this.$store.getters['analytics/activity/playlistData']
    }
  }
}
</script>

<style>

</style>