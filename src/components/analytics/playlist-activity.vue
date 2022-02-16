<template>
<div class="containter">
  <li v-for="item in activity" :key="item.index">
    {{item.source.title}}
 </li>
</div>
 
</template>

<script>
export default {
  name: "playlist-activity",
  computed: {
    activity() {
      return this.$store.getters['analytics/activity/playlistData']
    }
  }
}
</script>

<style>
.containter{
  width: 100%;
  /* max-width: 542px; */
}
</style>