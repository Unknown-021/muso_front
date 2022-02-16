<template>
  <div>
    <div class="d-flex align-items-center mt-15 mt-md-0">
      <skeleton class="img" />
      <div class="d-flex d-md-none flex-column ml-20">
        <skeleton class="long fullHeight o8 mb-20" />
        <skeleton class="long 06" />
      </div>
      <div class="d-none d-md-flex flex-column ml-30">
        <skeleton class="full-width full-height o8 mb-15" />
        <skeleton class="full-width o6 mb-15" />
        <skeleton class="o6 mb-45" />
        <div class="d-flex justify-content-between">
          <skeleton class="08" />
          <skeleton class="08" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Skeleton from "components/ui/skeleton";
export default {
  name: "SongDetailsSkeleton",
  components: { Skeleton },
};
</script>

<style scoped lang="scss">
</style>
