<template>
  <div>
    <skeleton class="long mb-30" />
    <div class="d-none d-md-flex mb-10" v-for="index in 2" :key="`about-d-${index}`">
      <skeleton class="short mr-30" />
      <skeleton class="long mr-100" />
      <skeleton class="short mx-15" />
      <skeleton class="short ml-50" />
    </div>
    <div class="d-flex d-md-none mb-10" v-for="index in 6" :key="`about-m-${index}`">
      <skeleton class="short o8 mr-30" />
      <skeleton class="long" />
    </div>
    <div class="col-6 mt-30 mb-20">
      <skeleton class="fullWidth" />
    </div>
    <div class="col-9 mb-5">
      <skeleton class="fullWidth" />
    </div>
    <div class="col-8">
      <skeleton class="fullWidth" />
    </div>
  </div>
</template>

<script>
import Skeleton from "./skeleton";

export default {
  name: "AboutSkeleton",
  components: {
    Skeleton,
  },
};
</script>

<style lang='scss' scoped>
</style>
