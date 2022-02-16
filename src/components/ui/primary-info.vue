<template>
  <div class="d-flex flex- align-items-center mt-15 mt-md-0">
    <img class="avatar" alt :src="avatar" :class="{ default: !avatarUrl }" />
    <div class="d-flex d-md-none flex-column ml-20">
      <div class="title mb-20">{{ title | EmptyFilter }}</div>
      <div class="subtitle" v-if="primaryArtist.fullName">
        by
        <span class="c-overlay-1">{{ primaryArtist.fullName }}</span>
      </div>
    </div>
    <div class="d-none d-md-flex flex-column ml-30">
      <div class="title mb-10">{{ title | EmptyFilter }}</div>
      <div class="subtitle">
        <span class="c-overlay-1">{{ subTitle }}</span>
        <span v-if="primaryArtist.fullName">by</span>
        <span class="c-overlay-1">{{ primaryArtist.fullName }}</span>
      </div>

      <div class="d-flex border-top mt-15 mt-xl-20 pt-15 pt-xl-20">
        <div class="subtitle d-flex align-items-center mr-25">
          streams
          <span class="count white ml-10">{{ streamCount | NumberFilter(true) }}</span>
        </div>
        <div class="subtitle d-flex align-items-center">
          collaborators
          <span
            class="count white ml-10"
          >{{ collaboratorCount | NumberFilter(true) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrimaryInfo",
  props: [
    "loading",
    "avatarUrl",
    "title",
    "subTitle",
    "primaryArtist",
    "streamCount",
    "collaboratorCount",
  ],
  computed: {
    avatar: function () {
      return this.avatarUrl || "images/default-avatars/collection_default.png";
    },
  },
};
</script>

<style scoped lang="scss">
.avatar {
  width: 180px;
  height: 180px;
  border: 4px solid #21201f;
  box-sizing: border-box;
  border-radius: 1px;

  &.default {
    object-fit: none;
  }

  @media (max-width: 767px) {
    width: 140px;
    height: 140px;
  }
}
.title {
  font-size: 20px;
  font-weight: bold;
  line-height: 120%;
  letter-spacing: 1px;
  color: #ffffff;

  @media (min-width: 768px) {
    font-size: 32px;
    font-weight: 500;
  }

  @media (min-width: 1200px) {
    font-size: 44px;
  }
}
.subtitle {
  color: #8f8f8f;

  .white {
    color: #ffffff;
  }

  .count {
    font-size: 20px;
  }
}
.border-top {
  border-top: 1px solid rgba(39, 38, 37, 0.7);
}
</style>
