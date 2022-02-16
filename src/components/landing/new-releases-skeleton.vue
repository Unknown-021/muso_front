<template>
  <div>
    <!-- Start Desktop View -->
    <div class="content d-none d-md-flex flex-row">
        <div class="new-releases">
            <skeleton class="d-none d-md-block long mb-25" />
            <div class="d-none d-md-flex align-items-center mb-25">
                <div class="d-none d-lg-flex flex-column mr-15" v-for="index in 4" :key="`albums-body-1${index}`">
                    <skeleton class="img mb-10" />
                    <skeleton class="o8 mb-10" />
                    <skeleton class="long o8" />
                </div>
                <div class="d-flex d-lg-none flex-column mr-15" v-for="index in 3" :key="`albums-body-2${index}`">
                    <skeleton class="img mb-10" />
                    <skeleton class="o8 mb-10" />
                    <skeleton class="long o8" />
                </div>
            </div>
            <div class="d-none d-md-flex align-items-center mb-25">
                <div class="d-none d-lg-flex flex-column mr-15" v-for="index in 4" :key="`albums-body-3${index}`">
                    <skeleton class="img mb-10" />
                    <skeleton class="o8 mb-10" />
                    <skeleton class="long o8" />
                </div>
                <div class="d-flex d-lg-none flex-column mr-15" v-for="index in 3" :key="`albums-body-4${index}`">
                    <skeleton class="img mb-10" />
                    <skeleton class="o8 mb-10" />
                    <skeleton class="long o8" />
                </div>
            </div>
            <skeleton class="d-none d-md-block long mb-25" />
            <div class="d-none d-md-flex align-items-center mb-25">
                <div class="d-flex align-items-center flex-column mr-15" v-for="index in 3" :key="`albums-body-5${index}`">
                    <skeleton class="img round mb-10" />
                    <skeleton class="long o8" />
                </div>
            </div>
        </div>
        <div class="top-profiles mb-25">
            <skeleton class="d-none d-md-block long mb-25" />
            <div class="d-none d-md-flex mb-15" v-for="index in 14" :key="`pcredits-m-body${index}`">
                <skeleton class="avatar round mr-15" />
                <div class="col d-flex flex-column justify-content-around mr-15">
                    <skeleton class="short thin o6 mb-5" />
                    <skeleton class="thin mb-5" />
                </div>
            </div>
        </div>
    </div>
    <!-- End Desktop View -->
    <!-- Start Mobile View -->
    <div class="d-flex flex-column d-md-none mb-15 mobile-skeleton">
            <skeleton class="long mb-25" />
            <div class="d-flex align-items-center mb-50">
                <div class="d-flex align-items-center flex-column mr-15" v-for="index in 8" :key="`albums-body${index}`">
                    <skeleton class="img round mb-10" />
                    <skeleton class="long o8" />
                </div>
            </div>
            <skeleton class="long mb-25" />
            <div class="d-flex align-items-center mb-50">
                <div class="d-flex flex-column mr-15" v-for="index in 8" :key="`albums-body${index}`">
                    <skeleton class="img mb-10" />
                    <skeleton class="o8 mb-10" />
                    <skeleton class="long o8" />
                </div>
            </div>
            <skeleton class="long mb-25" />
            <div class="d-flex align-items-center mb-50">
                <div class="d-flex align-items-center flex-column mr-15" v-for="index in 8" :key="`albums-body${index}`">
                    <skeleton class="img round mb-10" />
                    <skeleton class="long o8" />
                </div>
            </div>
    </div>
    <!-- End Mobile View -->
  </div>
</template>

<script>
import Skeleton from "components/ui/skeleton";

export default {
  name: "NewReleasesSkeleton",
  components: {
    Skeleton,
  },
};
</script>

<style lang='scss' scoped>
.round {
    border-radius: 50%;
}
.new-releases {
    flex: 1;
}
.top-profiles {
    min-width: 300px;
    max-width: 300px;
}
.mobile-skeleton {
    overflow: hidden;
}
</style>