<template>
  <div>
    <skeleton class="long mb-25" />
    <div class="d-flex mb-20">
      <skeleton class="doubleHeight o8 mr-10" v-for="index in 4" :key="`pcredits-header${index}`" />
    </div>
    <div class="d-none d-md-flex mb-15">
      <div class="col-3">
        <skeleton class="mini thin o8" />
      </div>
      <div class="col-2">
        <skeleton class="mini thin o8" />
      </div>
      <div class="col-3">
        <skeleton class="mini thin o8" />
      </div>
      <div class="col-2 d-flex justify-content-end">
        <skeleton class="mini thin o8" />
      </div>
      <div class="col-2 d-flex justify-content-end">
        <skeleton class="mini thin o8" />
      </div>
    </div>
    <!-- Start Desktop View -->
    <div class="d-none d-md-flex align-items-center mb-5" v-for="index in 5" :key="`pcredits-body${index}`">
      <div class="col-3 d-flex align-items-center">
        <skeleton class="avatar mr-20" />
        <skeleton class="thin o8" />
      </div>
      <div class="col-2">
        <skeleton class="thin o8" />
      </div>
      <div class="col-3">
        <skeleton class="thin o8" />
      </div>
      <div class="col-2 d-flex justify-content-end">
        <skeleton class="thin o8" />
      </div>
      <div class="col-2 d-flex justify-content-end">
        <skeleton class="thin o8" />
      </div>
    </div>
    <!-- End Desktop View -->
    <!-- Start Mobile View -->
    <div class="d-flex d-md-none mb-15" v-for="index in 3" :key="`pcredits-m-body${index}`">
        <skeleton class="avatar mr-15" />
      <div class="col d-flex flex-column mr-15">
        <skeleton class="short thin o6 mb-5" />
        <skeleton class="thin mb-5" />
        <skeleton class="long thin o6 mb-5" />
        <skeleton class="thin o6 mb-5" />
      </div>
      <div class="col-auto d-flex flex-column align-items-end">
        <skeleton class="mini thin o6 mb-5" />
        <skeleton class="short thin o8" />
      </div>
    </div>
    <!-- End Mobile View -->
  </div>
</template>

<script>
import Skeleton from "components/ui/skeleton";

export default {
  name: "ProfileCreditsSkeleton",
  components: {
    Skeleton,
  },
};
</script>

<style lang='scss' scoped>
</style>