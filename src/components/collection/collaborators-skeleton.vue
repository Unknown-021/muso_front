<template>
  <div class="songs-table-skel">
    <skeleton class="section-header-skel" />

    <div class="songs-table-skel__desktop">
      <div class="song-skel-thead">
        <div>
          <skeleton class="mini thin o8" />
        </div>
        <div>
          <skeleton class="mini thin o8" />
        </div>
        <div>
          <skeleton class="mini thin o8 ml-auto" />
        </div>
        <div>
          <skeleton class="mini thin o8 ml-auto" />
        </div>
      </div>
      <div class="song-skel-trow" v-for="song in 10" :key="song">
        <div>
          <skeleton class="o8 thin xlong" />
        </div>
        <div>
          <skeleton class="o8 thin xlong" />
        </div>
        <div>
          <skeleton class="o8 thin xlong" />
        </div>
        <div>
          <skeleton class="o8 thin xlong" />
        </div>
      </div>
    </div>

    <div class="songs-table-skel__mobile">
      <div v-for="song in 5" :key="song">
        <div class="song-skel-trow-mobile">
          <skeleton class="o6 song-skel-trow-mobile__index" />
          <skeleton class="o8 xlong thin" />
          <skeleton class="o8 middle thin mt-10" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Skeleton from 'components/ui/skeleton';

export default {
  name: 'album-songs-skeleton',
  components: {
    Skeleton
  }
};
</script>

<style lang="scss">
.songs-table-skel {
  display: flex;
  flex-direction: column;
  &__desktop {
    padding-top: 4px;
    @media (max-width: 767px) {
      display: none;
    }
  }
  &__mobile {
    padding-top: 7px;
    @media (min-width: 768px) {
      display: none;
    }
  }
  &__title {
    margin-top: 4px;
    margin-bottom: 33px;
  }
  &__title-mobile {
    margin-top: 0px;
    margin-bottom: 25px;
  }
}

.song-skel-trow,
.song-skel-thead {
  display: flex;
  width: 100%;
  height: 44px;
  > * {
    padding-right: 40px;
    &:first-child {
      width: calc(22% + 85px);
    }
    &:nth-child(2) {
      flex-grow: 1;
      width: 0;
    }
    &:nth-child(3) {
      width: 200px;
    }
    &:last-child {
      padding-right: 0;
      width: 160px;
    }
  }
}

.song-skel-trow-mobile {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 30px;
  padding-left: 30px;
  &__index {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    width: 15px !important;
  }
}

.song-skel-thead {
  height: 38px;
}
</style>
