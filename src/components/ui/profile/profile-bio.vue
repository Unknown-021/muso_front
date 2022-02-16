<template>
  <div class="profile-bio">
    <read-more v-if="profile.bio" :text="profile.bio" @read-more="isModalOpen = true" />
    <biography-modal :show.sync="isModalOpen" :data="profile" />
  </div>
</template>

<script>
import ReadMore from "components/ui/read-more.vue";
import BiographyModal from "components/ui/shared/biography-modal";

export default {
  name: 'profile-bio',
  components: {
    ReadMore,
    BiographyModal
  },
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isModalOpen: false
    };
  }
}
</script>

<style lang="scss">
.profile-bio {
  position: relative;
  margin-top: 17px;
  font-size: 14px;
  line-height: 1.4;
  overflow: hidden;
  @media (min-width: 768px) {
    margin-top: 8px;
    margin-bottom: -7px;
    max-width: 43em;
    font-size: 12px;
    line-height: 1.3;
  }
}
.profile-hero-card .profile-bio {
  position: relative;
  margin-top: 0px;
  font-size: 14px;
  line-height: 1.4;
  overflow: hidden;
  @media (min-width: 768px) {
    margin-top: 0;
    margin-bottom: 0;
    max-width: 43em;
    font-size: 12px;
    line-height: 1.3;
  }
}
</style>