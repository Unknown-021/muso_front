<template>
  <div class="song-details">
    <song-primary-info />
    <HL class="mt-20 mt-md-30 mb-30" />
    <song-details />
    <HL class="thick-15 md-thick-5 xl-normal mt-15 mb-30" />
  </div>
</template>

<script>
import HL from "components/ui/horizontal-line";
import SongPrimaryInfo from "./primary-info";
import SongDetails from "./details";
export default {
  name: "SongInfo",
  components: {
    SongPrimaryInfo,
    SongDetails,
    HL,
  },
};
</script>

<style scoped lang="scss">
.song-details {
  font-size: 14px;
  font-family: Inter;
  line-height: 120%;
}
</style>
