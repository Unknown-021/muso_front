<template>
  <search-box
    class="search-box"
    variant="landing"
    placeholder="Search profile, artist, track or album"
    :search-mobile-while-typing="false"
    :show-search-box-mobile="true"
  />
</template>

<script>
import SearchBox from 'components/ui/shared/search-box';

export default {
  name: 'muso-search',
  components: {
    SearchBox
  }
};
</script>

<style lang="scss" scoped>
.search-box {
  max-width: 100%;
}
</style>
